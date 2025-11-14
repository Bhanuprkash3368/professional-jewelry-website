# 💍 Professional Jewelry Try-On Website

A complete, professional 10-page jewelry e-commerce website with virtual try-on functionality, backend API, and modern frontend design.

## 📁 Project Structure

```
professional-jewelry-website/
├── server.js                 # Express backend server
├── package.json             # Node.js dependencies
├── public/
│   ├── index.html          # Home page
│   ├── about.html          # About Us page
│   ├── products.html       # Products catalog
│   ├── tryon.html          # Virtual Try-On page
│   ├── gallery.html        # Customer Gallery
│   ├── pricing.html        # Pricing & Shipping
│   ├── blog.html           # Blog & Articles
│   ├── contact.html        # Contact Us
│   ├── account.html        # User Account & Login
│   ├── css/
│   │   └── style.css       # Global styles
│   └── js/
│       └── main.js         # Frontend JavaScript
```

## 🎯 Features

### Frontend (10 Pages)
1. **Home** - Landing page with featured products
2. **About** - Company story and mission
3. **Products** - Full product catalog with filters
4. **Try-On** - Virtual jewelry try-on with camera
5. **Gallery** - Customer showcase gallery
6. **Pricing** - Pricing tiers and shipping info
7. **Blog** - Articles and jewelry tips
8. **Contact** - Contact form and information
9. **Account** - User login/registration and dashboard
10. **FAQ** - Frequently asked questions (expandable)

### Backend API
- **Express.js** server on port 3001
- RESTful API endpoints
- Product management
- User authentication
- Order management
- CORS enabled

### API Endpoints
```
GET  /api/products              - Get all products
GET  /api/products/:id          - Get single product
GET  /api/products/category/:cat - Get products by category
POST /api/orders                - Create order
GET  /api/orders/:userId        - Get user orders
POST /api/auth/register         - Register user
POST /api/auth/login            - Login user
GET  /api/health                - Health check
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Navigate to project directory**
```bash
cd professional-jewelry-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3001
```

## 🎨 Design Features

- **Gold Luxury Theme** - Premium color scheme (#d4af37)
- **Responsive Design** - Works on desktop, tablet, mobile
- **Modern UI** - Clean, professional interface
- **Smooth Animations** - Hover effects and transitions
- **Accessibility** - Semantic HTML and proper contrast

## 💻 Technology Stack

### Frontend
- HTML5
- CSS3 (Responsive Grid & Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage for user data

### Backend
- Node.js
- Express.js
- Body Parser
- CORS

## 📱 Pages Overview

### Home (index.html)
- Hero section with CTA
- Features showcase
- Featured products grid
- Call-to-action section

### Products (products.html)
- Product catalog
- Category filters
- Product cards with pricing
- Add to cart functionality

### Try-On (tryon.html)
- Camera integration
- Photo upload
- Jewelry selection
- Real-time preview
- Download functionality

### Account (account.html)
- User registration
- Login system
- User dashboard
- Order history
- Profile management

### Contact (contact.html)
- Contact form
- Business information
- Social media links
- Hours of operation

## 🔐 Security Notes

- Passwords stored in mock database (for demo)
- Use proper authentication in production
- Implement HTTPS in production
- Add input validation and sanitization

## 📊 Mock Data

The backend includes mock data for:
- 12 jewelry products (earrings, necklaces, rings)
- User accounts
- Order history

## 🎯 Future Enhancements

- Real database integration (MongoDB/PostgreSQL)
- Payment gateway integration (Stripe/PayPal)
- Advanced face detection with MediaPipe
- Email notifications
- Admin dashboard
- Inventory management
- Customer reviews and ratings

## 📝 License

MIT License - Feel free to use for commercial projects

## 👥 Support

For support, email: info@luxejewelry.com

---

**Built with ❤️ for jewelry lovers**

