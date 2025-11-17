/**
 * Jewelry Physics System
 * Adds realistic physics simulation to jewelry
 * Uses Cannon.js for physics calculations
 */

class JewelryPhysics {
    constructor() {
        this.world = null;
        this.bodies = {};
        this.constraints = {};
        this.isEnabled = false;
    }
    
    /**
     * Initialize physics world
     */
    initPhysicsWorld() {
        // Check if Cannon is available
        if (typeof CANNON === 'undefined') {
            console.warn('⚠️ Cannon.js not loaded, physics disabled');
            return false;
        }
        
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.world.defaultContactMaterial.friction = 0.3;
        
        this.isEnabled = true;
        console.log('✅ Physics world initialized');
        return true;
    }
    
    /**
     * Create physics body for earring
     */
    createEarringBody(position) {
        if (!this.isEnabled) return null;
        
        const shape = new CANNON.Sphere(0.01);
        const body = new CANNON.Body({
            mass: 0.05,
            shape: shape,
            linearDamping: 0.3,
            angularDamping: 0.3
        });
        
        body.position.set(position.x, position.y, position.z);
        this.world.addBody(body);
        
        return body;
    }
    
    /**
     * Create physics body for necklace
     */
    createNecklaceBody(position) {
        if (!this.isEnabled) return null;
        
        const shape = new CANNON.Sphere(0.015);
        const body = new CANNON.Body({
            mass: 0.1,
            shape: shape,
            linearDamping: 0.5,
            angularDamping: 0.5
        });
        
        body.position.set(position.x, position.y, position.z);
        this.world.addBody(body);
        
        return body;
    }
    
    /**
     * Create physics body for ring
     */
    createRingBody(position) {
        if (!this.isEnabled) return null;
        
        const shape = new CANNON.Sphere(0.008);
        const body = new CANNON.Body({
            mass: 0.02,
            shape: shape,
            linearDamping: 0.2,
            angularDamping: 0.2
        });
        
        body.position.set(position.x, position.y, position.z);
        this.world.addBody(body);
        
        return body;
    }
    
    /**
     * Add constraint to keep jewelry near landmark
     */
    addConstraint(body, targetPosition, strength = 0.5) {
        if (!this.isEnabled || !body) return;
        
        // Apply force towards target position
        const force = new CANNON.Vec3(
            (targetPosition.x - body.position.x) * strength,
            (targetPosition.y - body.position.y) * strength,
            (targetPosition.z - body.position.z) * strength
        );
        
        body.applyForce(force, body.position);
    }
    
    /**
     * Update physics simulation
     */
    updatePhysics(deltaTime = 1 / 60) {
        if (!this.isEnabled || !this.world) return;
        
        this.world.step(deltaTime);
    }
    
    /**
     * Get body position
     */
    getBodyPosition(body) {
        if (!body) return null;
        
        return {
            x: body.position.x,
            y: body.position.y,
            z: body.position.z
        };
    }
    
    /**
     * Get body rotation
     */
    getBodyRotation(body) {
        if (!body) return null;
        
        const quat = body.quaternion;
        return {
            x: quat.x,
            y: quat.y,
            z: quat.z,
            w: quat.w
        };
    }
    
    /**
     * Remove body from world
     */
    removeBody(body) {
        if (!this.isEnabled || !body) return;
        
        this.world.removeBody(body);
    }
    
    /**
     * Clear all bodies
     */
    clearBodies() {
        if (!this.isEnabled || !this.world) return;
        
        const bodiesToRemove = this.world.bodies.slice();
        bodiesToRemove.forEach(body => {
            this.world.removeBody(body);
        });
        
        this.bodies = {};
    }
    
    /**
     * Disable physics
     */
    disable() {
        this.isEnabled = false;
        this.clearBodies();
    }
}

export default JewelryPhysics;

