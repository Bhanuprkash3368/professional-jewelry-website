/**
 * Model Loader Helper
 * Helps load and manage 3D models
 * Provides fallback for missing models
 */

class ModelLoaderHelper {
    constructor() {
        this.loadedModels = {};
        this.failedModels = new Set();
    }
    
    /**
     * Create a simple placeholder 3D model using Three.js
     * Used when actual model files are not available
     */
    createPlaceholderModel(type, name) {
        const THREE = window.THREE;
        if (!THREE) {
            console.error('Three.js not loaded');
            return null;
        }
        
        const group = new THREE.Group();
        
        switch (type) {
            case 'earring':
                // Create a simple earring shape
                const earringGeometry = new THREE.ConeGeometry(0.02, 0.05, 8);
                const earringMaterial = new THREE.MeshStandardMaterial({
                    color: 0xFFD700,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const earring = new THREE.Mesh(earringGeometry, earringMaterial);
                group.add(earring);
                break;
                
            case 'necklace':
                // Create a simple necklace shape
                const necklaceGeometry = new THREE.TorusGeometry(0.08, 0.01, 16, 100);
                const necklaceMaterial = new THREE.MeshStandardMaterial({
                    color: 0xFFD700,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const necklace = new THREE.Mesh(necklaceGeometry, necklaceMaterial);
                group.add(necklace);
                break;
                
            case 'ring':
                // Create a simple ring shape
                const ringGeometry = new THREE.TorusGeometry(0.015, 0.005, 16, 100);
                const ringMaterial = new THREE.MeshStandardMaterial({
                    color: 0xFFD700,
                    metalness: 0.9,
                    roughness: 0.1
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                group.add(ring);
                break;
        }
        
        group.name = name;
        return group;
    }
    
    /**
     * Load a model with fallback to placeholder
     */
    async loadModelWithFallback(path, modelName, type) {
        const THREE = window.THREE;
        if (!THREE) {
            console.error('Three.js not loaded');
            return null;
        }
        
        try {
            // Try to load the actual model
            const loader = new THREE.GLTFLoader();
            return new Promise((resolve, reject) => {
                loader.load(
                    path,
                    (gltf) => {
                        console.log(`✅ Loaded model: ${modelName}`);
                        this.loadedModels[modelName] = gltf.scene;
                        resolve(gltf.scene);
                    },
                    undefined,
                    (error) => {
                        console.warn(`⚠️ Could not load ${modelName}, using placeholder`);
                        // Create placeholder model
                        const placeholder = this.createPlaceholderModel(type, modelName);
                        this.loadedModels[modelName] = placeholder;
                        this.failedModels.add(modelName);
                        resolve(placeholder);
                    }
                );
            });
        } catch (error) {
            console.error(`Error loading ${modelName}:`, error);
            // Return placeholder on error
            const placeholder = this.createPlaceholderModel(type, modelName);
            this.loadedModels[modelName] = placeholder;
            this.failedModels.add(modelName);
            return placeholder;
        }
    }
    
    /**
     * Get list of failed models
     */
    getFailedModels() {
        return Array.from(this.failedModels);
    }
    
    /**
     * Check if model is using placeholder
     */
    isPlaceholder(modelName) {
        return this.failedModels.has(modelName);
    }
    
    /**
     * Get model by name
     */
    getModel(modelName) {
        return this.loadedModels[modelName];
    }
}

export default ModelLoaderHelper;

