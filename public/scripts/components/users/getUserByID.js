// getUserByID.js

// function populateUserInfo(userId, elementId) {
//     const element = document.getElementById(elementId);
//     if (!element) {
//         console.error(`Element with id '${elementId}' not found.`);
//         return;
//     }

//     fetch(`/api/user/${userId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(responseData => {
//         console.log(responseData);
//         if (responseData.data) {
//             const userData = responseData.data;
//             const userInfoText = `User ID: ${userId}, Name: ${userData.fullName}, Email: ${userData.email}`;
            
//             if (element.tagName.toLowerCase() === 'textarea') {
//                 element.value = userInfoText.replace(/,/g, '\n');
//             } else {
//                 element.textContent = userInfoText;
//             }
//         } else {
//             throw new Error(responseData.message || 'Unknown error occurred');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         const errorMessage = 'Error fetching user data: ' + error.message;
//         if (element.tagName.toLowerCase() === 'textarea') {
//             element.value = errorMessage;
//         } else {
//             element.textContent = errorMessage;
//         }
//     });
// }

// // Usage
// document.addEventListener('DOMContentLoaded', function() {
//     const userId = '6709f5bccf15d93164b952d0'; // Replace with dynamic user ID when available
    
//     // Populate user info in a paragraph
//     populateUserInfo(userId, 'user-info-paragraph');
    
//     // Populate user info in a textarea
//     populateUserInfo(userId, 'user-info-textarea');
// });


// getUserByID.js

function getUserInfo(userId) {
    return fetch(`/api/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        if (responseData.data) {
            return responseData.data;
        } else {
            throw new Error(responseData.message || 'Unknown error occurred');
        }
    });
}

function populateElement(elementId, contentFunction) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found.`);
        return;
    }

    getUserInfo('6709f5bccf15d93164b952d0') // Replace with dynamic user ID when available
        .then(userData => {
            const content = contentFunction(userData);
            if (element.tagName.toLowerCase() === 'textarea') {
                element.value = content;
            } else {
                element.textContent = content;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = 'Error fetching user data: ' + error.message;
            if (element.tagName.toLowerCase() === 'textarea') {
                element.value = errorMessage;
            } else {
                element.textContent = errorMessage;
            }
        });
}

// Usage
document.addEventListener('DOMContentLoaded', function() {
    // Populate welcome message
    populateElement('welcome-message', userData => `Welcome ${userData.firstName}`);

    // Populate full name
    populateElement('user-full-name', userData => userData.fullName);

    // Populate all user info
    populateElement('user-info-textarea', userData => 
        `User ID: ${userData._id}\nName: ${userData.fullName}\nEmail: ${userData.email}`
    );
});
