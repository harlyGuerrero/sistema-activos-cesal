const jwt = require('jsonwebtoken');

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

module.exports = {
    validarJWT: validarJWT,
    isAdmin: isAdmin,
};