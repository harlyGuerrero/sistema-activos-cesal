const userService = require('../services/user.service');

async function listarUsuarios(req, res) {

    try {

        const usuarios = await userService.listarUsuarios();

        return res.status(200).json(usuarios);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno'
        });

    }

}

async function crearUsuario(req, res) {

    try {

        const usuario = await userService.crearUsuario(req.body);

        return res.status(201).json(usuario);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno'
        });

    }

}

async function obtenerUsuarioPorId(req, res) {

    try {

        const usuario = await userService.obtenerUsuarioPorId(
            req.params.id
        );

        return res.status(200).json(usuario);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno'
        });

    }

}

async function actualizarUsuario(req, res) {

    try {

        const resultado = await userService.actualizarUsuario(
            req.params.id,
            req.body
        );

        return res.status(200).json(resultado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno'
        });

    }

}

async function eliminarUsuario(req, res) {

    try {

        const resultado = await userService.eliminarUsuario(
            req.params.id
        );

        return res.status(200).json(resultado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno'
        });

    }

}

module.exports = {
    listarUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};