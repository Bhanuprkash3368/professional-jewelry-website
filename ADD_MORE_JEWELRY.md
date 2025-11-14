# 💍 How to Add More Jewelry

## Quick Start

### Step 1: Prepare Your Jewelry Images

**Requirements:**
- Format: PNG with transparent background
- Size: 200x200px or larger
- Quality: High resolution
- Background: Transparent (no white/colored background)

**Where to get images:**
- Use existing jewelry photos
- Download from PNG image libraries
- Create custom designs
- Use Photoshop/GIMP to remove backgrounds

### Step 2: Add Images to Assets Folder

```
professional-jewelry-website/public/assets/
├── earrings/
│   ├── earring.png          (existing)
│   ├── earring_gold.png     (add new)
│   ├── earring_pearl.png    (add new)
│   └── earring_diamond.png  (add new)
├── necklaces/
│   ├── necklace.png         (existing)
│   ├── necklace_gold.png    (add new)
│   └── necklace_pendant.png (add new)
├── rings/
│   ├── ring.png             (existing)
│   ├── ring_gold.png        (add new)
│   └── ring_diamond.png     (add new)
└── chains/
    ├── chain.png            (existing)
    ├── chain_gold.png       (add new)
    └── chain_silver.png     (add new)
```

### Step 3: Update jewelry-overlay.js

Open `public/js/jewelry-overlay.js` and find the `loadJewelryGallery()` method:

```javascript
loadJewelryGallery() {
    const jewelryData = {
        earrings: [
            { id: 'e1', name: 'Gold Drop', path: 'assets/earrings/earring.png' },
            { id: 'e2', name: 'Pearl Studs', path: 'assets/earrings/earring.png' },
            // ADD NEW EARRINGS HERE
            { id: 'e5', name: 'Gold Hoops', path: 'assets/earrings/earring_gold.png' },
            { id: 'e6', name: 'Pearl Drops', path: 'assets/earrings/earring_pearl.png' },
            { id: 'e7', name: 'Diamond Studs', path: 'assets/earrings/earring_diamond.png' }
        ],
        necklaces: [
            { id: 'n1', name: 'Gold Chain', path: 'assets/necklaces/necklace.png' },
            // ADD NEW NECKLACES HERE
            { id: 'n5', name: 'Gold Pendant', path: 'assets/necklaces/necklace_gold.png' },
            { id: 'n6', name: 'Diamond Pendant', path: 'assets/necklaces/necklace_pendant.png' }
        ],
        rings: [
            { id: 'r1', name: 'Diamond Solitaire', path: 'assets/rings/ring.png' },
            // ADD NEW RINGS HERE
            { id: 'r5', name: 'Gold Band', path: 'assets/rings/ring_gold.png' },
            { id: 'r6', name: 'Diamond Ring', path: 'assets/rings/ring_diamond.png' }
        ],
        chains: [
            { id: 'c1', name: 'Gold Chain', path: 'assets/chains/chain.png' },
            // ADD NEW CHAINS HERE
            { id: 'c5', name: 'Gold Chain Thick', path: 'assets/chains/chain_gold.png' },
            { id: 'c6', name: 'Silver Chain', path: 'assets/chains/chain_silver.png' }
        ]
    };
    // ... rest of code
}
```

### Step 4: Adjust Positioning (Optional)

If jewelry needs different positioning, modify the draw functions:

**For Earrings:**
```javascript
drawEarrings(landmarks) {
    const scale = 0.15;  // Increase for larger earrings
    // ... rest of code
}
```

**For Necklaces:**
```javascript
drawNecklaces(landmarks) {
    const necklaceWidth = Math.abs(rightJaw.x - leftJaw.x) * width * 1.2;
    // Increase 1.2 for wider necklaces
    // ... rest of code
}
```

**For Rings:**
```javascript
drawRings(landmarks) {
    const scale = 0.12;  // Increase for larger rings
    // ... rest of code
}
```

### Step 5: Test

1. Refresh the browser
2. Go to Try-On page
3. Select the jewelry category
4. Your new jewelry should appear in the gallery
5. Click to select and see preview

## Batch Adding Multiple Jewelry

### Using a Script

Create a file `add-jewelry.js`:

```javascript
const jewelryToAdd = [
    { id: 'e5', name: 'Gold Hoops', category: 'earrings', path: 'earring_gold.png' },
    { id: 'e6', name: 'Pearl Drops', category: 'earrings', path: 'earring_pearl.png' },
    { id: 'n5', name: 'Gold Pendant', category: 'necklaces', path: 'necklace_gold.png' },
    { id: 'r5', name: 'Gold Band', category: 'rings', path: 'ring_gold.png' }
];

jewelryToAdd.forEach(item => {
    console.log(`Adding: ${item.name} to ${item.category}`);
    // Add to jewelry-overlay.js
});
```

## Image Optimization Tips

### 1. Remove Background
- Use online tools: remove.bg, photopea.com
- Use Photoshop: Select > Subject > Delete
- Use GIMP: Select > By Color > Delete

### 2. Resize Images
```bash
# Using ImageMagick
convert earring.png -resize 200x200 earring_resized.png

# Using Python PIL
from PIL import Image
img = Image.open('earring.png')
img = img.resize((200, 200))
img.save('earring_resized.png')
```

### 3. Compress Images
- Use TinyPNG.com
- Use ImageOptim (Mac)
- Use FileOptimizer (Windows)

## Troubleshooting

### Jewelry Not Showing
- Check file path is correct
- Verify image format is PNG
- Ensure image has transparent background
- Check browser console for errors

### Jewelry Misaligned
- Adjust scale factor in draw function
- Modify landmark indices
- Test with different face angles
- Check image dimensions

### Performance Issues
- Reduce image file size
- Use lower resolution images
- Optimize canvas rendering
- Check browser performance

## Advanced: Custom Positioning

For jewelry that needs custom positioning:

```javascript
// Add custom offset to jewelry data
{ 
    id: 'e5', 
    name: 'Gold Hoops', 
    path: 'assets/earrings/earring_gold.png',
    scale: 0.18,        // Custom scale
    offsetX: 5,         // Horizontal offset
    offsetY: -10        // Vertical offset
}

// Use in draw function
const scale = jewelry.scale || 0.15;
const offsetX = jewelry.offsetX || 0;
const offsetY = jewelry.offsetY || 0;
```

## File Naming Convention

Use consistent naming:
```
earring_[style]_[color].png
necklace_[style]_[color].png
ring_[style]_[color].png
chain_[style]_[color].png

Examples:
- earring_drop_gold.png
- earring_stud_pearl.png
- necklace_pendant_diamond.png
- ring_band_gold.png
- chain_link_silver.png
```

## Bulk Upload

To add many jewelry items at once:

1. Prepare all images in correct format
2. Copy to appropriate asset folder
3. Create a JSON file with all items:

```json
{
  "earrings": [
    { "id": "e5", "name": "Gold Hoops", "path": "earring_gold.png" },
    { "id": "e6", "name": "Pearl Drops", "path": "earring_pearl.png" }
  ],
  "necklaces": [
    { "id": "n5", "name": "Gold Pendant", "path": "necklace_gold.png" }
  ]
}
```

4. Update jewelry-overlay.js to load from JSON

## Support

For help:
1. Check JEWELRY_OVERLAY_GUIDE.md
2. Review existing jewelry items
3. Test with sample images
4. Check browser console for errors

---

**Happy adding! 💍✨**

