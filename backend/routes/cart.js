const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

router.use(verifyToken);

// Get Cart
router.get('/', async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add to Cart
router.post('/add', async (req, res) => {
    try {
        const { menu_item_id, quantity } = req.body;
        const menuItem = await MenuItem.findById(menu_item_id);
        if (!menuItem) return res.status(404).json({ message: 'Item not found' });

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(p => p.menu_item_id.toString() === menu_item_id);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                menu_item_id,
                quantity,
                name: menuItem.name,
                price: menuItem.price,
                image_url: menuItem.image_url
            });
        }

        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Quantity
router.put('/update', async (req, res) => {
    try {
        const { menu_item_id, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(p => p.menu_item_id.toString() === menu_item_id);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        }

        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove Item
router.delete('/item/:id', async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(p => p.menu_item_id.toString() === req.params.id);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        }

        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Clear Cart
router.delete('/clear', async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            cart.total = 0;
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
