// Get the form element
const form = document.getElementById('user-form');

// Add an event listener to the form's submit event
form.addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Get the form data
    const formData = new FormData(form);
    
    // Convert the form data to a JSON object
    const userData = Object.fromEntries(formData.entries());
    
    // Send a POST request to the /api/users endpoint
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        // Check if the response was successful
        if (response.ok) {
            // Get the user data from the response
            const user = await response.json();
            
            // Do something with the user data
            console.log(user);
        } else {
            // Handle the error
            console.error('Error creating user:', response.status);
            const errorMessage = await response.json();
            console.error(errorMessage);
        }
    } catch (error) {
        // Handle the error
        console.error('Error creating user:', error);
    }
});
