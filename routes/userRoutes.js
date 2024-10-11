// routes/userRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');
const setHeaders = require('../middleware/setHeaders');
const validateHeaders = require('../middleware/validateHeaders');

// const db = require('../config/db');
// const mongoose = db;
const mongoose = require('mongoose');

// Get users
routes.get('/api/users', setHeaders, validateHeaders, async (request, response) => {
    try {
        const users = await User.find();
        response.status(201).send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Add a user
routes.post('/api/users', setHeaders, validateHeaders, async (req, res) => {
    try {

        if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: 'Please fill in all required fields' });
          }

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            // profilePicture: req.body.profilePicture,
            // coverPicture: req.body.coverPicture,
            // bio: req.body.bio,
            // location: req.body.location,
        });
        await user.save();
        res.status(201).send(user);
        console.log(`User: [${user._id}] - created successfully`)
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Error creating user', err });
    }
});

// Get a user
routes.get('/api/user/:id', setHeaders, async (request, response) => {
    try {
        const userId = request.params.id;
        const user = await User.findById(userId);
        if (!user) {
            response.status(404).send({ message: 'User  not found' });
        } else {
            response.status(200).send(user)
        }
    } catch (error) {
        response.status(500).send(error);
    }
});

// Update a user
routes.put('/api/user/:id', setHeaders, async (request, response) => {
    try {
        const userId = request.params.id
        const user = await User.findByIdAndUpdate(userId, request.body, { new: true });
        if (!user) {
            response.status(404).send({ message: 'User not found' });
        } else {
            response.send(user);
        }
    } catch (error) {
        response.status(400).send(error);
    }
});

// Delete a user
routes.delete('/api/user/:id', setHeaders, async (request, response) => {
    const userId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).send({ message: 'Invalid user ID' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }
        await User.findByIdAndDelete(userId);
        response.send({ message: 'User ' + user._id + ' deleted successfully' });
        console.log('User: [' + user._id + '] - deleted successfully')
    } catch (error) {
        if (error instanceof mongoose.Error) {
            console.error('MongoError:', error);
            response.status(500).send({ message: 'Database error' });
        } else {
            console.error('Error:', error);
            response.status(500).send({ message: 'Internal Server Error' });
        }
        response.status(500).send(error);
    }
});

module.exports = routes;
