const rolService = require('../services/rol.service');

async function listarRoles(req, res) {
    try {
        const roles = await rolService.listarRoles();
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error interno'
        });
    }
}

async function obtenerRolPorId(req, res) {
    try {
        const rol = await rolService.obtenerRolPorId(req.params.id);
        res.json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error interno'
        });
    }
}

async function crearRol(req, res) {
    try {
        const resultado = await rolService.crearRol(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error interno'
        });
    }
}

async function actualizarRol(req, res) {
    try {
        const resultado = await rolService.actualizarRol(
            req.params.id,
            req.body
        );

        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error interno'
        });
    }
}

async function eliminarRol(req, res) {
    try {
        const resultado = await rolService.eliminarRol(req.params.id);

        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error interno'
        });
    }
}

module.exports = {
    listarRoles,
    obtenerRolPorId,
    crearRol,
    actualizarRol,
    eliminarRol
};