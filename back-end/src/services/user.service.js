const db = require('../config/db');

async function listarUsuarios() {

    const [rows] = await db.query(`
        SELECT
            id,
            correo,
            idRol,
            isActive,
            created_at,
            updated_at
        FROM usuario
    `);

    return rows;
}

async function crearUsuario(data) {

    const { correo, password, idRol } = data;

    const [result] = await db.query(
        `
        INSERT INTO usuario
        (correo, password, idRol, isActive)
        VALUES (?, ?, ?, 1)
        `,
        [correo, password, idRol]
    );

    return {
        mensaje: 'Usuario creado correctamente',
        id: result.insertId
    };
}

async function obtenerUsuarioPorId(id) {

    const [rows] = await db.query(
        `
        SELECT
            id,
            correo,
            idRol,
            isActive,
            created_at,
            updated_at
        FROM usuario
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
}

async function actualizarUsuario(id, data) {

    const { correo, idRol, isActive } = data;

    await db.query(
        `
        UPDATE usuario
        SET correo = ?,
            idRol = ?,
            isActive = ?
        WHERE id = ?
        `,
        [correo, idRol, isActive, id]
    );

    return {
        mensaje: 'Usuario actualizado correctamente'
    };
}

async function eliminarUsuario(id) {

    await db.query(
        `
        DELETE FROM usuario
        WHERE id = ?
        `,
        [id]
    );

    return {
        mensaje: 'Usuario eliminado correctamente'
    };
}

module.exports = {
    listarUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};