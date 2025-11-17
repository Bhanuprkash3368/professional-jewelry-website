import Jewelry3DRenderer from './jewelry-3d-renderer.js';
import ModelLoaderHelper from './model-loader-helper.js';

/**
 * Professional 3D Jewelry Manager
 * Manages jewelry positioning based on MediaPipe landmarks
 */
class Jewelry3DManager {
    constructor() {
        this.renderer = null;
        this.currentJewelryType = null;
        this.landmarks = null;
        this.modelLoader = new ModelLoaderHelper();
        
        // Better landmarks (from professional systems)
        this.LANDMARKS = {
            earrings: {
                left: 132,   // Left ear lobe front (BETTER than 177)
                right: 361   // Right ear lobe front (BETTER than 401)
            },
            necklaces: {
                center: 152,  // Neck center
                left: 132,    // Neck left
                right: 361    // Neck right
            },
            rings: {
                indexFinger: 8,   // Index finger tip
                middleFinger: 12, // Middle finger tip
                ringFinger: 16,   // Ring finger tip
                wrist: 0          // Wrist
            }
        };
        
        // Model paths (will be updated with actual 3D models)
        this.modelPaths = {
            earrings: {
                'earring1': 'assets/models/earrings/earring1.glb',
                'earring2': 'assets/models/earrings/earring2.glb'
            },
            necklaces: {
                'necklace1': 'assets/models/necklaces/necklace1.glb',
                'necklace2': 'assets/models/necklaces/necklace2.glb'
            },
            rings: {
                'ring1': 'assets/models/rings/ring1.glb',
                'ring2': 'assets/models/rings/ring2.glb'
            }
        };
    }
    
    async init(containerElement) {
        this.renderer = new Jewelry3DRenderer(containerElement);
        console.log('✅ Jewelry3DManager initialized');
    }
    
    async loadJewelryModels(jewelryType) {
        if (!this.renderer) {
            console.error('❌ Renderer not initialized');
            return;
        }

        const models = this.modelPaths[jewelryType];
        if (!models) {
            console.error(`❌ Unknown jewelry type: ${jewelryType}`);
            return;
        }

        try {
            for (const [name, path] of Object.entries(models)) {
                // Use helper to load with fallback to placeholder
                const model = await this.modelLoader.loadModelWithFallback(
                    path,
                    name,
                    jewelryType.slice(0, -1)  // Remove 's' from plural
                );

                if (model) {
                    this.renderer.models[name] = model;
                }
            }

            // Check if any models failed
            const failedModels = this.modelLoader.getFailedModels();
            if (failedModels.length > 0) {
                console.warn(`⚠️ Using placeholder models for: ${failedModels.join(', ')}`);
                console.log('📥 To use real models, download from: https://sketchfab.com/');
            } else {
                console.log(`✅ Loaded all ${jewelryType} models`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${jewelryType} models:`, error);
        }
    }
    
    switchJewelryType(jewelryType, modelName) {
        this.currentJewelryType = jewelryType;
        
        if (this.renderer.models[modelName]) {
            this.renderer.showModel(modelName);
            console.log(`🎯 Switched to: ${jewelryType} - ${modelName}`);
        } else {
            console.warn(`⚠️ Model not found: ${modelName}`);
        }
    }
    
    updateJewelryPosition(landmarks) {
        if (!landmarks || !this.currentJewelryType) return;
        
        this.landmarks = landmarks;
        
        switch (this.currentJewelryType) {
            case 'earrings':
                this.positionEarrings(landmarks);
                break;
            case 'necklaces':
                this.positionNecklace(landmarks);
                break;
            case 'rings':
                this.positionRings(landmarks);
                break;
        }
    }
    
    positionEarrings(landmarks) {
        const leftEar = landmarks[this.LANDMARKS.earrings.left];
        const rightEar = landmarks[this.LANDMARKS.earrings.right];
        
        if (!leftEar || !rightEar) return;
        
        // Position at left ear
        this.renderer.positionModel(leftEar, -0.1, 0, 0);
        
        // Rotate based on head tilt
        const headTilt = this.calculateHeadTilt(landmarks);
        this.renderer.rotateModel(headTilt.x, headTilt.y, headTilt.z);
    }
    
    positionNecklace(landmarks) {
        const neckCenter = landmarks[this.LANDMARKS.necklaces.center];
        
        if (!neckCenter) return;
        
        // Position at neck center
        this.renderer.positionModel(neckCenter, 0, 0.05, 0);
        
        // Rotate based on head tilt
        const headTilt = this.calculateHeadTilt(landmarks);
        this.renderer.rotateModel(headTilt.x, headTilt.y, headTilt.z);
    }
    
    positionRings(landmarks) {
        const indexFinger = landmarks[this.LANDMARKS.rings.indexFinger];
        
        if (!indexFinger) return;
        
        // Position at index finger
        this.renderer.positionModel(indexFinger, 0, 0, 0);
    }
    
    calculateHeadTilt(landmarks) {
        // Calculate head rotation based on facial landmarks
        const nose = landmarks[1];
        const leftEye = landmarks[33];
        const rightEye = landmarks[263];
        
        if (!nose || !leftEye || !rightEye) {
            return { x: 0, y: 0, z: 0 };
        }
        
        // Calculate yaw (left-right rotation)
        const eyeDistance = rightEye.x - leftEye.x;
        const yaw = (nose.x - (leftEye.x + rightEye.x) / 2) * Math.PI;
        
        // Calculate pitch (up-down rotation)
        const pitch = (nose.y - (leftEye.y + rightEye.y) / 2) * Math.PI;
        
        return {
            x: pitch * 0.5,
            y: yaw * 0.5,
            z: 0
        };
    }
    
    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

export default Jewelry3DManager;

