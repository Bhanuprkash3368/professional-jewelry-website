import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Professional 3D Jewelry Renderer
 * Uses Three.js for realistic 3D jewelry rendering
 */
class Jewelry3DRenderer {
    constructor(containerElement) {
        this.container = containerElement;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.backgroundIntensity = 0;
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 0.5;
        
        // Renderer setup with transparency
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            preserveDrawingBuffer: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        this.setupLighting();
        
        // Model loader
        this.loader = new GLTFLoader();
        this.models = {};
        this.currentModel = null;
        
        // Animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        
        // Directional light for shadows and depth
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Point light for highlights
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }
    
    loadModel(modelPath, modelName) {
        return new Promise((resolve, reject) => {
            this.loader.load(
                modelPath,
                (gltf) => {
                    const model = gltf.scene;
                    model.scale.set(0.01, 0.01, 0.01);
                    model.name = modelName;
                    
                    // Store model but don't add to scene yet
                    this.models[modelName] = model;
                    console.log(`✅ Loaded 3D model: ${modelName}`);
                    resolve(model);
                },
                (progress) => {
                    console.log(`Loading ${modelName}: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
                },
                (error) => {
                    console.error(`❌ Error loading ${modelName}:`, error);
                    reject(error);
                }
            );
        });
    }
    
    showModel(modelName) {
        // Remove current model from scene
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
        }
        
        // Add new model to scene
        if (this.models[modelName]) {
            this.currentModel = this.models[modelName];
            this.scene.add(this.currentModel);
            console.log(`🎯 Showing model: ${modelName}`);
        }
    }
    
    positionModel(landmark, offsetX = 0, offsetY = 0, offsetZ = 0) {
        if (!this.currentModel || !landmark) return;
        
        // Convert MediaPipe landmark to 3D position
        // MediaPipe uses normalized coordinates (0-1)
        // Convert to Three.js coordinates (-1 to 1)
        this.currentModel.position.x = (landmark.x - 0.5) * 2 + offsetX;
        this.currentModel.position.y = -(landmark.y - 0.5) * 2 + offsetY;
        this.currentModel.position.z = landmark.z + offsetZ;
    }
    
    rotateModel(rotationX = 0, rotationY = 0, rotationZ = 0) {
        if (!this.currentModel) return;
        
        this.currentModel.rotation.x = rotationX;
        this.currentModel.rotation.y = rotationY;
        this.currentModel.rotation.z = rotationZ;
    }
    
    scaleModel(scale = 1) {
        if (!this.currentModel) return;
        
        this.currentModel.scale.set(scale * 0.01, scale * 0.01, scale * 0.01);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    dispose() {
        this.renderer.dispose();
        this.container.removeChild(this.renderer.domElement);
    }
}

export default Jewelry3DRenderer;

