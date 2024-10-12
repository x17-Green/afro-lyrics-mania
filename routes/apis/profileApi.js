// routes/profileApi.js

const express = require('express');
const routes = express.Router();
const User = require('../../models/User');
const setHeaders = require('../../middleware/setHeaders');
const validateHeaders = require('../../middleware/validateHeaders');

module.exports = routes;
