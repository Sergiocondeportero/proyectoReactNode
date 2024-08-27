const express = require('express');
const router = express.Router();
const {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    agregarVideojuegoACliente
} = require('../controllers/clientes.controllers');

router.get('/', obtenerClientes);
router.get('/:id', obtenerClientePorId);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);
router.post('/:id/videojuegos', agregarVideojuegoACliente); // Ruta para agregar videojuegos al cliente

module.exports = router;
