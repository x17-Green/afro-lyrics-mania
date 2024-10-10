// routes/indexRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');

routes.get("/", async (request, response) => {
    response.render("index", { title: "Home" });
});

routes.get('/user', async (request, response) => {
    try {
        const users = await User.find();
        response.render("users", { title: "Users", users });
    } catch (error) {
        response.status(500).send(error);
    }
});

routes.get("/output", async (request, response) => {
    response.render("output", { title: "Test Output" });
});



module.exports = routes;
