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
        { id: usuario.id, rol: usuario.nombreRol },
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
            rol: usuario.nombreRol
        }
    };
}

module.exports = { verificarCredenciales };