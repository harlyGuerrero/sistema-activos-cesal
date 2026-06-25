const catalogoService = require('../services/catalogo.service');

const diccionarioCatalogos = {
    'sedes': { tabla: 'sede', columna: 'nombre' },
    'estados': { tabla: 'estadoActivo', columna: 'nombre' },
    'categorias': { tabla: 'tipoActivo', columna: 'nombre' },
    'marcas': { tabla: 'marca', columna: 'nombre' },
    'tipos-equipo': { tabla: 'tipoEquipo', columna: 'nombre' },
    'sistemas-operativos': { tabla: 'sistemaOperativo', columna: 'nombre' },

    'tipos-vehiculo': { tabla: 'tipoVehiculo', columna: 'detalle' },
    'tipos-mueble': { tabla: 'tipoMueble', columna: 'detalle' },
    'tipos-inmueble': { tabla: 'tipoInmueble', columna: 'detalle' },
    'tipos-maquinaria': { tabla: 'tipoMaquinaria', columna: 'detalle' },
    'motivos-baja': { tabla: 'tipoMovimiento', columna: 'nombre' }
};


async function getCatalogoGlobal(req, res) {
    try {
        const tipoCatalogo = req.params.tipo;
        const configuracion = diccionarioCatalogos[tipoCatalogo];

        if (!configuracion) {
            return res.status(404).json({
                status: 'error',
                message: `El catálogo '${tipoCatalogo}' no existe en el sistema.`
            });
        }


        const datos = await catalogoService.obtenerCatalogoGlobal(configuracion.tabla, configuracion.columna);

        res.status(200).json({
            status: 'success',
            data: datos
        });
    } catch (err) {
        console.error("Error en getCatalogoGlobal:", err);
        res.status(500).json({ status: 'error', message: 'Error interno al cargar el catálogo.' });
    }
}


async function getModelosPorMarca(req, res) {
    try {
        const idMarca = parseInt(req.params.idMarca);

        if (isNaN(idMarca)) {
            return res.status(400).json({ status: 'error', message: 'ID de marca inválido.' });
        }

        const modelos = await catalogoService.obtenerModelosPorMarca(idMarca);

        res.status(200).json({
            status: 'success',
            data: modelos
        });
    } catch (err) {
        console.error("Error en getModelosPorMarca:", err);
        res.status(500).json({ status: 'error', message: 'Error interno al cargar los modelos.' });
    }
}

module.exports = {
    getCatalogoGlobal,
    getModelosPorMarca
};