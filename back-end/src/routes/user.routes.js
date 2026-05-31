const express = require('express');
const router = express.Router();
const {validarJWT, isAdmin}= require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener la lista completa de usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista recuperada con éxito
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
 *                   example: Lista de usuarios recuperada con éxito.
 *                 data:
 *                   type: array
 *                   description: Array con los usuarios provenientes de la base de datos
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombreUsuario:
 *                         type: string
 *                         example: Harly
 *                       apellido:
 *                         type: string
 *                         example: Gomez
 *                       auth:
 *                         type: integer
 *                         example: 1
 *                       nombreRol:
 *                         type: string
 *                         example: Administrador
 *       401:
 *         description: No autorizado. Token faltante, expirado o inválido.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/',validarJWT,isAdmin, userController.listarUsuarios);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario con su perfil completo (Solo Administrador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo
 *               - password
 *               - idRol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               telefono:
 *                 type: string
 *                 example: "987654321"
 *               direccion:
 *                 type: string
 *                 example: Av. Los Próceres 123
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: juan.perez@cesal.org
 *               password:
 *                 type: string
 *                 example: Temporal123*
 *               idRol:
 *                 type: integer
 *                 description: ID del rol asignado (ej. 1 = Administrador, 2 = Operador)
 *                 example: 2
 *     responses:
 *       201:
 *         description: Usuario creado y registrado correctamente en ambas tablas
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
 *                   example: Usuario registrado correctamente con sus datos de perfil.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     nombre:
 *                       type: string
 *                       example: Juan
 *                     apellido:
 *                       type: string
 *                       example: Pérez
 *                     telefono:
 *                       type: string
 *                       example: "987654321"
 *                     direccion:
 *                       type: string
 *                       example: Av. Los Próceres 123
 *                     correo:
 *                       type: string
 *                       format: email
 *                       example: juan.perez@cesal.org
 *                     idRol:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado. Token faltante, inválido o expirado.
 *       403:
 *         description: Acceso denegado. Solo administradores pueden crear usuarios.
 *       500:
 *         description: Error interno del servidor al procesar la creación del usuario.
 */
router.post('/',validarJWT, isAdmin, userController.crearUsuario);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener los detalles completos de un usuario por su ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico del usuario a buscar
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Datos del usuario y su rol recuperados con éxito
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
 *                   example: Datos del usuario recuperados con éxito.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     correo:
 *                       type: string
 *                       example: harly@cesal.org
 *                     idRol:
 *                       type: integer
 *                       description: ID del rol para la lógica del frontend
 *                       example: 1
 *                     nombreRol:
 *                       type: string
 *                       description: Nombre del rol para mostrar en la interfaz visual
 *                       example: Administrador
 *                     isActive:
 *                       type: integer
 *                       example: 1
 *                     auth:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Harly
 *                     apellido:
 *                       type: string
 *                       example: Gomez
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-05-30T10:00:00.000Z"
 *       401:
 *         description: No autorizado. Token faltante, inválido o expirado.
 *       404:
 *         description: El ID de usuario ingresado no existe en la base de datos.
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
 *                   example: El usuario con ID 999 no fue encontrado.
 *       500:
 *         description: Error interno en el servidor.
 */
router.get('/:id',validarJWT, userController.obtenerUsuarioPorId);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar las credenciales y el perfil de un usuario (Solo Admin)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario que se desea actualizar
 *         schema:
 *           type: integer
 *         example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - idRol
 *               - isActive
 *               - nombre
 *               - apellido
 *               - telefono
 *               - direccion
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: harly.modificado@cesal.org
 *               idRol:
 *                 type: integer
 *                 example: 1
 *               isActive:
 *                 type: integer
 *                 description: 1 para activo, 0 para suspendido
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: Harly
 *               apellido:
 *                 type: string
 *                 example: Gomez Actualizado
 *               telefono:
 *                  type: string
 *                  example: 916456345
 *               direccion:
 *                  type: string
 *                  example: mz 10 lt15 av Miguel Grau
 *     responses:
 *       200:
 *         description: Usuario modificado con éxito en ambas tablas
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
 *                   example: Usuario y perfil actualizados correctamente.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     correo:
 *                       type: string
 *                       example: harly.modificado@cesal.org
 *                     idRol:
 *                       type: integer
 *                       example: 1
 *                     isActive:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Harly
 *                     apellido:
 *                       type: string
 *                       example: Gomez Actualizado
 *                     telefono:
 *                       type: string
 *                       example: 916456345
 *                     direccion:
 *                       type: string
 *                       example: mz 10 lt15 av Miguel Grau
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado. Token inválido o ausente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor durante la actualización.
 */
router.put('/:id',validarJWT, userController.actualizarUsuario);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Dar de baja o desactivar un usuario por su ID (Solo Administrador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario que se desea desactivar
 *         schema:
 *           type: integer
 *         example: 4
 *     responses:
 *       200:
 *         description: El usuario cambió su estado a inactivo con éxito
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
 *                   example: Usuario desactivado y dado de baja correctamente en el sistema.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *       401:
 *         description: No autorizado. Token faltante, expirado o sin permisos.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno en el servidor al procesar la baja.
 */
router.delete('/:id',validarJWT,isAdmin, userController.eliminarUsuario);

module.exports = router;