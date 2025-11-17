/**
 * Hair Occlusion System
 * Makes jewelry appear behind hair for realistic appearance
 * Uses MediaPipe segmentation for hair detection
 */

class HairOcclusion {
    constructor() {
        this.segmentationMask = null;
        this.isEnabled = false;
        this.hairThreshold = 0.5;
    }
    
    /**
     * Initialize hair occlusion
     */
    init() {
        this.isEnabled = true;
        console.log('✅ Hair occlusion initialized');
    }
    
    /**
     * Update segmentation mask from MediaPipe
     */
    updateSegmentationMask(segmentationData) {
        if (!segmentationData) return;
        
        this.segmentationMask = segmentationData;
    }
    
    /**
     * Check if position is in hair region
     */
    isInHairRegion(x, y, width, height) {
        if (!this.segmentationMask) return false;
        
        // Normalize coordinates
        const normX = Math.floor((x / width) * this.segmentationMask.width);
        const normY = Math.floor((y / height) * this.segmentationMask.height);
        
        // Check if within bounds
        if (normX < 0 || normX >= this.segmentationMask.width ||
            normY < 0 || normY >= this.segmentationMask.height) {
            return false;
        }
        
        // Get mask value
        const index = (normY * this.segmentationMask.width + normX) * 4;
        const maskValue = this.segmentationMask.data[index] / 255;
        
        return maskValue > this.hairThreshold;
    }
    
    /**
     * Apply hair occlusion to Three.js object
     */
    applyOcclusionToObject(object, position, width, height) {
        if (!this.isEnabled || !object) return;
        
        // Check if jewelry is in hair region
        const inHair = this.isInHairRegion(position.x, position.y, width, height);
        
        if (inHair) {
            // Render behind hair
            object.renderOrder = -1;
            object.material.depthTest = true;
            object.material.depthWrite = true;
        } else {
            // Render in front
            object.renderOrder = 1;
            object.material.depthTest = true;
            object.material.depthWrite = true;
        }
    }
    
    /**
     * Create hair depth mask
     */
    createHairDepthMask(canvas, segmentationData) {
        if (!segmentationData) return null;
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        // Create mask based on segmentation
        for (let i = 0; i < data.length; i += 4) {
            const maskValue = segmentationData.data[i];
            
            if (maskValue > this.hairThreshold * 255) {
                // Hair region - darker
                data[i] = 0;      // R
                data[i + 1] = 0;  // G
                data[i + 2] = 0;  // B
                data[i + 3] = 128; // A (semi-transparent)
            } else {
                // Non-hair region - transparent
                data[i + 3] = 0;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }
    
    /**
     * Get occlusion factor (0 = fully visible, 1 = fully occluded)
     */
    getOcclusionFactor(x, y, width, height) {
        if (!this.segmentationMask) return 0;
        
        const normX = Math.floor((x / width) * this.segmentationMask.width);
        const normY = Math.floor((y / height) * this.segmentationMask.height);
        
        if (normX < 0 || normX >= this.segmentationMask.width ||
            normY < 0 || normY >= this.segmentationMask.height) {
            return 0;
        }
        
        const index = (normY * this.segmentationMask.width + normX) * 4;
        return this.segmentationMask.data[index] / 255;
    }
    
    /**
     * Set hair threshold
     */
    setHairThreshold(threshold) {
        this.hairThreshold = Math.max(0, Math.min(1, threshold));
    }
    
    /**
     * Enable/disable hair occlusion
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
    }
    
    /**
     * Clear segmentation mask
     */
    clear() {
        this.segmentationMask = null;
    }
}

export default HairOcclusion;

