const db = require('../config/db');

async function listarRoles() {

    const [rows] = await db.query(
        'CALL sp_rolListar()'
    );

    return rows[0];
}

module.exports = {
    listarRoles
};