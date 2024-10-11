// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        virtual: true,
        get() {
            return `${this.firstName} ${this.lastName}`
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // profilePicture: {
    //     type: String,
    //     default: '',
    // },
    // coverPicture: {
    //     type: String,
    //     default: '',
    // },
    // bio: {
    //     type: String,
    //     default: '',
    // },
    // location: {
    //     type: String,
    //     default: '',
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a virtual field for fullName that populates with the values from firstName and lastName
userSchema.virtual('fullNames').get(function () {
    return this.firstName + ' ' + this.lastName;
});

// Set the fullName field to the value of the virtual field when the document is saved
userSchema.pre('save', function (next) {
    this.fullName = this.firstName + ' ' + this.lastName;
    next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare password for authentication
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('Users ', userSchema);

module.exports = User;
