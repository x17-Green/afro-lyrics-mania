// models/ArtistProfile.js

const mongoose = require('mongoose');

const artistProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
    socialMedia: {
        instagram: {
            type: String,
            default: '',
        },
        facebook: {
            type: String,
            default: '',
        },
        twitter: {
            type: String,
            default: '',
        },
        youtube: {
            type: String,
            default: '',
        },
        soundcloud: {
            type: String,
            default: '',
        },
    },
    genre: {
        type: String,
        default: '',
    },
    musicStyle: {
        type: String,
        default: '',
    },
    instruments: [
        {
            type: String,
        },
    ],
    discography: [
        {
            title: {
                type: String,
            },
            releaseDate: {
                type: Date,
            },
            genre: {
                type: String,
            },
            description: {
                type: String,
            },
        },
    ],
    upcomingShows: [
        {
            date: {
                type: Date,
            },
            location: {
                type: String,
            },
            venue: {
                type: String,
            },
            description: {
                type: String,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const ArtistProfile = mongoose.model('ArtistProfile', artistProfileSchema);

module.exports = ArtistProfile;
