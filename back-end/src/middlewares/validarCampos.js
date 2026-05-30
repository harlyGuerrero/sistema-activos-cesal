const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            status: 'ERROR',
            errors: errores.array()
        });
    }
    next(); // Si no hay errores, continúa al controlador
};

module.exports = { validarCampos };