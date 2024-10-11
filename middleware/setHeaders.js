// middleware/setHeaders.js

const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Accept-Language',
    'Accept-Encoding',
    'DNT',
    'User-Agent',
    'Referer',
    'Sec-Fetch-Dest',
    'Sec-Fetch-Mode',
    'Sec-Fetch-Site',
    'Sec-Fetch-User',
  ];
  
  const setHeaders = (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', allowedHeaders.join(', '));
    response.header('Content-Type', 'application/json');
    next();
  };

// const setHeaders = (request, response, next) => {
//     response.header('Access-Control-Allow-Origin', '*');
//     response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, DNT, Priority, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, Sec-Fetch-User , Upgrade-Insecure-Requests');
//     response.header('Content-Type', 'application/json');
//     next();
// };

module.exports = setHeaders;