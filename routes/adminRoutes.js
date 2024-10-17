// routes/adminRoutes.js

const express = require('express');
const routes = express.Router();
const User = require('../models/User');

routes.get("/", async (request, response) => {
    const links = {
        '/admin/users': [
            { href: '/logout', title: 'Logout' }
        ],
        '/admin': [
            { href: '/admin/users', title: 'Users' },
            { href: '/profile', title: 'Admin Profile' },
            { href: '/output', title: 'Database' }
        ],
        '/profile': [
            { href: '/admin', title: 'Backend Admin Route' },
            { href: '/admin/users', title: 'Current User account' },
            { href: '/output', title: 'Database' }
        ],
        '/output': [
            { href: '/admin', title: 'Backend Admin Route' },
            { href: '/profile', title: 'Admin Profile' },
            { href: '/admin/users', title: 'Current User account' }
        ],
        '/': [] // Add this line to handle the root path
    };
    
    response.render("backend/index", { 
        title: "Admin Backend",
        request: request,
        // links: links
        locals: {
            links: links
        }
    });
});

// routes.get("/users", async (request, response) => {
    //     const users = await User.find();
//     response.render("backend/users/users", { title: "Users", users, request: request });
// });

// routes.get("/users", async (request, response) => {
    //     const users = await User.find();
//     // In your route handler:
//     response.render("backend/users/users", { 
//         title: "Users", 
//         users, 
//         request: request, 
//         links: {
//             '/admin/users': [
//                 { href: '/logout', title: 'Logout' }
//             ],
//             '/admin': [
//                 { href: '/admin/users', title: 'Users' },
//                 { href: '/profile', title: 'Admin Profile' },
//                 { href: '/output', title: 'Database' }
//             ],
//             '/profile': [
//                 { href: '/admin', title: 'Backend Admin Route' },
//                 { href: '/admin/users', title: 'Current User account' },
//                 { href: '/output', title: 'Database' }
//             ],
//             '/output': [
//                 { href: '/admin', title: 'Backend Admin Route' },
//                 { href: '/profile', title: 'Admin Profile' },
//                 { href: '/admin/users', title: 'Current User account' }
//             ]
//         }
//     });
// });


// In your route handler:
routes.get('/users', async (request, response) => {
    const users = await User.find();
    
    response.render('backend/users/users', {
        title: 'Users',
        users,
        request: request
    });
});


module.exports = routes;

