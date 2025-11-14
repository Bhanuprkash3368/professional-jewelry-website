// Professional Jewelry Try-On with Real Image Overlay
// Based on proven working code from inhouse-tryon/app.js

class JewelryTryOn {
    constructor() {
        console.log('🏗️ JewelryTryOn constructor started...');
        
        // DOM Elements
        this.webcam = document.getElementById('videoElement');
        this.overlayCanvas = document.getElementById('overlayCanvas');
        this.previewCanvas = document.getElementById('previewCanvas');
        
        if (!this.webcam || !this.overlayCanvas || !this.previewCanvas) {
            console.error('❌ Critical DOM elements missing');
            throw new Error('Critical DOM elements missing');
        }
        
        this.overlayCtx = this.overlayCanvas.getContext('2d');
        this.previewCtx = this.previewCanvas.getContext('2d');
        
        // Buttons
        this.startCameraBtn = document.getElementById('startCameraBtn');
        this.capturePhotoBtn = document.getElementById('captureBtn');
        this.uploadImageInput = document.getElementById('photoInput');
        this.retakePhotoBtn = document.getElementById('retakeBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        
        // Status
        this.statusDiv = document.getElementById('statusMsg');
        
        // State
        this.stream = null;
        this.faceMesh = null;
        this.hands = null;
        this.pose = null;
        this.capturedImage = null;
        this.detectedLandmarks = null;
        this.detectedHandLandmarks = null;
        this.detectedPoseLandmarks = null;
        this.selectedJewelry = null;
        this.currentJewelryType = 'earrings';
        this.isProcessing = false;
        
        // Jewelry collections
        this.jewelryCollections = {
            earrings: { items: [], images: {} },
            necklaces: { items: [], images: {} },
            rings: { items: [], images: {} },
            chains: { items: [], images: {} }
        };
        
        console.log('✅ Constructor completed, calling init()...');
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Initializing JewelryTryOn application...');
            
            this.setupEventListeners();
            await this.loadAllJewelryCollections();
            this.createJewelryGrid();
            await this.initializeMediaPipeModels();
            
            console.log('✅ JewelryTryOn application initialized successfully!');
            this.showStatus('✅ Application ready! Select jewelry and start camera.', 'success');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showStatus(`❌ Initialization failed: ${error.message}`, 'error');
        }
    }
    
