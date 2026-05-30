// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // 1. Intentamos obtener el token que viene en la cabecera 'Authorization'
    const authHeader = req.header('Authorization');

    // Si no viene ninguna cabecera, le cerramos la puerta
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Acceso denegado. No se proporcionó un token válido.'
        });
    }

    // 2. Limpiamos el texto para quedarnos solo con el chorizo de letras del token
    // El header viene como: "Bearer eyJhbGciOi...", con el split quitamos la palabra "Bearer "
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verificamos si el token es real usando la llave secreta del .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. ¡Magia! Inyectamos los datos del usuario descifrados en la petición (req)
        // Ahora cualquier controlador que use este middleware tendrá acceso a req.usuario.id y req.usuario.rol
        req.usuario = decoded;

        // Todo está en orden, dejamos que la petición continúe hacia el controlador
        next();
    } catch (error) {
        // Si el token expiró, se alteró o está mal escrito, cae aquí
        return res.status(401).json({
            status: 'ERROR',
            message: 'Token inválido o expirado.'
        });
    }
};

module.exports = {
    validarJWT: validarJWT,
};