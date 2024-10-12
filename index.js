// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const jsonifier = require('./middleware/jsonifier')
const db = require('./config/db')

require('dotenv').config();

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "3000";

/**
 * Routes
 */

const pageRoutes = require('./routes/pageRoutes');
const userApi = require('./routes/apis/userApi');
const adminRoutes = require('./routes/adminRoutes')

/**
 *  App Configuration
 */

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonifier)
// app.use(setHeaders)

app.db = db;

/**
 * Routes Definitions
 */

app.use('/', pageRoutes);
app.use('/users', userApi);
app.use('/admin', adminRoutes);


/**
 * Api Connections
 */

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


exports.module = { db };