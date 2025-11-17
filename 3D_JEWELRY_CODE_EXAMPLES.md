# 💻 3D JEWELRY TRY-ON CODE EXAMPLES

## **SETUP THREE.JS**

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Jewelry3DTryOn {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        
        this.loader = new GLTFLoader();
        this.jewelry = {};
    }
}
```

---

## **LOAD 3D MODELS**

```javascript
loadEarring(modelPath) {
    this.loader.load(modelPath, (gltf) => {
        const earring = gltf.scene;
        earring.scale.set(0.01, 0.01, 0.01);
        earring.name = 'earring';
        this.jewelry.earring = earring;
        this.scene.add(earring);
    });
}

loadNecklace(modelPath) {
    this.loader.load(modelPath, (gltf) => {
        const necklace = gltf.scene;
        necklace.scale.set(0.02, 0.02, 0.02);
        necklace.name = 'necklace';
        this.jewelry.necklace = necklace;
        this.scene.add(necklace);
    });
}
```

---

## **BIND TO LANDMARKS**

```javascript
// Better landmarks (from Snap documentation)
const LANDMARKS = {
    earrings: {
        left: 132,   // Left ear lobe front
        right: 361   // Right ear lobe front
    },
    necklaces: {
        center: 152,  // Neck center
        left: 132,    // Neck left
        right: 361    // Neck right
    }
};

positionEarring(landmarks) {
    if (!this.jewelry.earring) return;
    
    const leftEar = landmarks[LANDMARKS.earrings.left];
    const rightEar = landmarks[LANDMARKS.earrings.right];
    
    // Position left earring
    this.jewelry.earring.position.set(
        (leftEar.x - 0.5) * 2,
        -(leftEar.y - 0.5) * 2,
        leftEar.z
    );
}

positionNecklace(landmarks) {
    if (!this.jewelry.necklace) return;
    
    const neckCenter = landmarks[LANDMARKS.necklaces.center];
    
    this.jewelry.necklace.position.set(
        (neckCenter.x - 0.5) * 2,
        -(neckCenter.y - 0.5) * 2,
        neckCenter.z
    );
}
```

---

## **ADD PHYSICS (Optional)**

```javascript
import * as CANNON from 'cannon-es';

setupPhysics() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    
    // Earring body
    const earringBody = new CANNON.Body({
        mass: 0.05,
        shape: new CANNON.Sphere(0.01)
    });
    this.world.addBody(earringBody);
}

updatePhysics() {
    this.world.step(1 / 60);
    // Update jewelry position based on physics
}
```

---

## **ANIMATION LOOP**

```javascript
animate() {
    requestAnimationFrame(() => this.animate());
    
    // Update physics
    this.updatePhysics();
    
    // Update jewelry positions
    this.positionEarring(this.landmarks);
    this.positionNecklace(this.landmarks);
    
    // Render
    this.renderer.render(this.scene, this.camera);
}
```

---

## **INTEGRATION WITH MEDIAPIPE**

```javascript
onFaceMeshResults(results) {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        this.landmarks = results.multiFaceLandmarks[0];
        
        // Update 3D jewelry positions
        this.positionEarring(this.landmarks);
        this.positionNecklace(this.landmarks);
    }
}
```

---

## **DOWNLOAD 3D MODELS**

- **Sketchfab**: https://sketchfab.com/search?q=earring&type=models
- **TurboSquid**: https://www.turbosquid.com/search/3d-models/earring
- **CGTrader**: https://www.cgtrader.com/search/earring

Look for models with `.glb` or `.gltf` format.

---

## **NEXT STEPS**

1. Install Three.js: `npm install three`
2. Download 3D jewelry models
3. Implement the code above
4. Test with MediaPipe landmarks
5. Add physics and hair occlusion

