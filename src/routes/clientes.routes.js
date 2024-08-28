const express = require('express');
const router = express.Router();
// const { verificarToken } = require('../middleware/authMiddleware');

const {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    agregarVideojuegoACliente
} = require('../controllers/clientes.controllers');

// Rutas públicas
router.get('/', obtenerClientes);
router.get('/:id', obtenerClientePorId);

// Rutas protegidas
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);
router.post('/:id/videojuegos', agregarVideojuegoACliente);

module.exports = router;