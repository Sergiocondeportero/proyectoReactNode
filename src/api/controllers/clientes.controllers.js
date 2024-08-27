const Clientes = require('../models/clientes.models');
const Videojuegos = require('../models/videojuegos.models');
const bcrypt = require('bcrypt'); // Asegúrate de que bcrypt esté importado

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Clientes.find().populate('videojuegosComprados');
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener cliente por ID
const obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await Clientes.findById(req.params.id).populate('videojuegosComprados');
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const nuevoCliente = new Clientes({
            nombre,
            email,
            password,
            videojuegosComprados: []
        });
        const savedCliente = await nuevoCliente.save();
        res.status(201).json(savedCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const cliente = await Clientes.findById(req.params.id);
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        cliente.nombre = nombre || cliente.nombre;
        cliente.email = email || cliente.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            cliente.password = await bcrypt.hash(password, salt);
        }

        const updatedCliente = await cliente.save();
        res.status(200).json(updatedCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
    try {
        const cliente = await Clientes.findById(req.params.id);
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

        await cliente.remove();
        res.status(200).json({ message: "Cliente eliminado" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Agregar videojuego a cliente
const agregarVideojuegoACliente = async (req, res) => {
    try {
        const cliente = await Clientes.findById(req.params.id);
        const videojuego = await Videojuegos.findById(req.body.videojuegoId);

        if (!cliente || !videojuego) return res.status(404).json({ message: "Cliente o Videojuego no encontrado" });

        cliente.videojuegosComprados.push(videojuego._id);
        await cliente.save();

        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    agregarVideojuegoACliente
};
