/**
 * Performance Optimizer
 * Monitors and optimizes rendering performance
 */

class PerformanceOptimizer {
    constructor() {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.targetFPS = 60;
        this.metrics = {
            avgFPS: 0,
            minFPS: 60,
            maxFPS: 0,
            memoryUsage: 0
        };
        this.isMonitoring = false;
    }
    
    /**
     * Start monitoring performance
     */
    startMonitoring() {
        this.isMonitoring = true;
        this.frameCount = 0;
        this.lastTime = performance.now();
        console.log('✅ Performance monitoring started');
    }
    
    /**
     * Update frame metrics
     */
    updateFrame() {
        if (!this.isMonitoring) return;
        
        this.frameCount++;
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        // Calculate FPS every second
        if (deltaTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / deltaTime);
            this.metrics.avgFPS = this.fps;
            this.metrics.minFPS = Math.min(this.metrics.minFPS, this.fps);
            this.metrics.maxFPS = Math.max(this.metrics.maxFPS, this.fps);
            
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Update memory usage if available
            if (performance.memory) {
                this.metrics.memoryUsage = Math.round(
                    performance.memory.usedJSHeapSize / 1048576
                );
            }
        }
    }
    
    /**
     * Get current FPS
     */
    getFPS() {
        return this.fps;
    }
    
    /**
     * Get performance metrics
     */
    getMetrics() {
        return { ...this.metrics };
    }
    
    /**
     * Check if performance is good
     */
    isPerformanceGood() {
        return this.fps >= this.targetFPS * 0.9; // 90% of target
    }
    
    /**
     * Optimize renderer settings based on performance
     */
    optimizeRenderer(renderer) {
        if (!renderer) return;
        
        if (this.isPerformanceGood()) {
            // Performance is good, can increase quality
            renderer.setPixelRatio(window.devicePixelRatio);
        } else {
            // Performance is poor, reduce quality
            renderer.setPixelRatio(Math.max(1, window.devicePixelRatio * 0.75));
            console.warn('⚠️ Reducing render quality for better performance');
        }
    }
    
    /**
     * Log performance report
     */
    logReport() {
        console.log('📊 Performance Report:');
        console.log(`   Current FPS: ${this.fps}`);
        console.log(`   Average FPS: ${this.metrics.avgFPS}`);
        console.log(`   Min FPS: ${this.metrics.minFPS}`);
        console.log(`   Max FPS: ${this.metrics.maxFPS}`);
        console.log(`   Memory: ${this.metrics.memoryUsage}MB`);
    }
    
    /**
     * Get performance status
     */
    getStatus() {
        if (this.fps >= 55) return '✅ Excellent';
        if (this.fps >= 45) return '🟢 Good';
        if (this.fps >= 30) return '🟡 Fair';
        return '🔴 Poor';
    }
    
    /**
     * Stop monitoring
     */
    stopMonitoring() {
        this.isMonitoring = false;
        this.logReport();
    }
}

export default PerformanceOptimizer;

