/**
 * Create Professional 3D Jewelry Models
 * Generates realistic 3D models for earrings, necklaces, and rings
 */

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

class JewelryModelCreator {
    constructor() {
        this.scene = new THREE.Scene();
        this.exporter = new GLTFExporter();
    }

    /**
     * Create a professional earring model
     */
    createEarring() {
        const group = new THREE.Group();

        // Main earring body - teardrop shape
        const geometry = new THREE.ConeGeometry(0.015, 0.04, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x332200
        });
        const cone = new THREE.Mesh(geometry, material);
        cone.position.y = -0.02;
        group.add(cone);

        // Top sphere for earring post
        const sphereGeom = new THREE.SphereGeometry(0.008, 16, 16);
        const sphere = new THREE.Mesh(sphereGeom, material);
        sphere.position.y = 0.015;
        group.add(sphere);

        // Decorative stone
        const stoneGeom = new THREE.SphereGeometry(0.012, 16, 16);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: 0xFF1493,
            metalness: 0.3,
            roughness: 0.2,
            emissive: 0x660066
        });
        const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
        stone.position.y = -0.01;
        group.add(stone);

        group.scale.set(1, 1, 1);
        return group;
    }

    /**
     * Create a professional necklace model
     */
    createNecklace() {
        const group = new THREE.Group();

        // Main pendant
        const pendantGeom = new THREE.OctahedronGeometry(0.02, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x332200
        });
        const pendant = new THREE.Mesh(pendantGeom, material);
        pendant.position.y = -0.03;
        group.add(pendant);

        // Chain links - create a curved chain
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

        // Center stone
        const stoneGeom = new THREE.SphereGeometry(0.015, 16, 16);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: 0x00CED1,
            metalness: 0.4,
            roughness: 0.1,
            emissive: 0x006666
        });
        const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
        stone.position.y = -0.015;
        group.add(stone);

        return group;
    }

    /**
     * Create a professional ring model
     */
    createRing() {
        const group = new THREE.Group();

        // Ring band - torus
        const torusGeom = new THREE.TorusGeometry(0.015, 0.005, 16, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 0.95,
            roughness: 0.05,
            emissive: 0x332200
        });
        const torus = new THREE.Mesh(torusGeom, material);
        group.add(torus);

        // Top stone
        const stoneGeom = new THREE.SphereGeometry(0.012, 16, 16);
        const stoneMaterial = new THREE.MeshStandardMaterial({
            color: 0xFF69B4,
            metalness: 0.3,
            roughness: 0.2,
            emissive: 0x660033
        });
        const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
        stone.position.z = 0.015;
        group.add(stone);

        // Side decorations
        for (let i = 0; i < 2; i++) {
            const smallStone = new THREE.Mesh(
                new THREE.SphereGeometry(0.005, 8, 8),
                new THREE.MeshStandardMaterial({
                    color: 0xFFFFFF,
                    metalness: 0.5,
                    roughness: 0.3
                })
            );
            smallStone.position.set(
                Math.cos((i * Math.PI) / 2) * 0.012,
                Math.sin((i * Math.PI) / 2) * 0.012,
                0.008
            );
            group.add(smallStone);
        }

        return group;
    }

    /**
     * Export model to GLB format
     */
    async exportModel(model, filename) {
        return new Promise((resolve, reject) => {
            this.exporter.parse(
                model,
                (gltf) => {
                    const blob = new Blob([gltf], { type: 'application/octet-stream' });
                    const url = URL.createObjectURL(blob);
                    resolve({ blob, url, filename });
                },
                (error) => reject(error),
                { binary: true }
            );
        });
    }

    /**
     * Create all jewelry models
     */
    async createAllModels() {
        const models = {
            earrings: [
                { name: 'diamond-earring', model: this.createEarring() },
                { name: 'ruby-earring', model: this.createEarring() },
                { name: 'sapphire-earring', model: this.createEarring() }
            ],
            necklaces: [
                { name: 'diamond-necklace', model: this.createNecklace() },
                { name: 'emerald-necklace', model: this.createNecklace() },
                { name: 'pearl-necklace', model: this.createNecklace() }
            ],
            rings: [
                { name: 'diamond-ring', model: this.createRing() },
                { name: 'ruby-ring', model: this.createRing() },
                { name: 'sapphire-ring', model: this.createRing() }
            ]
        };

        return models;
    }
}

export default JewelryModelCreator;

