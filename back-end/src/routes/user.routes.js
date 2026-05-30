const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar usuarios
 *     description: Obtiene la lista de usuarios registrados.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *       500:
 *         description: Error interno del servidor.
 *
 *   post:
 *     summary: Crear usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *               - idRol
 *             properties:
 *               correo:
 *                 type: string
 *                 example: nuevo@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               idRol:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene la información de un usuario específico.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 *
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza los datos de un usuario.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: actualizado@gmail.com
 *               idRol:
 *                 type: integer
 *                 example: 2
 *               isActive:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       500:
 *         description: Error interno del servidor.
 *
 *   delete:
 *     summary: Eliminar usuario
 *     description: Elimina un usuario del sistema.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.get('/', userController.listarUsuarios);
router.post('/', userController.crearUsuario);
router.get('/:id', userController.obtenerUsuarioPorId);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;