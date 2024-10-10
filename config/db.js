// config/db.js

const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_URL || 'mongodb://localhost:27017/alm-dev-test-db-01';

mongoose.connect(mongodb, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log(`Connected to MongoDB at ${mongodb}`)
});

module.exports = db
