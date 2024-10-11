// getUserByID.js

const textarea = document.getElementById("virtual-text-area");
fetch(`/users/api/user/${'67088495eb2dc078d592a382'}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    textarea.value = data.fullName;
  })
  .catch(error => console.error(error));