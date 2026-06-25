const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogo.Controller');
const { validarJWT } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/catalogos/{tipo}:
 *   get:
 *     summary: Obtiene la lista de un catálogo global específico
 *     description: Endpoint dinámico que retorna los datos de las tablas maestras (sedes, marcas, estados, etc.) estandarizados para llenar menús desplegables (<select>). Requiere token JWT.
 *     tags:
 *       - Catálogos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - sedes
 *             - estados
 *             - categorias
 *             - marcas
 *             - tipos-equipo
 *             - sistemas-operativos
 *             - tipos-vehiculo
 *             - tipos-mueble
 *             - tipos-inmueble
 *             - tipos-maquinaria
 *             - idTipoMovimiento
 *         description: Nombre del catálogo que se desea consultar.
 *     responses:
 *       200:
 *         description: Catálogo recuperado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombreOpcion:
 *                         type: string
 *                         example: Sede Huachipa
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: El tipo de catálogo solicitado no existe en el diccionario del sistema.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:tipo', validarJWT, catalogoController.getCatalogoGlobal);
/**
 * @swagger
 * /api/catalogos/modelos/marca/{idMarca}:
 *   get:
 *     summary: Obtiene los modelos asociados a una marca específica
 *     description: Retorna la lista de modelos filtrados por el ID de su marca padre. Ideal para menús desplegables en cascada durante la creación de un activo. Requiere token JWT.
 *     tags:
 *       - Catálogos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idMarca
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la marca seleccionada previamente.
 *     responses:
 *       200:
 *         description: Lista de modelos recuperada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       nombreOpcion:
 *                         type: string
 *                         example: ThinkPad T14
 *       400:
 *         description: El parámetro idMarca no es un número válido.
 *       401:
 *         description: No autorizado. Token JWT faltante o inválido.
 *       404:
 *         description: No se encontraron modelos para la marca indicada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/modelos/marca/:idMarca', validarJWT, catalogoController.getModelosPorMarca);

module.exports = router;