const jsonifier = (req, res, next) => {
    res.jsonify = (statusCode, data, message) => {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'application/json');
        const response = {
            data,
            message: message || ''
        };
        res.send(JSON.stringify(response, null, 2));
    };
    next();
};

module.exports = jsonifier;