// controllers/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Registration
const register = async (request, response) => {
    try {
        
        const {
            firstName,
            lastName,
            username,
            email,
            password
        } = request.body;
        
        // Validate user input data
        if (!firstName || !lastName || !username || !email || !password) {
            console.log(`Please provide all required fields`)
            return response.jsonify(400, 'Please provide all required fields');
        }
        
        // Check if existing user
        const existingUser = await User.findOne({ 
            $or: [{ username: username }, { email: email }] 
        });
        
        if (existingUser) {
            if (existingUser.username === username) {
                console.log(`Username: [${existingUser.username}] already exists`)
                return response.jsonify(400, `Username: [${existingUser.username}] already exists`);
            } else {
                console.log(`Email address: [${existingUser.email} already] exists`)
                return response.jsonify(400, `Email address: [${existingUser.email}] already exists`);
            }
        }
        
        // Hash user password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });
                
        // Save user to database
        await user.save();
        
        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        // Defined user data
        const userData = {
            'registered': user.username,
            'information': {
                [user._id]: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName
                }
            }
        }
        
        // Return JWT Token and add user data
        console.log(`Username: [${user.username}] created successfully`)
        response.jsonify(201, token, userData, `Username: [${user.username}] created successfully`)
    } catch (error) {
        console.error(error, 'Error creating user');
        response.status(400).send({ message: 'Error creating user' });
    }
};

// Login
const login = async (request, response) => {
    try {
        
        const {
            username,
            email,
            password
        } = request.body;
        
        // Validate user input data
        if (!username || !email || !password) {
            return response.jsonify(400, 'Please provide all required fields');
        }
                
        // Check for existing username and email
        const loginInfo = await User.findOne({
            $or: [{ username: username }, { email: email }]
        })
        
        if (loginInfo) {
            if (loginInfo.username !== username) {
                console.error(`ERROR: Incorrect username`);
                return response.status(400).send({ error: `ERROR: Incorrect username` });
            } 
            if (loginInfo.email !== email) {
                console.error(`ERROR: Incorrect email address`);
                return response.status(400).send({ error: `ERROR: Incorrect email address` });
            }
        }
        
        // Compare provided password with hashed password in database
        const user = await User.findOne({ username });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.error(`ERROR: Incorrect password`);
            return response.status(401).send({ message: 'Incorrect password' });
        }
        
        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        

        // Defined user data
        const userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        }
        
        // Return JWT Token and add user data
        response.jsonify(200, token, userData, 'Logged in successfully')
        console.log(`User: ${userData.username} logged in successfully`)
    } catch (error) {
        console.error(error);
        response.status(400).send({ message: 'Error logging in' });
    }
};

// Authentication
const profile = async (request, response) => {
    try {
        const user = await User.findById(req.user.userId);
        response.status(200).send(user);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Error retrieving user profile' });
    }
};

// Middleware to authenticate requests
function authenticate(request, response, next) {
    const token = req.header('Authorization');
    if (!token) {
        return response.status(401).send({ message: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        request.user = decoded;
        next();
    } catch (error) {
        response.status(401).send({ message: 'Invalid token' });
    }
}

// module.exports = routes;
module.exports = {
    register,
    login,
    authenticate,
    profile
};