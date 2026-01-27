# 🍕 MERN Stack Food Ordering Application

Snacks Street is a full-stack food ordering web application built using the MERN stack.  
Users can browse food items, add them to cart, choose delivery or carryout, place orders, and manage inventory in real time.

This project is designed as a hackathon-ready MVP with scope for future enhancements.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Axios
- Context API
- HTML, CSS, JavaScript

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt

### Database
- MongoDB (Mongoose)

### Tools
- Postman
- GitHub

---

## 🧠 System Architecture

User (Browser)
|
v
React Frontend
(Menu, Cart, Orders)
|
v
REST API (Express.js)
(Auth, Orders, Inventory)
|
v
MongoDB
(Users, Products, Orders)
|
v
External Services
(Email Service - Stretch Feature)


---

## 👤 User Journey

1. User opens the application  
2. Browses menu (Pizza, Drinks, Bread)  
3. Adds items to cart  
4. Chooses order type (Delivery / Carryout)  
5. Login / Signup  
6. Places order  
7. Order created  
8. Inventory reduced  
9. Order confirmation shown  
10. Email confirmation (stretch)

---

## ✅ MVP Features

- Browse menu
- Add to cart
- Place order
- Inventory management
- Secure REST APIs
- API testing via Postman
- GitHub repository

---

## 🏗️ Project Structure

### Frontend (React)

frontend/
│
├── components/
│ ├── Menu
│ ├── Cart
│ ├── Login
│ └── Orders
│
├── context/
├── services/
└── App.js

### Backend (Node + Express)

backend/
│
├── routes/
│ ├── auth.routes.js
│ ├── product.routes.js
│ └── order.routes.js
│
├── controllers/
├── models/
├── middleware/
├── services/
└── app.js



---

## 🗄️ Database Design

### Product Schema
```js
{
  name: String,
  category: String,
  price: Number,
  stock: Number
}
 User Schema

 {
  name: String,
  email: String,
  password: String,
  role: String
}
Order Schema
{
  userId: ObjectId,
  items: [{ productId, quantity }],
  orderType: "delivery" | "carryout",
  totalPrice: Number,
  status: String,
  createdAt: Date
}

🔌 REST API Endpoints

| Action        | Method | Endpoint           |
| ------------- | ------ | ------------------ |
| Get Menu      | GET    | /api/products      |
| Register      | POST   | /api/auth/register |
| Login         | POST   | /api/auth/login    |
| Place Order   | POST   | /api/orders        |
| Order History | GET    | /api/orders/my     |

🔐 Security

JWT-based authentication

Protected routes using middleware

Password hashing with bcrypt

Authenticated users only can place orders and view history


📉 Inventory Logic

Order API
   ↓
Check stock
   ↓
Reduce quantity
   ↓
Save order


🎨 Frontend Pages
Menu Page

Cart Page

Login / Register Page

Order Confirmation Page

Order History (Stretch)

🔗 Frontend ↔ Backend Flow

React → Axios → Express API → MongoDB

✨ Stretch Features
Email confirmation after order

Order history page

Admin inventory dashboard


⚙️ How to Run the Project

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm start
