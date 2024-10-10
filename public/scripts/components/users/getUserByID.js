// getUserByID.js

const textarea = document.getElementById("virtual-text-area");
fetch(`/users/${'6707e78a6f65f0c3e1d299fb'}`)
  .then(response => response.json())
  .then(data => {
    textarea.value = data.userId;
  })
  .catch(error => console.error(error));