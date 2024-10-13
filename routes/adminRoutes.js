// routes/adminRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');

routes.get("/", async (request, response) => {
    const users = await User.find();
    response.render("backend/index", { title: "Admin Backend", users });
});

routes.get("/users", async (request, response) => {
    const users = await User.find();
    response.render("backend/users", { title: "Users", users });
});

module.exports = routes;

