// src/api/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware'); // Asegúrate de que esta línea es correcta
const usuariosController = require('../controllers/usuarios.controllers'); // Asegúrate de que esta línea es correcta

// Ruta para registrar un nuevo usuario
router.post('/registrar', usuariosController.registrarUsuario);

// Ruta para iniciar sesión
router.post('/iniciar-sesion', usuariosController.iniciarSesion);

// Ruta privada para cambiar la contraseña
router.put('/cambiar-contrasena', authMiddleware.verifyToken, usuariosController.cambiarContrasena);

// Ruta privada para obtener el perfil del usuario
router.get('/mi-perfil', authMiddleware.verifyToken, usuariosController.obtenerPerfil);

module.exports = router;
