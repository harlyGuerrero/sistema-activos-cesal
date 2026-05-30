const authService = require('../services/auth.service');

async function login(req, res) {
    const { correo, password } = req.body;

    try {

        const resultado = await authService.verificarCredenciales(correo, password);

        if (resultado.status === 'ERROR') {
            return res.status(401).json(resultado);
        }
        if (resultado.status === 'INACTIVO') {
            return res.status(403).json(resultado);
        }

        return res.status(200).json(resultado);

    } catch (error) {
        console.error('Error en Auth Controller:', error);
        return res.status(500).json({ status: 'ERROR', message: 'Error interno del servidor.' });
    }
}

async function cambiarPasswordInicial(req, res) {
    try {

        const { id, nuevaPassword } = req.body;

        const resultado = await authService.actualizarPasswordPrimeraVez(id, nuevaPassword);

        return res.status(200).json(resultado);

    } catch (error) {
        console.error("Error en Cambiar Password Controller:", error);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Hubo un error interno en el servidor.'
        });
    }
}
module.exports = { login, cambiarPasswordInicial };