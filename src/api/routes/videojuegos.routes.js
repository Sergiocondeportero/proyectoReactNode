const express = require('express');
const router = express.Router();
const {
    obtenerVideojuegos,
    obtenerVideojuegoPorId,
    crearVideojuego,
    actualizarVideojuego,
    eliminarVideojuego
} = require('../controllers/videojuegos.controllers');
router.get('/', obtenerVideojuegos);
router.get('/:id', obtenerVideojuegoPorId);
router.post('/', crearVideojuego);
router.put('/:id', actualizarVideojuego);
router.delete('/:id', eliminarVideojuego);

module.exports = router;
