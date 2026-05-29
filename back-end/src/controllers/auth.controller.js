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

module.exports = { login };