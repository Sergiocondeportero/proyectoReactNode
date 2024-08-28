const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/authMiddleware');
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
router.post('/', verificarToken, crearCliente);
router.put('/:id', verificarToken, actualizarCliente);
router.delete('/:id', verificarToken, eliminarCliente);
router.post('/:id/videojuegos', verificarToken, agregarVideojuegoACliente);

module.exports = router;