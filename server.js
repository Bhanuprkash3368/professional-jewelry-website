const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database
const products = [
    { id: 1, name: 'Gold Drop Earrings', price: 45, category: 'earrings', image: '/images/earring1.jpg', description: 'Elegant gold drop earrings' },
    { id: 2, name: 'Pearl Studs', price: 35, category: 'earrings', image: '/images/earring2.jpg', description: 'Classic pearl stud earrings' },
    { id: 3, name: 'Diamond Hoops', price: 65, category: 'earrings', image: '/images/earring3.jpg', description: 'Sparkling diamond hoop earrings' },
    { id: 4, name: 'Rose Gold Earrings', price: 55, category: 'earrings', image: '/images/earring4.jpg', description: 'Rose gold dangle earrings' },
    { id: 5, name: 'Gold Chain Necklace', price: 89, category: 'necklaces', image: '/images/necklace1.jpg', description: 'Classic gold chain necklace' },
    { id: 6, name: 'Diamond Pendant', price: 199, category: 'necklaces', image: '/images/necklace2.jpg', description: 'Diamond pendant necklace' },
    { id: 7, name: 'Pearl Choker', price: 75, category: 'necklaces', image: '/images/necklace3.jpg', description: 'Elegant pearl choker' },
    { id: 8, name: 'Rose Gold Layered', price: 125, category: 'necklaces', image: '/images/necklace4.jpg', description: 'Layered rose gold necklace' },
    { id: 9, name: 'Diamond Solitaire Ring', price: 299, category: 'rings', image: '/images/ring1.jpg', description: 'Classic diamond solitaire ring' },
    { id: 10, name: 'Gold Band Ring', price: 149, category: 'rings', image: '/images/ring2.jpg', description: 'Simple gold band ring' },
    { id: 11, name: 'Emerald Ring', price: 399, category: 'rings', image: '/images/ring3.jpg', description: 'Emerald gemstone ring' },
    { id: 12, name: 'Rose Gold Twist Ring', price: 179, category: 'rings', image: '/images/ring4.jpg', description: 'Twisted rose gold ring' }
];

const users = [];
const orders = [];

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
    const filtered = products.filter(p => p.category === req.params.category);
    res.json(filtered);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// Create order
app.post('/api/orders', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const order = {
        id: orders.length + 1,
        userId,
        productId,
        quantity,
        date: new Date(),
        status: 'pending'
    };
    orders.push(order);
    res.json(order);
});

// Get user orders
app.get('/api/orders/:userId', (req, res) => {
    const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
    res.json(userOrders);
});

// Register user
app.post('/api/auth/register', (req, res) => {
    const { email, password, name } = req.body;
    const user = {
        id: users.length + 1,
        email,
        password,
        name,
        createdAt: new Date()
    };
    users.push(user);
    res.json({ success: true, user });
});

// Login user
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ success: true, user });
});

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║    💍 PROFESSIONAL JEWELRY WEBSITE - BACKEND RUNNING      ║
║                                                            ║
║    🌐 API: http://localhost:${PORT}/api                   ║
║    🌐 Website: http://localhost:${PORT}                   ║
║                                                            ║
║    Press Ctrl+C to stop the server                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

