const jwt = require('jsonwebtoken');
const db = require('../config/db'); //
const validarJWT = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Acceso denegado. No se proporcionó un token válido.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Token inválido o expirado.'
        });
    }
};

const isAdmin = (req, res, next) => {

    if (req.usuario && req.usuario.idRol == 1) {
        next();
    }else{
        return res.status(403).json({
            status: 'ERROR',
            message: 'Acceso denegado. Se requieren permisos de Administrador para realizar esta acción.'
        })
    }
}

const isActive = async (req, res, next) => {

    try{
        const id = req.usuario.id;
        const [rows] = await db.query('select idRol, isActive from usuario where id = ?',[id])
        const user = rows[0];

        if (!user || user.isActive == 0) {
            return res.status(403).json({
                status: 'ERROR',
                message: 'Acceso denegado. Esta cuenta ya no se encuentra activa.'
            });
        }
        req.usuario.idRol = user.idRol;
        next();
    }catch(error){
        console.error('Error en isActive:', error);
        return res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }



}
module.exports = {
    validarJWT: validarJWT,
    isAdmin: isAdmin,
    isActive: isActive,
};