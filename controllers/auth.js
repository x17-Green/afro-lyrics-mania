// controllers/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error creating user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const isValidPassword = await user.comparePassword(req.body.password);
        if (!isValidPassword) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

// Authentication
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user profile' });
    }
});

// Middleware to authenticate requests
function authenticate(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ message: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
}

module.exports = router;