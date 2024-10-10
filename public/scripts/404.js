// JavaScript code for mode switcher

const modeSwitch = document.getElementById('mode-switch');
const body = document.body;

modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// JavaScript code for curved button hover effect

const curvedButton = document.getElementById('curved-button');

curvedButton.addEventListener('mouseover', () => {
    curvedButton.style.borderRadius = '20px';
});

curvedButton.addEventListener('mouseout', () => {
    curvedButton.style.borderRadius = '50px';
});