const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rol.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/roles:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Listar roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de roles.
 *       401:
 *         description: Token inválido.
 */
router.get(
    '/',
    verificarToken,
    rolController.listarRoles
);

module.exports = router;