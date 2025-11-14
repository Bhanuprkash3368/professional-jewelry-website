# 💍 Jewelry Overlay System - Complete Guide

## Overview

The jewelry overlay system uses **MediaPipe Face Mesh** for real-time face detection and overlays jewelry images on the detected facial landmarks.

## Architecture

### Core Components

1. **jewelry-overlay.js** - Main overlay engine
   - Face detection using MediaPipe
   - Real-time jewelry positioning
   - Image overlay rendering

2. **tryon.html** - User interface
   - Camera capture
   - Photo upload
   - Jewelry selection
   - Preview and download

3. **assets/** - Jewelry images
   - `earrings/earring.png` - Earring images
   - `necklaces/necklace.png` - Necklace images
   - `rings/ring.png` - Ring images
   - `chains/chain.png` - Chain images

## How It Works

### 1. Face Detection
```javascript
// MediaPipe Face Mesh detects 468 facial landmarks
const faceMesh = new FaceMesh({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5
});
```

### 2. Landmark Mapping

**Key Landmarks Used:**

| Jewelry Type | Landmarks | Purpose |
|---|---|---|
| **Earrings** | 234 (Left), 454 (Right) | Ear positions |
| **Necklaces** | 152 (Chin), 234, 454 (Jaw) | Neck curve |
| **Rings** | 468, 469 (Hands) | Hand positions |
| **Chains** | 152, 234, 454 | Similar to necklaces |

### 3. Overlay Process

```javascript
// 1. Detect face landmarks
faceMesh.send({ image: videoFrame });

// 2. Get landmark positions
const leftEar = landmarks[234];
const rightEar = landmarks[454];

// 3. Calculate jewelry position and size
const scale = 0.15;
const width = leftEar.x * canvasWidth;
const height = leftEar.y * canvasHeight;

// 4. Draw jewelry image
ctx.drawImage(jewelryImage, x, y, width, height);
```

## Adding New Jewelry

### Step 1: Prepare Image
- Format: PNG with transparent background
- Size: 200x200px minimum
- Quality: High resolution for clarity

### Step 2: Add to Assets
```
assets/
├── earrings/
│   ├── earring.png
│   ├── earring2.png
│   └── earring3.png
├── necklaces/
│   ├── necklace.png
│   └── necklace2.png
├── rings/
│   └── ring.png
└── chains/
    └── chain.png
```

### Step 3: Update jewelry-overlay.js
```javascript
const jewelryData = {
    earrings: [
        { id: 'e1', name: 'Gold Drop', path: 'assets/earrings/earring.png' },
        { id: 'e2', name: 'Pearl Studs', path: 'assets/earrings/earring2.png' },
        // Add more...
    ]
};
```

## Customization

### Adjust Jewelry Position

**Earrings:**
```javascript
const scale = 0.15; // Increase for larger earrings
const offsetX = 0;  // Horizontal offset
const offsetY = 0;  // Vertical offset
```

**Necklaces:**
```javascript
const necklaceWidth = Math.abs(rightJaw.x - leftJaw.x) * width * 1.2;
// Increase 1.2 for wider necklaces
const necklaceHeight = necklaceWidth * 0.4;
// Adjust 0.4 for different heights
```

**Rings:**
```javascript
const scale = 0.12; // Increase for larger rings
```

### Adjust Transparency
```javascript
this.overlayCtx.globalAlpha = 0.9; // 0.0 = transparent, 1.0 = opaque
```

## Troubleshooting

### Face Not Detected
- Ensure good lighting
- Face should be clearly visible
- Check camera permissions
- Verify MediaPipe is loaded

### Jewelry Not Showing
- Check image path in assets folder
- Verify image format (PNG recommended)
- Check browser console for errors
- Ensure jewelry is selected

### Jewelry Misaligned
- Adjust landmark indices
- Modify scale factors
- Check offset values
- Test with different face angles

## Performance Tips

1. **Optimize Images**
   - Use PNG format with transparency
   - Compress images (< 100KB each)
   - Use appropriate dimensions

2. **Improve Detection**
   - Ensure good lighting
   - Use high-quality camera
   - Keep face centered

3. **Smooth Rendering**
   - Use requestAnimationFrame
   - Limit canvas size
   - Optimize drawing operations

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Supported (iOS 14.5+, Android 5.0+)

## API Reference

### JewelryTryOn Class

```javascript
// Initialize
const tryOn = new JewelryTryOn();

// Methods
tryOn.startCamera();           // Start camera
tryOn.capturePhoto();          // Capture current frame
tryOn.selectJewelry(item);     // Select jewelry
tryOn.downloadImage();         // Download result
tryOn.switchCategory(category); // Switch jewelry type
```

## File Structure

```
professional-jewelry-website/
├── public/
│   ├── tryon.html              # Main UI
│   ├── js/
│   │   ├── jewelry-overlay.js  # Overlay engine
│   │   └── main.js             # Utilities
│   ├── assets/
│   │   ├── earrings/
│   │   ├── necklaces/
│   │   ├── rings/
│   │   └── chains/
│   └── css/
│       └── style.css           # Styling
└── JEWELRY_OVERLAY_GUIDE.md    # This file
```

## Next Steps

1. ✅ Add more jewelry images to assets
2. ✅ Fine-tune landmark positions
3. ✅ Add hand detection for rings
4. ✅ Implement jewelry rotation
5. ✅ Add multiple jewelry selection
6. ✅ Create admin panel for jewelry management

## Support

For issues or questions:
- Check browser console for errors
- Verify all files are in correct paths
- Test with different images
- Check MediaPipe documentation

---

**Built with ❤️ for jewelry lovers**

