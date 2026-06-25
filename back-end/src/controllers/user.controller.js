const userService = require('../services/user.service');

async function listarUsuarios(req, res) {
    try {
        const usuarios = await userService.listarUsuarios();
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Lista de usuarios recuperada con éxito',
            data: usuarios,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Hubo un error interno en el servidor al listar los usuarios.'
        });
    }
}

async function crearUsuario(req, res) {
    try {
        const nuevoUsuario = await userService.crearUsuario(req.body);
        return res.status(201).json({
            status: 'SUCCESS',
            message: 'Se creó el nuevo usuario con sus datos de perfil correctamente',
            data: nuevoUsuario,
        });
    } catch (error) {
        console.error("Error en crearUsuario Controller:", error);
        return res.status(500).json({
            status: 'ERROR',
            mensaje: 'Hubo un error interno al intentar registrar al usuario'
        });
    }
}

async function obtenerUsuarioPorId(req, res) {

    try {
        const id = req.params.id;
        const usuario = await userService.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({
                status: 'ERROR',
                message: `EL usuario con id ${id} no existe `,
            })
        }
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'El usuario con id ${id} fue encontrado con exito',
            data: usuario,
        });
    } catch (error) {
        console.error("Error en obtenerUsuarioPorId Controller:", error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Hubo un error interno en el servidor al buscar al usuario.'
        });

    }

}

async function actualizarUsuario(req, res) {
    try {
        const id = parseInt(req.params.id);
        const idLogueado = req.usuario;

        if(idLogueado.idRol == 1 || idLogueado.id === id) {
            const resultado = await userService.actualizarUsuario(req.params.id, req.body);
            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Usuario y perfil actualizados correctamente.',
                data: resultado
            });
        }else{
            return res.status(403).json({
                status: 'ERROR',
                message: 'No tienes permisos para modificar el perfil de otros usuarios.'
            });
        }
    } catch (error) {
        console.error("Error en actualizarUsuario Controller:", error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Hubo un error interno al intentar actualizar los datos del usuario.'
        });
    }
}

async function eliminarUsuario(req, res) {

    try {
        const resultado = await userService.eliminarUsuario(req.params.id);
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Usuario desactivado y dado de baja correctamente en el sistema.',
            data: resultado
        });
    } catch (error) {

        console.error("Error en eliminarUsuario Controller:", error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Hubo un error interno al intentar dar de baja al usuario.'
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