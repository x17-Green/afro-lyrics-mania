// middleware/validateHeaders.js

const { check, validationResult } = require('express-validator');

const validateHeaders = [
  check('Access-Control-Allow-Headers')
    .custom((value, { req }) => {
      const allowedHeaders = [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Accept-Language',
        'Accept-Encoding',
        'DNT',
        'User -Agent',
        'Referer',
        'Sec-Fetch-Dest',
        'Sec-Fetch-Mode',
        'Sec-Fetch-Site',
        'Sec-Fetch-User ',
      ];

      const headers = value.split(',').map((header) => header.trim());

      for (const header of headers) {
        if (!allowedHeaders.includes(header)) {
          throw new Error(`Invalid header: ${header}`);
        }
      }

      return true;
    }),
];

module.exports = validateHeaders;