const db = require('../config/db');

async function obtenerCatalogoGlobal(tabla, columna) {
    const [resultados] = await db.query(`select id, ?? AS nombreOpcion from ?? where isActive = true or 1=1  order by ?? asc`, [columna, tabla, columna]);
    return resultados;
}


async function obtenerModelosPorMarca(idMarca) {
    const [resultados] = await db.query('select id, nombre as nombreOpcion from modelo where idMarca = ? order by nombre asc`', [idMarca]);
    return resultados;
}

module.exports = {
    obtenerCatalogoGlobal,
    obtenerModelosPorMarca
};