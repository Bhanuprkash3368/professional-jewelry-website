// Global state
let currentUser = null;
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    setupNavigation();
});

// Load user from localStorage
function loadUser() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
        updateUserUI();
    }
}

// Setup navigation
function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update user UI
function updateUserUI() {
    const accountLink = document.querySelector('a[href="account.html"]');
    if (accountLink && currentUser) {
        accountLink.textContent = `${currentUser.name}`;
    }
}

// Fetch products
async function fetchProducts(category = null) {
    try {
        const url = category ? `/api/products/category/${category}` : '/api/products';
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Fetch single product
async function fetchProduct(id) {
    try {
        const response = await fetch(`/api/products/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Register user
async function registerUser(email, password, name) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });
        const data = await response.json();
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('user', JSON.stringify(currentUser));
            updateUserUI();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error registering:', error);
        return false;
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('user', JSON.stringify(currentUser));
            updateUserUI();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error logging in:', error);
        return false;
    }
}

// Logout user
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('user');
    updateUserUI();
    window.location.href = 'index.html';
}

// Add to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Get cart
function getCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
}

// Create order
async function createOrder(productId, quantity) {
    if (!currentUser) {
        alert('Please login first');
        return false;
    }
    
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.id,
                productId,
                quantity
            })
        });
        const order = await response.json();
        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
}

// Get user orders
async function getUserOrders() {
    if (!currentUser) return [];
    
    try {
        const response = await fetch(`/api/orders/${currentUser.id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// Format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

