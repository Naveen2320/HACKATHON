const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get All (or by category)
router.get('/category/:category', async (req, res) => {
    try {
        const items = await MenuItem.find({ category: req.params.category });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get By ID
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
