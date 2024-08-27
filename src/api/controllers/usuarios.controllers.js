const Clientes = require('../models/clientes.models');
const bcrypt = require('bcrypt');

// Registrar un nuevo usuario (si es necesario)
const registrarUsuario = async (req, res) => {
    // Tu lógica aquí
};

// Iniciar sesión (si es necesario)
const iniciarSesion = async (req, res) => {
    // Tu lógica aquí
};

// Cambiar la contraseña del usuario
const cambiarContrasena = async (req, res) => {
    const { nuevaContrasena } = req.body;

    if (!nuevaContrasena) return res.status(400).json({ message: 'Nueva contraseña requerida' });

    try {
        const cliente = await Clientes.findById(req.userId);

        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        const salt = await bcrypt.genSalt(10);
        cliente.password = await bcrypt.hash(nuevaContrasena, salt);
        await cliente.save();

        res.status(200).json({ message: 'Contraseña cambiada con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener el perfil del usuario
const obtenerPerfil = async (req, res) => {
    try {
        const cliente = await Clientes.findById(req.userId);

        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    registrarUsuario, // Asegúrate de exportar todos los métodos utilizados
    iniciarSesion,
    cambiarContrasena,
    obtenerPerfil
};