    setupEventListeners() {
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.capturePhotoBtn.addEventListener('click', () => this.capturePhoto());
        document.getElementById('uploadBtn').addEventListener('click', () => this.uploadImageInput.click());
        this.uploadImageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.retakePhotoBtn.addEventListener('click', () => this.retakePhoto());
        this.downloadBtn.addEventListener('click', () => this.saveImage());
        
        // Jewelry type tab switching
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => this.switchJewelryType(tab.dataset.category));
        });
    }
    
    async loadAllJewelryCollections() {
        console.log('🔄 Loading jewelry collections...');
        
        const jewelryConfigs = {
            earrings: [
                { id: 1, name: 'Gold Drop Earring', url: 'assets/earrings/earring.png', scale: 1.0, offsetY: 0 },
                { id: 2, name: 'Pearl Studs', url: 'assets/earrings/earring.png', scale: 0.9, offsetY: 0 },
                { id: 3, name: 'Diamond Hoops', url: 'assets/earrings/earring.png', scale: 1.1, offsetY: 0 },
                { id: 4, name: 'Rose Gold', url: 'assets/earrings/earring.png', scale: 1.0, offsetY: 0 }
            ],
            necklaces: [
                { id: 1, name: 'Gold Chain Necklace', url: 'assets/necklaces/necklace.png', scale: 1.0, offsetY: 0 },
                { id: 2, name: 'Diamond Pendant', url: 'assets/necklaces/necklace.png', scale: 1.1, offsetY: 0 },
                { id: 3, name: 'Pearl Choker', url: 'assets/necklaces/necklace.png', scale: 0.9, offsetY: 0 },
                { id: 4, name: 'Rose Gold Layered', url: 'assets/necklaces/necklace.png', scale: 1.0, offsetY: 0 }
            ],
            rings: [
                { id: 1, name: 'Diamond Ring', url: 'assets/rings/ring.png', scale: 1.0, offsetX: 0, offsetY: 0 },
                { id: 2, name: 'Gold Band', url: 'assets/rings/ring.png', scale: 0.9, offsetX: 0, offsetY: 0 },
                { id: 3, name: 'Emerald Ring', url: 'assets/rings/ring.png', scale: 1.1, offsetX: 0, offsetY: 0 },
                { id: 4, name: 'Rose Gold Twist', url: 'assets/rings/ring.png', scale: 1.0, offsetX: 0, offsetY: 0 }
            ],
            chains: [
                { id: 1, name: 'Gold Chain', url: 'assets/chains/chain.png', scale: 1.0, offsetY: 0 },
                { id: 2, name: 'Silver Chain', url: 'assets/chains/chain.png', scale: 1.0, offsetY: 0 },
                { id: 3, name: 'Rose Gold Chain', url: 'assets/chains/chain.png', scale: 1.0, offsetY: 0 },
                { id: 4, name: 'Platinum Chain', url: 'assets/chains/chain.png', scale: 1.0, offsetY: 0 }
            ]
        };
        
        for (const [type, items] of Object.entries(jewelryConfigs)) {
            console.log(`📦 Loading ${type}... Found ${items.length} items`);
            
            for (const item of items) {
                try {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    await new Promise((resolve) => {
                        img.onload = () => {
                            this.jewelryCollections[type].images[item.id] = img;
                            this.jewelryCollections[type].items.push(item);
                            console.log(`✅ Loaded ${type}: ${item.name}`);
                            resolve();
                        };
                        img.onerror = () => {
                            console.warn(`⚠️ Failed to load ${type}: ${item.url}`);
                            this.jewelryCollections[type].items.push({...item, isPlaceholder: true});
                            resolve();
                        };
                        img.src = item.url;
                    });
                } catch (error) {
                    console.warn(`Error loading ${type}:`, error);
                }
            }
        }
    }
    
    createJewelryGrid() {
        console.log(`🎨 Creating jewelry grid for ${this.currentJewelryType}`);
        const gallery = document.getElementById('jewelryGallery');
        gallery.innerHTML = '';
        
        const currentCollection = this.jewelryCollections[this.currentJewelryType];
        const items = currentCollection.items;
        const images = currentCollection.images;
        
        items.forEach(jewelry => {
            const item = document.createElement('div');
            item.className = 'jewelry-item';
            
            const previewDiv = document.createElement('div');
            previewDiv.style.cssText = 'width: 60px; height: 60px; background: #f5f5f5; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin: 0 auto 5px; overflow: hidden;';
            
            if (images[jewelry.id] && !jewelry.isPlaceholder) {
                const previewImg = document.createElement('img');
                previewImg.src = images[jewelry.id].src;
                previewImg.style.cssText = 'max-width: 50px; max-height: 50px; object-fit: contain;';
                previewDiv.appendChild(previewImg);
            } else {
                const placeholder = document.createElement('span');
                placeholder.textContent = ['👂', '📿', '💍', '⛓️'][['earrings', 'necklaces', 'rings', 'chains'].indexOf(this.currentJewelryType)];
                placeholder.style.fontSize = '1.5rem';
                previewDiv.appendChild(placeholder);
            }
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = jewelry.name;
            nameSpan.style.cssText = 'font-size: 12px; font-weight: 600; text-align: center;';
            
            item.appendChild(previewDiv);
            item.appendChild(nameSpan);
            item.addEventListener('click', () => this.selectJewelry(jewelry, item));
            gallery.appendChild(item);
        });
        
        // Select first item by default
        const firstItem = gallery.querySelector('.jewelry-item');
        if (firstItem && items.length > 0) {
            this.selectJewelry(items[0], firstItem);
        }
    }
    
    selectJewelry(jewelry, element) {
        console.log(`👆 Selected jewelry: ${jewelry.name}`);
        
        document.querySelectorAll('.jewelry-item').forEach(item => item.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedJewelry = jewelry;
        
        this.showStatus(`✅ Selected: ${jewelry.name}`, 'success');
    }
    
    switchJewelryType(type) {
        document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-category="${type}"]`).classList.add('active');

        this.currentJewelryType = type;
        this.selectedJewelry = null;
        this.createJewelryGrid();

        // Auto-select first item after creating grid
        setTimeout(() => {
            const firstItem = document.querySelector('.jewelry-item');
            if (firstItem && this.jewelryCollections[type].items.length > 0) {
                this.selectJewelry(this.jewelryCollections[type].items[0], firstItem);
                console.log(`✅ Auto-selected first ${type} item`);
            }
        }, 100);

        this.showStatus(`Switched to ${type}`, 'info');
    }
    
    async initializeMediaPipeModels() {
        console.log('🤖 Initializing MediaPipe models...');
        
        try {
            let retries = 0;
            while (retries < 10) {
                if (typeof FaceMesh !== 'undefined' && typeof Hands !== 'undefined' && typeof Pose !== 'undefined') {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 500));
                retries++;
            }
            
            // Initialize FaceMesh
            this.faceMesh = new FaceMesh({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
            });
            this.faceMesh.setOptions({
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            this.faceMesh.onResults((results) => this.onFaceMeshResults(results));
            
            // Initialize Hands
            this.hands = new Hands({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            });
            this.hands.setOptions({
                maxNumHands: 2,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            this.hands.onResults((results) => this.onHandsResults(results));
            
            // Initialize Pose
            this.pose = new Pose({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
            });
            this.pose.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            this.pose.onResults((results) => this.onPoseResults(results));
            
            console.log('✅ All MediaPipe models initialized');
            this.showStatus('✅ Detection models ready!', 'success');
        } catch (error) {
            console.error('❌ Error initializing models:', error);
            this.showStatus('Error initializing models: ' + error.message, 'error');
        }
    }
    
    async startCamera() {
        try {
            console.log('🎥 Starting camera...');
            this.showStatus('Starting camera...', 'info');
            
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            });
            
            this.webcam.srcObject = this.stream;
            this.webcam.play().catch(error => {
                console.error('❌ Error playing video:', error);
                this.showStatus('Error playing video: ' + error.message, 'error');
            });
            
            this.webcam.onloadedmetadata = () => {
                console.log(`📐 Video dimensions: ${this.webcam.videoWidth}x${this.webcam.videoHeight}`);
                this.overlayCanvas.width = this.webcam.videoWidth;
                this.overlayCanvas.height = this.webcam.videoHeight;
                
                this.overlayCanvas.style.display = 'block';
                this.overlayCanvas.style.width = '100%';
                this.overlayCanvas.style.height = '100%';
                
                console.log(`📐 Canvas dimensions set to: ${this.overlayCanvas.width}x${this.overlayCanvas.height}`);
                this.processVideoFrame();
            };
            
            this.startCameraBtn.style.display = 'none';
            this.capturePhotoBtn.style.display = 'inline-block';
            this.retakePhotoBtn.style.display = 'inline-block';
            
            this.showStatus('🎥 Camera started! Position your face in the frame.', 'success');
        } catch (error) {
            console.error('❌ Camera error:', error);
            this.showStatus('Error accessing camera: ' + error.message, 'error');
        }
    }
    
    async processVideoFrame() {
        if (!this.stream || this.isProcessing) return;
        
        this.isProcessing = true;
        
        try {
            switch (this.currentJewelryType) {
                case 'earrings':
                case 'necklaces':
                    await this.faceMesh.send({ image: this.webcam });
                    break;
                case 'rings':
                    await this.hands.send({ image: this.webcam });
                    break;
                case 'chains':
                    await this.pose.send({ image: this.webcam });
                    break;
            }
        } catch (error) {
            console.error('Error processing frame:', error);
        }
        
        this.isProcessing = false;
        
        if (this.stream) {
            requestAnimationFrame(() => this.processVideoFrame());
        }
    }
    
    onFaceMeshResults(results) {
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];
            this.detectedLandmarks = landmarks;
            
            if ((this.currentJewelryType === 'earrings' || this.currentJewelryType === 'necklaces') && this.selectedJewelry) {
                this.drawJewelryOnLiveCamera();
            }
        }
    }
    
    onHandsResults(results) {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            this.detectedHandLandmarks = results.multiHandLandmarks;
            
            if (this.currentJewelryType === 'rings' && this.selectedJewelry) {
                this.drawJewelryOnLiveCamera();
            }
        }
    }
    
    onPoseResults(results) {
        if (results.poseLandmarks) {
            this.detectedPoseLandmarks = results.poseLandmarks;
            
            if (this.currentJewelryType === 'chains' && this.selectedJewelry) {
                this.drawJewelryOnLiveCamera();
            }
        }
    }
    
    drawJewelryOnLiveCamera() {
        this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);

        switch (this.currentJewelryType) {
            case 'earrings':
                if (this.detectedLandmarks && this.selectedJewelry) {
                    this.drawEarrings(this.overlayCtx, this.detectedLandmarks, this.overlayCanvas.width, this.overlayCanvas.height);
                }
                break;
            case 'necklaces':
                if (this.detectedLandmarks && this.selectedJewelry) {
                    this.drawNecklaces(this.overlayCtx, this.detectedLandmarks, this.overlayCanvas.width, this.overlayCanvas.height);
                }
                break;
            case 'rings':
                if (this.detectedHandLandmarks && this.selectedJewelry) {
                    this.drawRings(this.overlayCtx, this.detectedHandLandmarks, this.overlayCanvas.width, this.overlayCanvas.height);
                }
                break;
            case 'chains':
                if (this.detectedPoseLandmarks && this.selectedJewelry) {
                    this.drawChains(this.overlayCtx, this.detectedPoseLandmarks, this.overlayCanvas.width, this.overlayCanvas.height);
                }
                break;
        }
    }
    
    calculateFaceWidth(landmarks) {
        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        return Math.abs(rightCheek.x - leftCheek.x);
    }
    
    drawEarrings(ctx, landmarks, width, height) {
        const leftEarLobe = landmarks[177] || landmarks[234];
        const rightEarLobe = landmarks[401] || landmarks[454];
        
        if (!leftEarLobe || !rightEarLobe) return;
        
        const faceWidth = this.calculateFaceWidth(landmarks);
        const baseSizeInPixels = faceWidth * width * 0.35;
        const jewelryScale = this.selectedJewelry?.scale || 1.0;
        const earringSize = baseSizeInPixels * jewelryScale;
        
        const jewelryImage = this.jewelryCollections.earrings.images[this.selectedJewelry.id];
        if (!jewelryImage) return;
        
        ctx.globalAlpha = 0.9;
        
        // Left earring
        const leftX = leftEarLobe.x * width;
        const leftY = leftEarLobe.y * height;
        ctx.drawImage(jewelryImage, leftX - earringSize/2, leftY - earringSize/2, earringSize, earringSize);
        
        // Right earring
        const rightX = rightEarLobe.x * width;
        const rightY = rightEarLobe.y * height;
        ctx.drawImage(jewelryImage, rightX - earringSize/2, rightY - earringSize/2, earringSize, earringSize);
        
        ctx.globalAlpha = 1.0;
    }
    
    drawNecklaces(ctx, landmarks, width, height) {
        if (!this.selectedJewelry) {
            console.warn('⚠️ No necklace selected');
            return;
        }

        const chinCenter = landmarks[152];
        const leftJaw = landmarks[234];
        const rightJaw = landmarks[454];

        if (!chinCenter || !leftJaw || !rightJaw) {
            console.warn('⚠️ Missing chin or jaw landmarks');
            return;
        }

        const faceWidth = this.calculateFaceWidth(landmarks);
        // Use consistent width for both webcam and capture
        const necklaceWidth = faceWidth * width * 1.0;
        const necklaceHeight = necklaceWidth * 0.35;

        const jewelryScale = this.selectedJewelry?.scale || 1.0;
        const finalWidth = necklaceWidth * jewelryScale;
        const finalHeight = necklaceHeight * jewelryScale;

        const centerX = chinCenter.x * width;
        const neckOffset = finalHeight * 0.8;
        const userOffset = this.selectedJewelry?.offsetY || 0;
        const centerY = chinCenter.y * height + neckOffset + userOffset;

        const jewelryImage = this.jewelryCollections.necklaces.images[this.selectedJewelry.id];
        if (!jewelryImage) {
            console.warn(`⚠️ Necklace image not found for ID: ${this.selectedJewelry.id}`);
            return;
        }

        ctx.globalAlpha = 0.85;
        ctx.drawImage(jewelryImage, centerX - finalWidth/2, centerY - finalHeight/2, finalWidth, finalHeight);
        ctx.globalAlpha = 1.0;
    }
    
    drawRings(ctx, handLandmarks, width, height) {
        const jewelryImage = this.jewelryCollections.rings.images[this.selectedJewelry.id];
        if (!jewelryImage) return;
        
        const scale = 0.15;
        const ringSize = jewelryImage.width * scale;
        
        ctx.globalAlpha = 0.9;
        
        handLandmarks.forEach(hand => {
            if (hand && hand.length > 8) {
                const fingerTip = hand[8];
                const x = fingerTip.x * width;
                const y = fingerTip.y * height;
                ctx.drawImage(jewelryImage, x - ringSize/2, y - ringSize/2, ringSize, ringSize);
            }
        });
        
        ctx.globalAlpha = 1.0;
    }
    
    drawChains(ctx, poseLandmarks, width, height) {
        if (!poseLandmarks || poseLandmarks.length < 12) return;
        
        const jewelryImage = this.jewelryCollections.chains.images[this.selectedJewelry.id];
        if (!jewelryImage) return;
        
        const leftShoulder = poseLandmarks[11];
        const rightShoulder = poseLandmarks[12];
        const neck = poseLandmarks[0];
        
        if (!leftShoulder || !rightShoulder || !neck) return;
        
        const chainWidth = Math.abs(rightShoulder.x - leftShoulder.x) * width * 1.5;
        const chainHeight = chainWidth * 0.3;
        
        const centerX = neck.x * width;
        const centerY = neck.y * height + chainHeight;
        
        ctx.globalAlpha = 0.85;
        ctx.drawImage(jewelryImage, centerX - chainWidth/2, centerY - chainHeight/2, chainWidth, chainHeight);
        ctx.globalAlpha = 1.0;
    }
    
    capturePhoto() {
        // Create canvas with exact video dimensions
        const canvas = document.createElement('canvas');
        canvas.width = this.webcam.videoWidth;
        canvas.height = this.webcam.videoHeight;
        const ctx = canvas.getContext('2d');

        // Draw video frame
        ctx.drawImage(this.webcam, 0, 0);

        // Draw jewelry overlay using current landmarks
        if (this.selectedJewelry && this.detectedLandmarks) {
            switch (this.currentJewelryType) {
                case 'earrings':
                    this.drawEarrings(ctx, this.detectedLandmarks, canvas.width, canvas.height);
                    break;
                case 'necklaces':
                    this.drawNecklaces(ctx, this.detectedLandmarks, canvas.width, canvas.height);
                    break;
                case 'rings':
                    if (this.detectedHandLandmarks) {
                        this.drawRings(ctx, this.detectedHandLandmarks, canvas.width, canvas.height);
                    }
                    break;
                case 'chains':
                    if (this.detectedPoseLandmarks) {
                        this.drawChains(ctx, this.detectedPoseLandmarks, canvas.width, canvas.height);
                    }
                    break;
            }
        }

        this.capturedImage = canvas.toDataURL('image/jpeg', 0.95);

        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }

        this.webcam.style.display = 'none';
        this.overlayCanvas.style.display = 'none';

        this.startCameraBtn.style.display = 'inline-block';
        this.capturePhotoBtn.style.display = 'none';

        this.updatePreview();
        this.showStatus('✅ Photo captured!', 'success');
    }
    
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                this.capturedImage = canvas.toDataURL('image/jpeg', 0.95);
                this.webcam.style.display = 'none';
                this.overlayCanvas.style.display = 'none';
                
                this.updatePreview();
                this.showStatus('✅ Photo uploaded!', 'success');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    updatePreview() {
        if (!this.capturedImage) return;

        const img = new Image();
        img.onload = () => {
            // Set preview canvas to match image dimensions
            this.previewCanvas.width = img.width;
            this.previewCanvas.height = img.height;

            // Draw the captured image
            this.previewCtx.drawImage(img, 0, 0);

            // Redraw jewelry overlay on captured image with same landmarks
            if (this.detectedLandmarks) {
                switch(this.currentJewelryType) {
                    case 'earrings':
                        this.drawEarrings(this.previewCtx, this.detectedLandmarks, img.width, img.height);
                        break;
                    case 'necklaces':
                        this.drawNecklaces(this.previewCtx, this.detectedLandmarks, img.width, img.height);
                        break;
                    case 'rings':
                        if (this.detectedHandLandmarks) {
                            this.drawRings(this.previewCtx, this.detectedHandLandmarks, img.width, img.height);
                        }
                        break;
                    case 'chains':
                        if (this.detectedPoseLandmarks) {
                            this.drawChains(this.previewCtx, this.detectedPoseLandmarks, img.width, img.height);
                        }
                        break;
                }
            }

            // Show preview, hide placeholder
            this.previewCanvas.style.display = 'block';
            document.getElementById('previewPlaceholder').style.display = 'none';
            this.downloadBtn.style.display = 'inline-block';
            this.retakePhotoBtn.style.display = 'inline-block';
        };
        img.src = this.capturedImage;
    }
    
    saveImage() {
        const link = document.createElement('a');
        link.href = this.previewCanvas.toDataURL('image/jpeg', 0.95);
        link.download = `jewelry-tryon-${Date.now()}.jpg`;
        link.click();
        this.showStatus('✅ Image downloaded!', 'success');
    }
    
    retakePhoto() {
        this.capturedImage = null;
        this.detectedLandmarks = null;
        this.detectedHandLandmarks = null;
        this.detectedPoseLandmarks = null;

        this.webcam.style.display = 'block';
        this.overlayCanvas.style.display = 'block';
        this.previewCanvas.style.display = 'none';
        this.capturePhotoBtn.style.display = 'inline-block';
        this.downloadBtn.style.display = 'none';
        this.retakePhotoBtn.style.display = 'none';
        document.getElementById('previewPlaceholder').style.display = 'block';

        this.startCamera();
    }
    
    showStatus(message, type = 'info') {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `status-message ${type}`;
        setTimeout(() => {
            this.statusDiv.textContent = '';
            this.statusDiv.className = 'status-message';
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, initializing JewelryTryOn...');
    new JewelryTryOn();
});

