// routes/adminRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');

routes.get("/", async (request, response) => {
    response.render("admin/index", { title: "Admin Backend" });
});

module.exports = routes;
