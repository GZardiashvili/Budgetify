function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    } else {
        res.status(500).send('something went wrong...');
    }
}

module.exports = errorHandler;
