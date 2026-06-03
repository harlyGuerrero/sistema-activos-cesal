const db = require('../config/db');

async function listar() {
    const [rows] = await db.query(
        'CALL sp_tipoMaquinariaListar()'
    );
    return rows[0];
}

async function obtenerPorId(id) {
    const [rows] = await db.query(
        'CALL sp_tipoMaquinariaObtenerPorId(?)',
        [id]
    );
    return rows[0][0];
}

async function crear(detalle) {
    const [rows] = await db.query(
        'CALL sp_tipoMaquinariaCrear(?)',
        [detalle]
    );
    return rows;
}

async function actualizar(id, detalle) {
    const [rows] = await db.query(
        'CALL sp_tipoMaquinariaActualizar(?,?)',
        [id, detalle]
    );
    return rows;
}

async function eliminar(id) {
    const [rows] = await db.query(
        'CALL sp_tipoMaquinariaEliminar(?)',
        [id]
    );
    return rows;
}

module.exports = {
    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};