const express = require('express');
const router = express.Router();
const alcoController = require('../controllers/alcoControlador');

router.post('/login', alcoController.login);
router.post('/registro-usuario', alcoController.registrarUsuario);
router.get('/pruebas', alcoController.listarPruebas);
router.get('/mis-pruebas', alcoController.listarMisPruebas);
router.post('/registrar-prueba', alcoController.guardarPrueba);

module.exports = router;