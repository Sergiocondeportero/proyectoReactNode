const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../../config/jwtConfig'); 


function createAccessToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}


function verifyAccessToken(token) {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        return null;
    }
}

module.exports = {
    createAccessToken,
    verifyAccessToken
};
