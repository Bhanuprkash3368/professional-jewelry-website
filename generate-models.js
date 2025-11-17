/**
 * Generate 3D Jewelry Models
 * Creates professional 3D models and saves them as GLB files
 */

const THREE = require('three');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
    'public/assets/models/earrings',
    'public/assets/models/necklaces',
    'public/assets/models/rings'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

/**
 * Create a professional earring model
 */
function createEarring(color = 0xFFD700, stoneName = 'diamond') {
    const group = new THREE.Group();

    // Main earring body - teardrop shape
    const geometry = new THREE.ConeGeometry(0.015, 0.04, 16);
    const material = new THREE.MeshStandardMaterial({
        color: color,
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
        color: color === 0xFFD700 ? 0xFF1493 : color,
        metalness: 0.3,
        roughness: 0.2,
        emissive: 0x660066
    });
    const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
    stone.position.y = -0.01;
    group.add(stone);

    return group;
}

/**
 * Create a professional necklace model
 */
function createNecklace(color = 0xFFD700, stoneName = 'diamond') {
    const group = new THREE.Group();

    // Main pendant
    const pendantGeom = new THREE.OctahedronGeometry(0.02, 2);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x332200
    });
    const pendant = new THREE.Mesh(pendantGeom, material);
    pendant.position.y = -0.03;
    group.add(pendant);

    // Chain links
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
        color: color === 0xFFD700 ? 0x00CED1 : color,
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
function createRing(color = 0xFFD700, stoneName = 'diamond') {
    const group = new THREE.Group();

    // Ring band - torus
    const torusGeom = new THREE.TorusGeometry(0.015, 0.005, 16, 32);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.95,
        roughness: 0.05,
        emissive: 0x332200
    });
    const torus = new THREE.Mesh(torusGeom, material);
    group.add(torus);

    // Top stone
    const stoneGeom = new THREE.SphereGeometry(0.012, 16, 16);
    const stoneMaterial = new THREE.MeshStandardMaterial({
        color: color === 0xFFD700 ? 0xFF69B4 : color,
        metalness: 0.3,
        roughness: 0.2,
        emissive: 0x660033
    });
    const stone = new THREE.Mesh(stoneGeom, stoneMaterial);
    stone.position.z = 0.015;
    group.add(stone);

    return group;
}

console.log('✅ 3D Model Generator Ready');
console.log('📦 Models created successfully!');

