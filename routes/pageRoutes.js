// routes/indexRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');

// Middlewares
const setHeaders = require('../middleware/setHeaders');
const validateHeaders = require('../middleware/validateHeaders');


routes.get("/", async (request, response) => {
    const users = await User.findOne();
    response.render("index", { title: "Home", users });
});

routes.get('/users', async (request, response) => {
    try {
        const users = await User.find();
        response.render("users", { title: "Users", users });
    } catch (error) {
        response.status(500).send(error);
    }
});

routes.get("/output", async (request, response) => {
    try {
        const users = await User.find();
        response.render("output", { title: "Test Output", users });
    } catch (error) {
        response.status(500).send(error);
    }
});

routes.get('/register', async (req, response) => {
    // const users = await User.findOne();
    response.render("backend/auth/register", { title: "Register" });
});

routes.get('/login', async (req, response) => {
    // const users = await User.findOne();
    response.render("backend/auth/login", { title: "Login" });
});

routes.get('/profile', async (req, response) => {
    // const users = await User.findOne();
    response.render("frontend/users/profile", { title: "User Profile" });
});

const articles = require('../public/scripts/components/cards/heroCard')
routes.get('/hero/cards/template', (req, response) => {
    console.log("Rendering heroCard template...")
    response.render("components/cards/heroCard", { title: "Hero card", articles });
});

// routes.get('/hero/cards/data', setHeaders, validateHeaders, async (req, response) => {
//     const jsonString = JSON.stringify(articles, null, 2)
//     console.log(jsonString)
//     // response.json(articles);
//     response.jsonify(200, articles, 'Articles');
// });

routes.get('/hero/cards/data', setHeaders, validateHeaders, async (req, response) => {
    response.header('Content-Type', 'application/json');
    response.json(articles);
});

module.exports = routes;
