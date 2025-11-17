# 🎨 3D MODELS SETUP GUIDE

## **STEP 1: CREATE DIRECTORIES**

```bash
mkdir -p public/assets/models/earrings
mkdir -p public/assets/models/necklaces
mkdir -p public/assets/models/rings
```

---

## **STEP 2: DOWNLOAD FREE 3D MODELS**

### **Option A: Sketchfab (Recommended)**

1. Go to: https://sketchfab.com/search?q=earring&type=models
2. Filter by "Downloadable"
3. Download models in `.glb` format
4. Save to `public/assets/models/earrings/`

**Search Terms:**
- Earrings: "earring 3d model"
- Necklaces: "necklace 3d model"
- Rings: "ring 3d model"

### **Option B: TurboSquid Free**

1. Go to: https://www.turbosquid.com/search/3d-models/earring
2. Filter by "Free"
3. Download in `.glb` format

### **Option C: CGTrader Free**

1. Go to: https://www.cgtrader.com/search/earring
2. Filter by "Free"
3. Download in `.glb` format

---

## **STEP 3: ORGANIZE MODELS**

```
public/assets/models/
├── earrings/
│   ├── earring1.glb
│   ├── earring2.glb
│   └── earring3.glb
├── necklaces/
│   ├── necklace1.glb
│   ├── necklace2.glb
│   └── necklace3.glb
└── rings/
    ├── ring1.glb
    ├── ring2.glb
    └── ring3.glb
```

---

## **STEP 4: UPDATE MODEL PATHS**

Edit `public/js/jewelry-3d-manager.js`:

```javascript
this.modelPaths = {
    earrings: {
        'earring1': 'assets/models/earrings/earring1.glb',
        'earring2': 'assets/models/earrings/earring2.glb',
        'earring3': 'assets/models/earrings/earring3.glb'
    },
    necklaces: {
        'necklace1': 'assets/models/necklaces/necklace1.glb',
        'necklace2': 'assets/models/necklaces/necklace2.glb',
        'necklace3': 'assets/models/necklaces/necklace3.glb'
    },
    rings: {
        'ring1': 'assets/models/rings/ring1.glb',
        'ring2': 'assets/models/rings/ring2.glb',
        'ring3': 'assets/models/rings/ring3.glb'
    }
};
```

---

## **STEP 5: TEST**

1. Start the website
2. Click "Start Camera"
3. Select "Earrings"
4. You should see 3D earring on your ear!

---

## **RECOMMENDED FREE MODELS**

### **Earrings**
- "Gold Earrings" by Sketchfab user
- "Diamond Earrings" by Sketchfab user
- "Pearl Earrings" by Sketchfab user

### **Necklaces**
- "Gold Chain Necklace" by Sketchfab user
- "Diamond Pendant" by Sketchfab user
- "Pearl Necklace" by Sketchfab user

### **Rings**
- "Gold Ring" by Sketchfab user
- "Diamond Ring" by Sketchfab user
- "Silver Ring" by Sketchfab user

---

## **TIPS**

✅ Download models in `.glb` format (smaller file size)
✅ Choose models with good lighting
✅ Prefer models with proper pivot points
✅ Test models before adding to production
✅ Optimize large models (reduce polygon count)

---

## **TROUBLESHOOTING**

**Q: Model not showing?**
A: Check console for errors. Verify file path is correct.

**Q: Model too big/small?**
A: Adjust scale in `jewelry-3d-renderer.js`:
```javascript
model.scale.set(0.01, 0.01, 0.01);  // Change 0.01 to adjust size
```

**Q: Model in wrong position?**
A: Check landmark index in `jewelry-3d-manager.js`

---

## **NEXT STEPS**

1. Download 3D models
2. Place in `public/assets/models/`
3. Update model paths
4. Test the website
5. Adjust positioning as needed

