const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

// Middleware
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

// Create Order
router.post('/', async (req, res) => {
    try {
        const { delivery_address, phone } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ detail: 'Cart is empty' });
        }

        const orderItems = cart.items.map(item => ({
            menu_item: item.menu_item_id,
            quantity: item.quantity,
            price: item.price
        }));

        const newOrder = new Order({
            user: req.user._id,
            items: orderItems,
            total: cart.total,
            delivery_address,
            phone
        });

        const savedOrder = await newOrder.save();

        // Clear Cart
        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.json({ id: savedOrder._id, message: 'Order created successfully' });

    } catch (err) {
        res.status(500).json({ detail: err.message });
    }
});

// Get Order History
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ detail: err.message });
    }
});

// Get Order By ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.menu_item');
        if (!order) return res.status(404).json({ detail: 'Order not found' });

        // Verify ownership
        if (order.user.toString() !== req.user._id) {
            return res.status(403).json({ detail: 'Access denied' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ detail: err.message });
    }
});

module.exports = router;
