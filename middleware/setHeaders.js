// middleware/setHeaders.js

const setHeaders = (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Content-Type', 'application/json');
    next();
};

module.exports = setHeaders;