const jwt = require('jsonwebtoken');
const getTokenFromHeaders = require("./getTokenFromHeaders");


function bindUser(req, res) {
    const token = getTokenFromHeaders(req);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        });
    }
    req.user = decodedToken;
    return req.user
}

module.exports = bindUser;
