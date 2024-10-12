// routes/adminRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');

routes.get("/", async (request, response) => {
    const users = await User.find();
    response.render("admin/index", { title: "Admin Backend", users });
});

module.exports = routes;

