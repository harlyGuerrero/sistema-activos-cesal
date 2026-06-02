const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validator');
const {validarJWT} = require('../middlewares/auth.middleware');

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
/**
 * @swagger
 * /api/auth/ChangePass:
 *   post:
 *     summary: Cambiar la contraseña temporal en el primer ingreso
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nuevaPassword
 *             properties:
 *               nuevaPassword:
 *                 type: string
 *                 example: "MiNuevaPassword123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada con éxito
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
 *                   example: Contraseña actualizada correctamente. Ahora puedes usar el sistema.
 *                 token:
 *                   type: string
 *                   example: eyW9cd...
 *       400:
 *         description: Intento de realizar nuevamente el cambio inicial de contraseña.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Este usuario ya completó su primer cambio de contraseña.
 *       401:
 *         description: Token inválido o no enviado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/ChangePass',validarJWT,authController.cambiarPasswordInicial);

module.exports = router;