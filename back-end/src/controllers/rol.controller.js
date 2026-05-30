const rolService = require('../services/rol.service');

async function listarRoles(req, res) {
    try {

        const roles = await rolService.listarRoles();

        res.status(200).json(roles);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error interno'
        });
    }
}

module.exports = {
    listarRoles
};