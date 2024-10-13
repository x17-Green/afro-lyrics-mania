// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const dotenv = require("dotenv")
// const jwt = require('jsonwebtoken')
const jsonifier = require('./middleware/jsonifier')
const db = require('./config/db')

dotenv.config();

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonifier);
// app.use(jwt);
app.db = db;

/**
 * Routes Definitions
 */

const pageRoutes = require('./routes/pageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./controllers/auth')

app.use('/', pageRoutes);
app.use('/', authRoutes)
app.use('/admin', adminRoutes);


/**
 * API Route Connections
*/
const userApi = require('./routes/apis/userApi');
const profileApi = require('./routes/apis/profileApi');

app.use('/api', userApi);
app.use('/api', profileApi);


/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


exports.module = { db };