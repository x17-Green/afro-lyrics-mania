// routes/userRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');
// const db = require('../config/db');
// const mongoose = db;
const mongoose = require('mongoose');

// Render the HTML page
// routes.get('/', async (request, response) => {
//     try {
//         const users = await User.find();
//         response.render("users", { title: "Users", users });
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// Send the JSON data
routes.get('/api/users', async (request, response) => {
    try {
        const users = await User.find();
        response.status(201).send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

routes.post('/api/users', async (request, response) => {
    try {
        const user = new User(request.body);
        await user.save();
        response.status(201).send(user);
        // response.json(user);
    } catch (error) {
        response.status(400).send(error);
    }
});

// Get a user
routes.get('/api/users/:id', async (request, response) => {
    try {
        const userId = request.params.id;
        const user = await User.findById(userId);
        if (!user) {
            response.status(404).send({ message: 'User  not found' });
        } else {
            response.send({ 
                UserID: user._id,
                UserName: user.username,
                Email: user.email,
                Name: user.name
            });
            // response.json({ userId: user._id });
        }
    } catch (error) {
        response.status(500).send(error);
    }
});

// Update a user
routes.put('/api/users/:id', async (request, response) => {
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
routes.delete('/api/users/:id', async (request, response) => {
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
        console.log('User ' + user._id + ' deleted successfully')
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
