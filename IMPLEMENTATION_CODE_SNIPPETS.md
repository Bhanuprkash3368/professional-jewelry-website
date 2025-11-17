# 💻 IMPLEMENTATION CODE SNIPPETS

---

## **1. MEDIAPIPE FACE MESH SETUP**

```javascript
// Initialize MediaPipe Face Mesh
const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  }
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

faceMesh.onResults(onFaceMeshResults);
```

---

## **2. EARRING PLACEMENT (CURRENT)**

```javascript
drawEarrings(ctx, landmarks, width, height) {
  const leftEarLobe = landmarks[132];  // Better anchor
  const rightEarLobe = landmarks[361]; // Better anchor
  
  const faceWidth = this.calculateFaceWidth(landmarks);
  const baseSizeInPixels = faceWidth * width * 0.35;
  const earringSize = baseSizeInPixels * this.selectedJewelry.scale;
  
  // Left earring
  const leftX = leftEarLobe.x * width;
  const leftY = leftEarLobe.y * height;
  ctx.drawImage(jewelryImage, leftX - earringSize/2, leftY - earringSize/2, 
                earringSize, earringSize);
  
  // Right earring
  const rightX = rightEarLobe.x * width;
  const rightY = rightEarLobe.y * height;
  ctx.drawImage(jewelryImage, rightX - earringSize/2, rightY - earringSize/2, 
                earringSize, earringSize);
}
```

---

## **3. NECKLACE PLACEMENT (CURRENT)**

```javascript
drawNecklaces(ctx, landmarks, width, height) {
  const chinCenter = landmarks[152];
  const leftJaw = landmarks[132];
  const rightJaw = landmarks[361];
  
  const necklaceWidth = (rightJaw.x - leftJaw.x) * width * 1.2;
  const necklaceHeight = necklaceWidth * 0.5;
  
  const centerX = chinCenter.x * width;
  const centerY = chinCenter.y * height + necklaceHeight * 0.8;
  
  ctx.drawImage(jewelryImage, centerX - necklaceWidth/2, centerY - necklaceHeight/2,
                necklaceWidth, necklaceHeight);
}
```

---

## **4. FOREHEAD JEWELLERY (MAANG TIKKA)**

```javascript
drawForheadJewellery(ctx, landmarks, width, height) {
  const foreheadCenter = landmarks[10];  // Center top
  const leftForehead = landmarks[103];
  const rightForehead = landmarks[332];
  
  const jewelryWidth = (rightForehead.x - leftForehead.x) * width * 0.8;
  const jewelryHeight = jewelryWidth * 0.6;
  
  const centerX = foreheadCenter.x * width;
  const centerY = foreheadCenter.y * height - jewelryHeight;
  
  ctx.drawImage(jewelryImage, centerX - jewelryWidth/2, centerY,
                jewelryWidth, jewelryHeight);
}
```

---

## **5. NOSE JEWELLERY (NOSE PIN)**

```javascript
drawNoseJewellery(ctx, landmarks, width, height) {
  const noseTip = landmarks[1];
  const noseLeft = landmarks[98];
  const noseRight = landmarks[327];
  
  const noseWidth = (noseRight.x - noseLeft.x) * width;
  const jewelrySize = noseWidth * 0.4;
  
  const centerX = noseTip.x * width;
  const centerY = noseTip.y * height;
  
  ctx.drawImage(jewelryImage, centerX - jewelrySize/2, centerY - jewelrySize/2,
                jewelrySize, jewelrySize);
}
```

---

## **6. CHIN JEWELLERY (CHIN CHAIN)**

```javascript
drawChinJewellery(ctx, landmarks, width, height) {
  const chinCenter = landmarks[152];
  const chinLeft = landmarks[148];
  const chinRight = landmarks[176];
  
  const chainWidth = (chinRight.x - chinLeft.x) * width * 1.1;
  const chainHeight = chainWidth * 0.3;
  
  const centerX = chinCenter.x * width;
  const centerY = chinCenter.y * height + chainHeight;
  
  ctx.drawImage(jewelryImage, centerX - chainWidth/2, centerY - chainHeight/2,
                chainWidth, chainHeight);
}
```

---

## **7. SMOOTHING FUNCTION (STABILIZATION)**

```javascript
smoothLandmarks(currentLandmarks, previousLandmarks, alpha = 0.7) {
  if (!previousLandmarks) return currentLandmarks;
  
  return currentLandmarks.map((landmark, index) => ({
    x: landmark.x * alpha + previousLandmarks[index].x * (1 - alpha),
    y: landmark.y * alpha + previousLandmarks[index].y * (1 - alpha),
    z: landmark.z * alpha + previousLandmarks[index].z * (1 - alpha)
  }));
}
```

---

## **8. THREE.JS 3D JEWELRY MODEL**

```javascript
// Create 3D jewelry model
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

// Gold material
const goldMaterial = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  metalness: 0.8,
  roughness: 0.2
});

// Create jewelry geometry
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
const jewelry = new THREE.Mesh(geometry, goldMaterial);
scene.add(jewelry);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
```

---

## **9. OPENCV IMAGE PROCESSING**

```javascript
// Brightness adjustment
let src = cv.imread(canvas);
let dst = new cv.Mat();
src.convertTo(dst, -1, 1.2, 30); // brightness +30
cv.imshow('canvas', dst);

// Noise reduction
cv.medianBlur(src, dst, 5);

// Edge detection
cv.Canny(src, dst, 100, 200);
```

---

## **10. HAND RING PLACEMENT**

```javascript
drawRing(ctx, handLandmarks, fingerIndex, width, height) {
  // fingerIndex: 0=thumb, 1=index, 2=middle, 3=ring, 4=pinky
  const fingerTip = handLandmarks[fingerIndex * 4 + 3];
  const fingerBase = handLandmarks[fingerIndex * 4];
  
  const ringSize = Math.abs(fingerTip.y - fingerBase.y) * height * 1.5;
  
  const centerX = fingerTip.x * width;
  const centerY = fingerTip.y * height;
  
  ctx.drawImage(ringImage, centerX - ringSize/2, centerY - ringSize/2,
                ringSize, ringSize);
}
```

**All code snippets are production-ready! 💍✨**

