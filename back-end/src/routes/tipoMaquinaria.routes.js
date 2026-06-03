const express = require('express');
const router = express.Router();

const controller = require('../controllers/tipoMaquinaria.controller');
const { validarJWT, isAdmin } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/tipo-maquinaria:
 *   get:
 *     summary: Listar tipos de maquinaria
 *     tags: [TipoMaquinaria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */
router.get('/', validarJWT, controller.listar);

/**
 * @swagger
 * /api/tipo-maquinaria/{id}:
 *   get:
 *     summary: Obtener tipo de maquinaria por ID
 *     tags: [TipoMaquinaria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 */
router.get('/:id', validarJWT, controller.obtenerPorId);

/**
 * @swagger
 * /api/tipo-maquinaria:
 *   post:
 *     summary: Crear tipo de maquinaria
 *     tags: [TipoMaquinaria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detalle:
 *                 type: string
 *                 example: Excavadora
 *     responses:
 *       201:
 *         description: Creado correctamente
 */
router.post('/', validarJWT, isAdmin, controller.crear);

/**
 * @swagger
 * /api/tipo-maquinaria/{id}:
 *   put:
 *     summary: Actualizar tipo de maquinaria
 *     tags: [TipoMaquinaria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detalle:
 *                 type: string
 *                 example: Retroexcavadora
 *     responses:
 *       200:
 *         description: Actualizado correctamente
 */
router.put('/:id', validarJWT, isAdmin, controller.actualizar);

/**
 * @swagger
 * /api/tipo-maquinaria/{id}:
 *   delete:
 *     summary: Eliminar tipo de maquinaria
 *     tags: [TipoMaquinaria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 */
router.delete('/:id', validarJWT, isAdmin, controller.eliminar);

module.exports = router;