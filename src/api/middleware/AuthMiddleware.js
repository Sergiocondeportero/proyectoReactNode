const { verifyAccessToken } = require('../libs/jwt');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    const decoded = verifyAccessToken(token);
    if (!decoded) return res.status(403).json({ message: 'Token inválido' });

    req.userId = decoded.id;
    next();
};

module.exports = { verificarToken };
