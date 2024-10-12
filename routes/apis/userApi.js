// routes/userRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../../models/User');
const setHeaders = require('../../middleware/setHeaders');
const validateHeaders = require('../../middleware/validateHeaders');

// const db = require('../config/db');
// const mongoose = db;
const mongoose = require('mongoose');

// Get users
routes.get('/api/users', setHeaders, validateHeaders, async (request, response) => {
    try {
        const users = await User.find();
        const userData = users.map((user) => {
            return {
              'username': user.username,
              'user data': {
                [user._id]: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt,
                  fullName: user.fullName
                }
              }
            };
          });
        response.jsonify(200, userData, 'End of list');
        console.log(JSON.stringify(users, null, 2))
    } catch (error) {
        response.status(500).send(error);
    }
});

// Add a user
routes.post('/api/users', setHeaders, validateHeaders, async (request, response) => {
    try {
        
        // Validate user input
        if (!request.body.firstName || !request.body.lastName || !request.body.username || !request.body.email || !request.body.password) {
            console.error('Please fill in all required fields')
            return response.status(400).send({ message: 'Please fill in all required fields' });
        }

        // Validate existing user information
        const existingUser = await User.findOne({
            $or: [{ username: request.body.username }, { email: request.body.email }]
        });

        if (existingUser) {
            if (existingUser.username === request.body.username) {
                console.error(`ERROR: Username [${existingUser.username}] already exists`);
                return response.status(400).send({ error: `'Username [${existingUser.username}] already exists'` });
            } else {
                console.error(`ERROR: Email [${existingUser.email}] already exists`);
                return response.status(400).send({ error: `Email [${existingUser.email}] already exists` });
            }

        }

        const user = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
        });
        await user.save();

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        }
        response.jsonify(201, userData, `User [${user.username}] created successfully!`);

        console.log(JSON.stringify(userData, null, 2))
        console.log(`User: [{${user._id}}-(${user.username})] - created successfully\r\n`);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Error creating user' });
    }
});

// Get a user
routes.get('/api/user/:id', setHeaders, validateHeaders, async (request, response) => {
    try {
        const userId = request.params.id;
        if (userId.length < 24) {
            response.status(400).send({ ERROR: `${response.statusCode}: Input must be a 24 character hex string` });
            console.log(`ERROR: ${response.statusCode}: Input must be a 24 character hex string`);
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            response.status(404).send({ ERROR: `${response.statusCode}: User [${userId}] not found` });
            console.log(`ERROR: ${response.statusCode}: User [${userId}] not found`);
        } else {
            const userData = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                fullName: user.fullName
            };
            
            response.jsonify(200, userData, `User ID: ${userId}`);
            console.log(JSON.stringify(user, null, 2));
        }
    } catch (error) {
        response.status(500).send({ error: 'Internal server error' });
        console.error(`ERROR: ${response.statusCode}:`, error);
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
