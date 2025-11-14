# Assets Folder Structure

This folder contains all the assets for the Virtual Earring Try-On application.

## 📁 Folder Structure

```
assets/
├── input/          # Place your input images here
├── earrings/       # Place your earring PNG images here
└── output/         # Processed images will be saved here
```

## 📸 Input Folder (`assets/input/`)

**Purpose:** Store input images that you want to process

**Supported Formats:**
- PNG (.png)
- JPEG (.jpg, .jpeg)
- WebP (.webp)

**Recommendations:**
- Use clear, well-lit photos
- Face should be clearly visible
- Front-facing photos work best
- Resolution: 640x480 or higher

**Example:**
```
assets/input/
├── person1.jpg
├── person2.png
└── test-photo.jpg
```

## 💎 Earrings Folder (`assets/earrings/`)

**Purpose:** Store earring design images

**Requirements:**
- **Format:** PNG with transparent background
- **Size:** 200x200 to 500x500 pixels recommended
- **Background:** Transparent (alpha channel)
- **Orientation:** Earring should be centered

**Naming Convention:**
- Use descriptive names: `gold-hoop.png`, `diamond-stud.png`
- Avoid spaces: use hyphens or underscores
- Lowercase recommended

**Example:**
```
assets/earrings/
├── gold-hoop.png
├── silver-dangle.png
├── diamond-stud.png
├── pearl-drop.png
└── ruby-earring.png
```

### Creating Earring Images

1. **Find or create earring image**
2. **Remove background** (use tools like remove.bg or Photoshop)
3. **Save as PNG** with transparency
4. **Resize** to approximately 300x300 pixels
5. **Place in** `assets/earrings/` folder

## 📤 Output Folder (`assets/output/`)

**Purpose:** Automatically saves processed images

**Format:** PNG files with timestamp
**Naming:** `earring-tryOn-[timestamp].png`

**Example:**
```
assets/output/
├── earring-tryOn-1234567890.png
├── earring-tryOn-1234567891.png
└── earring-tryOn-1234567892.png
```

## 🎨 Sample Earring Templates

You can create simple earring designs using any image editor:

### Simple Circle Earring (SVG)
```svg
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="40" fill="gold" stroke="darkgoldenrod" stroke-width="3"/>
  <circle cx="100" cy="100" r="20" fill="purple" opacity="0.8"/>
</svg>
```

### Simple Dangle Earring (SVG)
```svg
<svg width="200" height="300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="50" r="20" fill="silver"/>
  <rect x="95" y="70" width="10" height="80" fill="silver"/>
  <circle cx="100" cy="160" r="30" fill="lightblue" opacity="0.8"/>
</svg>
```

## 📝 Usage Instructions

### 1. Add Earring Images

1. Place your earring PNG files in `assets/earrings/`
2. The application will automatically detect them
3. They will appear in the earring selection panel

### 2. Add Input Images (Optional)

1. Place photos in `assets/input/`
2. Use the upload feature in the app to load them
3. Or use the webcam to capture directly

### 3. Save Output

1. Processed images automatically save to `assets/output/`
2. Click "Save Image" button in the app
3. Files are named with timestamps

## 🔧 Technical Details

### Earring Image Specifications

**Optimal Size:** 300x300 pixels
**Format:** PNG-24 with alpha channel
**Color Mode:** RGBA
**Bit Depth:** 8-bit per channel

### Image Processing

The application will:
1. Load earring images from `assets/earrings/`
2. Detect face and ear landmarks
3. Scale earrings proportionally to face size
4. Apply rotation based on head tilt
5. Overlay on ear lobe positions

## 🎯 Tips for Best Results

### For Earring Images:
- Use high-quality, clear images
- Ensure transparent background
- Center the earring in the image
- Use realistic proportions
- Include shadows/highlights for realism

### For Input Photos:
- Good lighting is essential
- Face should be clearly visible
- Avoid hair covering ears
- Front-facing or slight angle works best
- Higher resolution = better results

## 📦 Sample Files

You can download sample earring images from:
- Flaticon.com (search "earring icon")
- Freepik.com (search "earring PNG")
- Create your own using Canva or Figma

## 🚀 Quick Start

1. **Add earrings:**
   ```
   Copy your earring PNG files to assets/earrings/
   ```

2. **Run the app:**
   ```
   python -m http.server 5500
   ```

3. **Use the app:**
   - Start camera or upload image
   - Select earring design
   - Capture and save

## 🔄 Automatic Detection

The application automatically:
- Scans `assets/earrings/` folder
- Loads all PNG files
- Creates selection buttons
- Updates when files are added (requires page refresh)

## ⚠️ Important Notes

1. **File Names:** Avoid special characters in filenames
2. **Transparency:** Earring images MUST have transparent backgrounds
3. **Size:** Keep earring files under 1MB for best performance
4. **Format:** Only PNG supports transparency properly
5. **Refresh:** Refresh the page after adding new earring files

## 📊 Recommended Workflow

```
1. Collect earring images → Save to assets/earrings/
2. Remove backgrounds → Use remove.bg or similar
3. Resize to 300x300 → Use any image editor
4. Save as PNG → Ensure transparency
5. Refresh app → New earrings appear
6. Test and adjust → Modify scale if needed
```

## 🎨 Creating Custom Earrings

### Using Canva:
1. Create 300x300 design
2. Design your earring
3. Download as PNG with transparent background

### Using Photoshop:
1. New file: 300x300, transparent background
2. Design earring
3. Save As → PNG-24

### Using GIMP (Free):
1. New image: 300x300, transparency
2. Design earring
3. Export As → PNG

## 📁 Example Structure

```
assets/
├── input/
│   ├── photo1.jpg
│   ├── photo2.png
│   └── test.jpg
├── earrings/
│   ├── gold-hoop.png
│   ├── silver-stud.png
│   ├── diamond-drop.png
│   ├── pearl-classic.png
│   └── ruby-dangle.png
└── output/
    ├── earring-tryOn-1234567890.png
    └── earring-tryOn-1234567891.png
```

---

**Ready to add your earrings? Just drop PNG files into `assets/earrings/` and refresh the app!**

