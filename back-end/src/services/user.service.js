const db = require('../config/db');
const bcrypt = require('bcrypt');

async function listarUsuarios() {

    const [rows] = await db.query(`CALL sp_usuarioListar`);

    return rows[0];
}

async function crearUsuario(data) {

    const {nombre, apellido, telefono, direccion, correo, password, idRol } = data;

    const passwordHasheado = await bcrypt.hash(password, 10);

    const [rows] = await db.query('CALL sp_usuarioCrear(?,?,?,?,?,?,?)',[nombre, apellido, telefono, direccion, correo, passwordHasheado,idRol]);
    const nuevoId = rows[0][0].insertId;

    return {
        id: nuevoId,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
        password: passwordHasheado,
        idRol: idRol,
    };
}

async function obtenerUsuarioPorId(id) {

    const [rows] = await db.query('CALL sp_usuarioObtenerPorId(?)',[id]);

    return rows[0][0];
}

async function actualizarUsuario(id, data) {

    const { correo, isActive, idRol, nombre, apellido, telefono, direccion} = data;

    await db.query('CALL sp_usuarioActulizar(?,?,?,?,?,?,?,?)',[id,correo, isActive,idRol,nombre,apellido, telefono,direccion ]);

    return {
        id,
        correo,
        isActive,
        idRol,
        nombre,
        apellido,
        telefono,
        direccion
    };
}

async function eliminarUsuario(id) {

    await db.query('CALL sp_usuarioEliminar(?)',[id]);

    return {
        id
    };
}

module.exports = {
    listarUsuarios,
    crearUsuario,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};