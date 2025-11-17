# ⚡ QUICK START: 3D JEWELRY TRY-ON

## **STEP 1: INSTALL THREE.JS (5 minutes)**

```bash
cd professional-jewelry-website
npm install three
npm install cannon-es
```

---

## **STEP 2: DOWNLOAD 3D MODELS (10 minutes)**

Go to: https://sketchfab.com/search?q=earring&type=models

Download 3-4 earring models in `.glb` format:
- Save to: `public/assets/models/earrings/`

Go to: https://sketchfab.com/search?q=necklace&type=models

Download 3-4 necklace models in `.glb` format:
- Save to: `public/assets/models/necklaces/`

---

## **STEP 3: CREATE 3D SCENE (30 minutes)**

Create file: `public/js/jewelry-3d.js`

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class Jewelry3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        
        this.loader = new GLTFLoader();
        this.jewelry = {};
    }
    
    loadModel(path, name) {
        this.loader.load(path, (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.01, 0.01, 0.01);
            model.name = name;
            this.jewelry[name] = model;
            this.scene.add(model);
        });
    }
    
    positionEarring(landmarks) {
        if (!this.jewelry.earring) return;
        const leftEar = landmarks[132];
        this.jewelry.earring.position.set(
            (leftEar.x - 0.5) * 2,
            -(leftEar.y - 0.5) * 2,
            leftEar.z
        );
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

export default Jewelry3D;
```

---

## **STEP 4: INTEGRATE WITH MEDIAPIPE (30 minutes)**

In `jewelry-overlay.js`:

```javascript
import Jewelry3D from './jewelry-3d.js';

class JewelryTryOn {
    async init() {
        this.jewelry3d = new Jewelry3D();
        this.jewelry3d.loadModel('assets/models/earrings/earring1.glb', 'earring');
        this.jewelry3d.loadModel('assets/models/necklaces/necklace1.glb', 'necklace');
        this.jewelry3d.animate();
    }
    
    onFaceMeshResults(results) {
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];
            this.jewelry3d.positionEarring(landmarks);
        }
    }
}
```

---

## **STEP 5: TEST (15 minutes)**

1. Open website
2. Click "Start Camera"
3. Select "Earrings"
4. See 3D earring on your ear!

---

## **TOTAL TIME: ~90 minutes**

---

## **NEXT PHASES**

- **Phase 2**: Add more jewelry types (necklaces, rings)
- **Phase 3**: Add physics simulation
- **Phase 4**: Add hair occlusion
- **Phase 5**: Optimize performance

---

## **RESOURCES**

- Three.js Docs: https://threejs.org/docs/
- GLTFLoader: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- Sketchfab Models: https://sketchfab.com/

---

## **COMMON ISSUES**

**Q: Model not showing?**
A: Check console for errors. Ensure model path is correct.

**Q: Model too big/small?**
A: Adjust scale: `model.scale.set(0.01, 0.01, 0.01)`

**Q: Model in wrong position?**
A: Check landmark index. Use 132 for left ear, 361 for right ear.

---

## **START NOW!**

This is the professional approach. Your 2D system won't work well.

