const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const loginValidator = [
    body('correo').isEmail().withMessage('Debe proporcionar un correo electrónico válido.').trim().normalizeEmail(),
    body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
    validarCampos ];

module.exports = { loginValidator };