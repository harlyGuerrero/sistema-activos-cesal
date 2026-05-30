const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validator');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión en el sistema
 *     description: Autentica a un usuario mediante correo y contraseña. Devuelve un token JWT si las credenciales son válidas.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico registrado del usuario.
 *                 example: juan.perez@empresa.com
 *               password:
 *                 type: string
 *                 description: Contraseña en texto plano.
 *                 example: MiPasswordSeguro123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 message:
 *                   type: string
 *                   example: ¡Bienvenido!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Juan
 *                     apellido:
 *                       type: string
 *                       example: Pérez
 *                     rol:
 *                       type: string
 *                       example: Administrador
 *       400:
 *         description: Error de validación.
 *       401:
 *         description: Credenciales incorrectas.
 *       403:
 *         description: Cuenta desactivada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', loginValidator, authController.login);
router.post('/ChangePass',authController.cambiarPasswordInicial);

module.exports = router;