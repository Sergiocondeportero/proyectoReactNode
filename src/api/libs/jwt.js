const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../../config/jwtConfig'); // Ruta correcta

// Función para crear un token de acceso
function createAccessToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}

// Función para verificar un token
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
