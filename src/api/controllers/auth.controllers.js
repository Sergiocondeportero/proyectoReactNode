const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Clientes = require('../models/clientes.models');
const Videojuegos = require('../models/videojuegos.models');

// Iniciar sesión y obtener un token JWT
const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        const cliente = await Clientes.findOne({ email });
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        const esValidaPassword = await bcrypt.compare(password, cliente.password);
        if (!esValidaPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

        // Generar token
        const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { iniciarSesion };
