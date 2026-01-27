const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
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

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ detail: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        const savedUser = await user.save();

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET);
        res.header('auth-token', token).json({ access_token: token, user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ detail: 'Email is not found' });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ detail: 'Invalid password' });

        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET);
        res.header('auth-token', token).json({ access_token: token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Me
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
