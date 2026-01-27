const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');

dotenv.config();

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

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(menuItems);
        console.log('Data Imported');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
