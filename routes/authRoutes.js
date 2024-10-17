// routes/authRoutes.js

const express = require('express');
const routes = express.Router();
const authController = require('../controllers/auth');

// routes.post('/register', (request, response) => {
//     authController.register(request, response);  
// });
routes.post('/register', authController.register);
routes.post('/login', authController.login);
routes.get('/profile', authController.authenticate, authController.profile);

module.exports = routes;