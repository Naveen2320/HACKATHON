const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection & Seed Logic
const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI;

        // If URI is localhost, assume we need memory server since user likely doesn't have MongoDB installed
        if (!mongoUri || mongoUri.includes('localhost')) {
            console.log("No external MongoDB detected. Starting in-memory database...");
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
        }

        await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${mongoUri}`);

        // Seed Data if Empty
        const count = await MenuItem.countDocuments();
        if (count === 0) {
            const menuItems = [
                {
                    name: 'Margherita',
                    description: 'Classic tomato and mozzarella',
                    price: 12.99,
                    category: 'pizza',
                    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    inventory: 50
                },
                {
                    name: 'Pepperoni',
                    description: 'Spicy pepperoni with mozzarella',
                    price: 14.99,
                    category: 'pizza',
                    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    inventory: 40
                },
                {
                    name: 'Veggie Supreme',
                    description: 'Loaded with bell peppers, onions, and mushrooms',
                    price: 13.99,
                    category: 'pizza',
                    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    inventory: 30
                },
                {
                    name: 'Coca Cola',
                    description: 'Classic cola drink',
                    price: 2.99,
                    category: 'drinks',
                    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    inventory: 100
                },
                {
                    name: 'Garlic Bread',
                    description: 'Buttery garlic bread sticks',
                    price: 5.99,
                    category: 'sides',
                    image_url: 'https://images.unsplash.com/photo-1573140247632-f846ae726c26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    inventory: 60
                }
            ];
            await MenuItem.insertMany(menuItems);
            console.log("Database Seeded");
        }

    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Pizza API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
