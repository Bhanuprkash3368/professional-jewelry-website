# 📌 EARRING ALIGNMENT POSITION OFFSET VALUES - BACKUP

## **CURRENT EARRING ALIGNMENT VALUES**

### **Earring Landmarks Used:**
- **Left Ear Lobe:** Landmark 177 (fallback: 234)
- **Right Ear Lobe:** Landmark 401 (fallback: 454)

### **Earring Position Calculation:**
```
Left Earring Position:
- X: leftEarLobe.x * width
- Y: leftEarLobe.y * height
- Size: baseSizeInPixels * jewelryScale

Right Earring Position:
- X: rightEarLobe.x * width
- Y: rightEarLobe.y * height
- Size: baseSizeInPixels * jewelryScale
```

### **Earring Size Calculation:**
```
baseSizeInPixels = faceWidth * width * 0.35
earringSize = baseSizeInPixels * jewelryScale
```

### **Earring Scale Values (Current):**
- Gold Drop Earring: scale = 1.0, offsetY = 0
- Pearl Studs: scale = 0.9, offsetY = 0
- Diamond Hoops: scale = 1.1, offsetY = 0
- Rose Gold: scale = 1.0, offsetY = 0

### **Drawing Method:**
```
ctx.drawImage(jewelryImage, 
  X - earringSize/2, 
  Y - earringSize/2, 
  earringSize, 
  earringSize)
```

### **Opacity:**
- globalAlpha = 0.9 (90% opacity)

---

## **IF ALIGNMENT IS NOT GOOD:**

Tell me which earring needs adjustment:
1. Left earring position
2. Right earring position
3. Size too big/small
4. Offset needed

I will restore these values and make adjustments!

---

## **BACKUP DATE:** 2025-11-17
**Status:** ✅ Saved

