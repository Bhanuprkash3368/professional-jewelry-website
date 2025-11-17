# 📍 MediaPipe FaceMesh Landmark Table for Jewellery Placement

**Standard MediaPipe FaceMesh: 468 Landmarks**

---

## **1. FOREHEAD JEWELLERY (Maang Tikka / Bindi / Forehead Ornament)**

| Purpose | Landmark Numbers |
|---------|------------------|
| Center Top Forehead | 10, 338, 297 |
| Mid Forehead Center | 9, 151, 197 |
| Left Forehead | 103, 67, 109 |
| Right Forehead | 332, 297, 334 |

---

## **2. NOSE JEWELLERY (Nose Pin / Nose Ring)**

| Purpose | Landmark Numbers |
|---------|------------------|
| Nose Tip | 1 |
| Left Nose (Nose Ring) | 98, 327 (traditionally 98) |
| Right Nose | 327 |
| Nose Bridge | 6, 195, 5 |

---

## **3. EAR JEWELLERY (Earrings)**

| Purpose | Left Side | Right Side |
|---------|-----------|-----------|
| Ear Top | 127 | 356 |
| Ear Middle | 234 | 454 |
| Ear Bottom (Lobe) | 132 | 361 |

**Best Anchor Points:** 132 (left), 361 (right)

---

## **4. NECK JEWELLERY (Necklace / Choker)**

| Purpose | Landmark Numbers |
|---------|------------------|
| Left Jawline Bottom | 234 → 93 → 132 |
| Center Jawline Bottom | 152 |
| Right Jawline Bottom | 454 → 323 → 361 |

**Recommended Anchors:** 132 (left), 152 (center), 361 (right)

---

## **5. CHIN JEWELLERY (Chin Chain / Beard Ornament)**

| Purpose | Landmark Numbers |
|---------|------------------|
| Center Chin | 152 |
| Left Chin | 148 |
| Right Chin | 176 |

---

## **6. CHEEK JEWELLERY**

| Purpose | Left Landmarks | Right Landmarks |
|---------|----------------|-----------------|
| Upper Cheek | 50, 187 | 280, 411 |
| Mid Cheek | 205 | 425 |
| Lower Cheek | 147 | 377 |

---

## **7. EYEBROW JEWELLERY**

| Purpose | Left Landmarks | Right Landmarks |
|---------|----------------|-----------------|
| Eyebrow Center | 70 | 300 |
| Start | 105 | 334 |
| End | 46 | 276 |

---

## **8. HEAD SIDE JEWELLERY (Temple / Jhumar / Passa)**

| Side | Landmarks |
|------|-----------|
| Left Temple | 127, 234, 139 |
| Right Temple | 356, 454, 365 |

---

## **📌 DEVELOPER NOTES**

✅ All coordinates from MediaPipe FaceMesh 468 landmark model
✅ Use world landmarks for depth accuracy
✅ Place jewellery using 2-3 anchor points for stability
✅ Use three-point transformation for rotation and scale
✅ Recommended smoothing: Moving Average 5-10 frames
✅ Test on multiple face angles and sizes

