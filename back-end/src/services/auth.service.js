const db = require('../config/db'); //
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //

async function verificarCredenciales(correo, password) {

    const [rows] = await db.query('CALL sp_usuarioObtenerPorCorreo(?)', [correo]);
    const usuario = rows[0][0];

    if (!usuario) {
        return { status: 'ERROR', message: 'Correo o contraseña incorrectos.' };
    }

    if (usuario.isActive === 0) {
        return { status: 'INACTIVO', message: 'Tu cuenta está desactivada.' };
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
        return { status: 'ERROR', message: 'Correo o contraseña incorrectos.' };
    }

    const token = jwt.sign(
        { id: usuario.id, correo: usuario.correo, idRol: usuario.idRol, isAuth: usuario.auth},
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        status: 'SUCCESS',
        message: '¡Bienvenido!',
        token,
        user: {
            id: usuario.id,
            nombre: usuario.nombreUsuario,
            apellido: usuario.apellido,
            auth: usuario.auth,
            idRol: usuario.idRol,
            nombreRol: usuario.nombreRol
        }
    };
}

async function actualizarPasswordPrimeraVez(usuarioId, nuevaPassword) {

    const [rows] = await db.query('select id, correo, idRol, isAuth from usuario where id = ?', [usuarioId]);
    const usuario = rows[0];

    if (!usuario || usuario.isAuth === 0) {
        throw new Error('PASSWORD_ALREADY_CHANGED');
    }

    const saltRounds = 10;
    const passwordHasheado = await bcrypt.hash(nuevaPassword, saltRounds);

    await db.query('CALL sp_usuarioActualizarPasswordInicial(?, ?)', [usuarioId, passwordHasheado]);

    const newToken = jwt.sign(
        { id: usuario.id, correo: usuario.correo, idRol: usuario.idRol, isAuth:0},
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return {
        status: 'SUCCESS',
        message: 'Contraseña actualizada correctamente. Bienvenido al sistema.',
        token: newToken
    };
}


module.exports = {
    verificarCredenciales,
    actualizarPasswordPrimeraVez,

};


