// fetch('/hero/cards/data')

// .then(response => response.json())

// .then(data => {
    
//     const articlesContainer = document.querySelector('.articles');

//     data.forEach(article => {
    
//         const articleElement = document.createElement('article');

//         const figureElement = document.createElement('figure');

//         const imgElement = document.createElement('img');

//         const articlePreviewElement = document.createElement('div');

//         const h2Element = document.createElement('h2');

//         const pElement = document.createElement('p');


//         imgElement.src = article.image;

//         imgElement.alt = article.title;


//         h2Element.textContent = article.title;

//         pElement.textContent = article.description;


//         articlePreviewElement.appendChild(h2Element);

//         articlePreviewElement.appendChild(pElement);

//         figureElement.appendChild(imgElement);

//         articleElement.appendChild(figureElement);

//         articleElement.appendChild(articlePreviewElement);

//         articlesContainer.appendChild(articleElement);

//     });

// })

// .catch(error => console.error('Error fetching data:', error))


// const articlesContainer = document.querySelector('.articles');

// // Fetch the data from the API endpoint

// return fetch(`http://localhost:3000/hero/cards/data`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// })
// .then(response => response.json())
// .then(data => {
    //     // Loop through the data and create article elements
//     data.forEach(article => {
    //         const articleElement = document.createElement('article');
//         const figureElement = document.createElement('figure');
//         const imgElement = document.createElement('img');
//         const articlePreviewElement = document.createElement('div');
//         const h2Element = document.createElement('h2');
//         const pElement = document.createElement('p');

//         // Set the image source and alt text
//         imgElement.src = article.image;
//         imgElement.alt = article.title;

//         // Set the article title and description
//         h2Element.textContent = article.title;
//         pElement.textContent = article.description;

//         // Add the elements to the article container
//         articlePreviewElement.appendChild(h2Element);
//         articlePreviewElement.appendChild(pElement);
//         figureElement.appendChild(imgElement);
//         articleElement.appendChild(figureElement);
//         articleElement.appendChild(articlePreviewElement);
//         articlesContainer.appendChild(articleElement);
//     });
// })
// .catch(error => console.error('Error fetching data:', error));


// heroCardApi.js

// // Get the articles container element
// const articlesContainer = document.querySelector('.articles');

// // Fetch the data from the API endpoint
// fetch('http://localhost:3000/hero/cards/data')
// .then(response => response.json())
// .then(data => {
    //     // Access the articles correctly based on the expected structure
//     const articles = data.articles; // Adjust this line based on your actual response structure
//     articles.forEach(article => {
    //         const articleElement = document.createElement('article');
//         const figureElement = document.createElement('figure');
//         const imgElement = document.createElement('img');
//         const articlePreviewElement = document.createElement('div');
//         const h2Element = document.createElement('h2');
//         const pElement = document.createElement('p');

//         // Set the image source and alt text
//         imgElement.src = article.image;
//         imgElement.alt = article.title;

//         // Set the article title and description
//         h2Element.textContent = article.title;
//         pElement.textContent = article.description;

//         // Add the elements to the article container
//         articlePreviewElement.appendChild(h2Element);
//         articlePreviewElement.appendChild(pElement);
//         figureElement.appendChild(imgElement);
//         articleElement.appendChild(figureElement);
//         articleElement.appendChild(articlePreviewElement);
//         articlesContainer.appendChild(articleElement);
//     });
// })
// .catch(error => console.error('Error fetching data:', error));
// console.log(error)


// heroCardApi.js // working, but no css

// // Get the articles container element
// const articlesContainer = document.querySelector('.articles');

// // Store the original content
// const originalContent = articlesContainer.innerHTML;

// // Fetch the data from the API endpoint
// fetch('http://localhost:3000/hero/cards/data')
// .then(response => response.json())
// .then(data => {
//         // Access the articles correctly based on the expected structure
//     const articles = data.articles; // Adjust this line based on your actual response structure

//     // Check if articles array is empty or undefined
//     if (!articles || articles.length === 0) {
//         console.log('No articles received. Keeping original content.');
//         return; // Exit the function, keeping the original content
//     }

//     // Clear the container before adding new content
//     articlesContainer.innerHTML = '';

//     articles.forEach(article => {
//             const articleElement = document.createElement('article');
//         const figureElement = document.createElement('figure');
//         const imgElement = document.createElement('img');
//         const articlePreviewElement = document.createElement('div');
//         const h2Element = document.createElement('h2');
//         const pElement = document.createElement('p');

//         // Set the image source and alt text
//         imgElement.src = article.image;
//         imgElement.alt = article.title;

//         // Set the article title and description
//         h2Element.textContent = article.title;
//         pElement.textContent = article.description;

//         // Add the elements to the article container
//         articlePreviewElement.appendChild(h2Element);
//         articlePreviewElement.appendChild(pElement);
//         figureElement.appendChild(imgElement);
//         articleElement.appendChild(figureElement);
//         articleElement.appendChild(articlePreviewElement);
//         articlesContainer.appendChild(articleElement);
//     });
// })
// .catch(error => {
//         console.error('Error fetching data:', error);
//     console.log('Keeping original content due to error.');
//     // In case of error, the original content is already in place
// });

// heroCardApi.js

// Get the articles container element
const articlesContainer = document.querySelector('.articles');

// Store the original content
const originalContent = articlesContainer.innerHTML;

// Fetch the data from the API endpoint
fetch('http://localhost:3000/hero/cards/data')
.then(response => response.json())
.then(data => {
    // Access the articles correctly based on the expected structure
    const articles = data.articles; // Adjust this line based on your actual response structure
    
    // Check if articles array is empty or undefined
    if (!articles || articles.length === 0) {
        console.log('No articles received. Keeping original content.');
        return; // Exit the function, keeping the original content
    }
    
    // Clear the container before adding new content
    articlesContainer.innerHTML = '';
    
    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.className = "max-width-20rem width-100 cursor-pointer position-relative display-block transition-all-0-4s-ease-in-out overflow-hidden border-radius-1rem box-shadow-rgba-100-100-111-0-2-0px-7px-29px-0px";
        
        const figureElement = document.createElement('figure');
        figureElement.className = "width-100 height-14rem overflow-hidden";
        
        const imgElement = document.createElement('img');
        imgElement.src = article.image;
        imgElement.alt = article.title;
        imgElement.className = "max-width-100 transform-origin-center transition-transform-0-4s-ease-in-out height-100 aspect-ratio-16-9 overflow-hidden object-fit-cover";
        
        const articlePreviewElement = document.createElement('div');
        articlePreviewElement.className = "article-preview padding-1-5rem background-white";
        
        const h2Element = document.createElement('h2');
        h2Element.className = "margin-0-0-0-5rem-0 font-size-1-6rem color-var--text transition-color-0-3s-ease-out";
        h2Element.textContent = article.title;
        
        const pElement = document.createElement('p');
        pElement.textContent = article.description;
        
        // Add the elements to the article container
        articlePreviewElement.appendChild(h2Element);
        articlePreviewElement.appendChild(pElement);
        figureElement.appendChild(imgElement);
        articleElement.appendChild(figureElement);
        articleElement.appendChild(articlePreviewElement);
        articlesContainer.appendChild(articleElement);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
    console.log('Keeping original content due to error.');
    // In case of error, the original content is already in place
});