// // heroCardApi.js

// // Get the articles container element
// const articlesContainer = document.querySelector('.articles');

// // Store the original content
// const originalContent = articlesContainer.innerHTML;

// // Fetch the data from the API endpoint
// fetch('/hero/cards/data')
// .then(response => response.json())
// .then(data => {
//     // Access the articles correctly based on the expected structure
//     const articles = data.articles; // Adjust this line based on your actual response structure
    
//     // Check if articles array is empty or undefined
//     if (!articles || articles.length === 0) {
//         console.log('No articles received. Keeping original content.');
//         return; // Exit the function, keeping the original content
//     }
    
//     // Clear the container before adding new content
//     articlesContainer.innerHTML = '';
    
//     articles.forEach(article => {
//         const articleElement = document.createElement('article');
//         articleElement.className = "max-width-20rem width-100 cursor-pointer position-relative display-block transition-all-0-4s-ease-in-out overflow-hidden border-radius-1rem box-shadow-rgba-100-100-111-0-2-0px-7px-29px-0px";
        
//         const figureElement = document.createElement('figure');
//         figureElement.className = "width-100 height-14rem overflow-hidden";
        
//         const imgElement = document.createElement('img');
//         imgElement.src = article.image;
//         imgElement.alt = article.title;
//         imgElement.className = "max-width-100 transform-origin-center transition-transform-0-4s-ease-in-out height-100 aspect-ratio-16-9 overflow-hidden object-fit-cover";
        
//         const articlePreviewElement = document.createElement('div');
//         articlePreviewElement.className = "article-preview padding-1-5rem background-white";
        
//         const h2Element = document.createElement('h2');
//         h2Element.className = "margin-0-0-0-5rem-0 font-size-1-6rem color-var--text transition-color-0-3s-ease-out";
//         h2Element.textContent = article.title;
        
//         const pElement = document.createElement('p');
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
//     console.error('Error fetching data:', error);
//     console.log('Keeping original content due to error.');
//     // In case of error, the original content is already in place
// });













// heroCardApi.js

// // Get the articles container element
// const articlesContainer = document.querySelector('.articles');

// // Store the original content
// const originalContent = articlesContainer.innerHTML;

// // Fetch the data from the API endpoint
// fetch('/hero/cards/data')
// .then(response => response.json())
// .then(data => {
//     // Access the articles correctly based on the expected structure
//     const articles = data.articles; // Adjust this line based on your actual response structure
    
//     // Check if articles array is empty or undefined
//     if (!articles || articles.length === 0) {
//         console.log('No articles received. Keeping original content.');
//         return; // Exit the function, keeping the original content
//     }
    
//     // Get all existing article elements
//     const existingArticles = articlesContainer.querySelectorAll('article');
    
//     articles.forEach((article, index) => {
//         let articleElement;
        
//         if (index < existingArticles.length) {
//             // Update existing article
//             articleElement = existingArticles[index];
//         } else {
//             // Create new article if there are more articles than existing elements
//             articleElement = document.createElement('article');
//             articleElement.className = "max-width-20rem width-100 cursor-pointer position-relative display-block transition-all-0-4s-ease-in-out overflow-hidden border-radius-1rem box-shadow-rgba-100-100-111-0-2-0px-7px-29px-0px";
//             articlesContainer.appendChild(articleElement);
//         }
        
//         // Update or create figure and img
//         let figureElement = articleElement.querySelector('figure') || document.createElement('figure');
//         figureElement.className = "width-100 height-14rem overflow-hidden";
        
//         let imgElement = figureElement.querySelector('img') || document.createElement('img');
//         imgElement.src = article.image || imgElement.src; // Use existing src if no new image provided
//         imgElement.alt = article.title || imgElement.alt; // Use existing alt if no new title provided
//         imgElement.className = "max-width-100 transform-origin-center transition-transform-0-4s-ease-in-out height-100 aspect-ratio-16-9 overflow-hidden object-fit-cover";
        
//         figureElement.appendChild(imgElement);
//         articleElement.appendChild(figureElement);
        
//         // Update or create article preview
//         let articlePreviewElement = articleElement.querySelector('.article-preview') || document.createElement('div');
//         articlePreviewElement.className = "article-preview padding-1-5rem background-white";
        
//         let h2Element = articlePreviewElement.querySelector('h2') || document.createElement('h2');
//         h2Element.className = "margin-0-0-0-5rem-0 font-size-1-6rem color-var--text transition-color-0-3s-ease-out";
//         h2Element.textContent = article.title || h2Element.textContent; // Use existing text if no new title provided
        
//         let pElement = articlePreviewElement.querySelector('p') || document.createElement('p');
//         pElement.textContent = article.description || pElement.textContent; // Use existing text if no new description provided
        
//         articlePreviewElement.appendChild(h2Element);
//         articlePreviewElement.appendChild(pElement);
//         articleElement.appendChild(articlePreviewElement);
//     });
    
//     // Remove any excess articles
//     while (articlesContainer.children.length > articles.length) {
//         articlesContainer.removeChild(articlesContainer.lastChild);
//     }
// })
// .catch(error => {
//     console.error('Error fetching data:', error);
//     console.log('Keeping original content due to error.');
//     // In case of error, the original content is already in place
// });










// heroCardApi.js

// Get the articles container element
const articlesContainer = document.querySelector('.articles');

// Store the original content
const originalContent = articlesContainer.innerHTML;

// Function to get default value from existing content
function getDefaultValue(index, selector, attribute) {
    // Get only the visible (non-commented) article elements
    const visibleArticles = Array.from(articlesContainer.children).filter(child => child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'article');
    
    if (index >= visibleArticles.length) {
        return ''; // Return empty string if index is out of bounds
    }

    const element = visibleArticles[index].querySelector(selector);
    if (!element) return '';

    if (attribute) {
        return element.getAttribute(attribute) || '';
    } else {
        return element.textContent.trim();
    }
}

// Fetch the data from the API endpoint
fetch('/hero/cards/data')
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
    
    articles.forEach((article, index) => {
        const articleElement = document.createElement('article');
        
        const figureElement = document.createElement('figure');
        
        const imgElement = document.createElement('img');
        imgElement.src = article.image || getDefaultValue(index, 'img', 'src');
        imgElement.alt = article.title || getDefaultValue(index, 'h2');
        
        const articlePreviewElement = document.createElement('div');
        articlePreviewElement.className = 'article-preview';
        
        const h2Element = document.createElement('h2');
        h2Element.textContent = article.title || getDefaultValue(index, 'h2');
        
        const pElement = document.createElement('p');
        pElement.textContent = article.description || getDefaultValue(index, 'p');
        
        // Add the elements to the article container
        figureElement.appendChild(imgElement);
        articlePreviewElement.appendChild(h2Element);
        articlePreviewElement.appendChild(pElement);
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