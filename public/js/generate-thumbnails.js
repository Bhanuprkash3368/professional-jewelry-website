/**
 * Generate Professional Jewelry Thumbnails
 * Creates thumbnail images for jewelry catalog
 */

import * as THREE from 'three';

class ThumbnailGenerator {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = null;
    }

    /**
     * Initialize renderer
     */
    initRenderer(width = 256, height = 256) {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            preserveDrawingBuffer: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xffffff, 0);
        this.camera.position.z = 0.1;
        return this.renderer.domElement;
    }

    /**
     * Create earring thumbnail
     */
    createEarringThumbnail(color = 0xFFD700, stoneName = 'Diamond') {
        const group = new THREE.Group();

        // Main earring body
        const geometry = new THREE.ConeGeometry(0.015, 0.04, 16);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.9,
            roughness: 0.1
        });
        const cone = new THREE.Mesh(geometry, material);
        cone.position.y = -0.02;
        group.add(cone);

        // Top sphere
        const sphereGeom = new THREE.SphereGeometry(0.008, 16, 16);
        const sphere = new THREE.Mesh(sphereGeom, material);
        sphere.position.y = 0.015;
        group.add(sphere);

        // Stone
        const stoneGeom = new THREE.SphereGeometry(0.012, 16, 16);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: color === 0xFFD700 ? 0xFF1493 : color,
            metalness: 0.3,
            roughness: 0.2
        });
        const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
        stone.position.y = -0.01;
        group.add(stone);

        return group;
    }

    /**
     * Create necklace thumbnail
     */
    createNecklaceThumbnail(color = 0xFFD700, stoneName = 'Diamond') {
        const group = new THREE.Group();

        // Pendant
        const pendantGeom = new THREE.OctahedronGeometry(0.02, 2);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.9,
            roughness: 0.1
        });
        const pendant = new THREE.Mesh(pendantGeom, material);
        pendant.position.y = -0.03;
        group.add(pendant);

        // Chain
        const linkMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFA500,
            metalness: 0.85,
            roughness: 0.15
        });

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI;
            const x = Math.sin(angle) * 0.04;
            const y = Math.cos(angle) * 0.02;

            const linkGeom = new THREE.CylinderGeometry(0.003, 0.003, 0.008, 8);
            const link = new THREE.Mesh(linkGeom, linkMaterial);
            link.position.set(x, y, 0);
            link.rotation.z = angle;
            group.add(link);
        }

        // Stone
        const stoneGeom = new THREE.SphereGeometry(0.015, 16, 16);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: color === 0xFFD700 ? 0x00CED1 : color,
            metalness: 0.4,
            roughness: 0.1
        });
        const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
        stone.position.y = -0.015;
        group.add(stone);

        return group;
    }

    /**
     * Create ring thumbnail
     */
    createRingThumbnail(color = 0xFFD700, stoneName = 'Diamond') {
        const group = new THREE.Group();

        // Ring band
        const torusGeom = new THREE.TorusGeometry(0.015, 0.005, 16, 32);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.95,
            roughness: 0.05
        });
        const torus = new THREE.Mesh(torusGeom, material);
        group.add(torus);

        // Top stone
        const stoneGeom = new THREE.SphereGeometry(0.012, 16, 16);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: color === 0xFFD700 ? 0xFF69B4 : color,
            metalness: 0.3,
            roughness: 0.2
        });
        const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
        stone.position.z = 0.015;
        group.add(stone);

        return group;
    }

    /**
     * Render and capture thumbnail
     */
    renderThumbnail(model) {
        this.scene.clear();
        this.scene.add(model);

        // Add lighting
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(5, 5, 5);
        this.scene.add(light1);

        const light2 = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light2);

        this.renderer.render(this.scene, this.camera);
        return this.renderer.domElement.toDataURL('image/png');
    }
}

export default ThumbnailGenerator;

