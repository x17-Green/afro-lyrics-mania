// getUserByID.js

// const textarea = document.getElementById("virtual-text-area");
// fetch(`/users/api/user/${'67088495eb2dc078d592a382'}`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     textarea.value = data._id; // or data.firstName, data.lastName, etc.
//   })
//   .catch(error => console.error(error));

// getUserByID.js

// fetch(`/users/api/user/${userId}`) // Replace with the dynamic user ID
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     const userId = data._id; // Get the user ID from the response data
//     const getUserByIdElement = document.querySelector('.getUserById'); // Get the Pug element with the class 'getUserById'
//     getUserByIdElement.textContent = `User   ID: ${userId}`; // Update the Pug element with the user ID
//   })
//   .catch(error => console.error(error));


fetch(`/users/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_TOKEN' // Replace with your API token or authentication method
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const userId = data._id; // Get the user ID from the response data
      const getUserByIdElement = document.querySelector('.getUserById'); // Get the Pug element with the class 'getUserById'
      getUserByIdElement.textContent = `User   ID: ${userId}`; // Update the Pug element with the user ID
    })
    .catch(error => console.error(error));