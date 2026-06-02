const db = require('../config/db');

async function listarRoles() {

    const [rows] = await db.query(
        'CALL sp_rolListar()'
    );

    return rows[0];
}

async function obtenerRolPorId(id) {

    const [rows] = await db.query(
        'CALL sp_rolObtenerPorId(?)',
        [id]
    );

    return rows[0][0];
}

async function crearRol(data) {

    const { nombre } = data;

    const [rows] = await db.query(
        'CALL sp_rolRegistrar(?)',
        [nombre]
    );

    return {
        mensaje: 'Rol creado correctamente',
        id: rows[0][0].id
    };
}

async function actualizarRol(id, data) {

    const { nombre } = data;

    await db.query(
        'CALL sp_rolActualizar(?, ?)',
        [id, nombre]
    );

    return {
        mensaje: 'Rol actualizado correctamente'
    };
}

async function eliminarRol(id) {

    await db.query(
        'CALL sp_rolEliminar(?)',
        [id]
    );

    return {
        mensaje: 'Rol eliminado correctamente'
    };
}

module.exports = {
    listarRoles,
    obtenerRolPorId,
    crearRol,
    actualizarRol,
    eliminarRol
};