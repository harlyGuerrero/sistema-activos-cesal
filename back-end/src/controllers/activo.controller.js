const fs = require('fs');
const xlsx = require('xlsx');
const crypto = require('crypto');
const activoService = require('../services/activo.service');

async function listarActivos(req, res) {
    try{
        const idSede = req.query.sede ? parseInt(req.query.sede) : null;
        const idTipoActivo = req.query.categoria ? parseInt(req.query.categoria) : null;
        const idEstado = req.query.estado ? parseInt(req.query.estado) : null;
        const textoBusqueda = req.query.buscar ? req.query.buscar : null;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        const activos = await activoService.listarActivos(limit, offset, idSede, idTipoActivo, idEstado, textoBusqueda);
        res.status(200).json({
            status: 'success',
            message: 'Lista de activos recuperada con exito',
            totalActivos: activos.totalActivos,
            data: activos.data,
        });
    }catch(err){
        res.status(500).json({
            status: 'ERROR',
            message: 'Hubo un error interno en el servidor al listar los activos.'
        })
    }
}
async function listarActivosSpe(req, res) {
    try {
        const idActivo = parseInt(req.param.id);
        const idTipoActivo = parseInt(req.query.categoria);

        if (isNaN(idActivo) || isNaN(idTipoActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'El id del activo y la categoría son parámetros requeridos y deben ser números.'
            });
        }

        const activo = await activoService.listarActivoEspecifico(idActivo,idTipoActivo);

        if (!activo) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontró el activo solicitado.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Activo especifico fue mostrado exitosamente',
            data: activo
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al obtener los detalles del activo.'
        });
    }
}
async function registrarActivoVehicular(req, res) {
    try {
        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idMarca, idModelo, anio,chasis,idTipoVehiculo,
            kilometraje} = req.body;

        if (!nombre || !codigoPatrimonial || !chasis) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre, código patrimonial y chasis son obligatorios.'
            });
        }

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;

        const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';

        const cadenaBloque = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,
            costo, fechaAdquisicion, idAmbiente].join('|');

        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosVehiculares = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idMarca, idModelo, anio,chasis,idTipoVehiculo,
            kilometraje,idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.registrarActivoVehicular(datosVehiculares);
        res.status(201).json({
            status: 'success',
            message: 'Activo vehicular registrado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un vehículo registrado con ese Código Patrimonial o Chasis.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al registrar el vehículo.'
        });
    }
}
async function registrarActivoInformatico(req, res) {
    try {
        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idMarca, idModelo,idTipoEquipo,numeroSerie,procesador,memoriaRAM,
        almacenamientoGB,discoDuro,idSistemaOperativo} = req.body;

        if (!nombre || !codigoPatrimonial || !numeroSerie) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre, código patrimonial y chasis son obligatorios.'
            });
        }

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;

        const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';

        const cadenaBloque = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,
            costo, fechaAdquisicion, idAmbiente].join('|');

        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosInformaticos = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idMarca, idModelo,idTipoEquipo,numeroSerie, procesador,memoriaRAM,
            almacenamientoGB,discoDuro,idSistemaOperativo,idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.registrarActivoInformatico(datosInformaticos);
        res.status(201).json({
            status: 'success',
            message: 'Activo Informático registrado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un activo informatico registrado con ese Código Patrimonial o número de serie.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al registrar el activo informatico.'
        });
    }

}
async function registrarActivoMobiliario(req, res) {
    try {
        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario, idTipoMueble,material,color, dimensiones} = req.body;

        if (!nombre || !codigoPatrimonial) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre, código patrimonial son obligatorios.'
            });
        }

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;

        const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';

        const cadenaBloque = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,
            costo, fechaAdquisicion, idAmbiente].join('|');

        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosMobiliarios = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idTipoMueble,material,color,dimensiones,idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.registrarActivoMueble(datosMobiliarios);
        res.status(201).json({
            status: 'success',
            message: 'Activo mobiliario registrado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe el mueble registrado con ese Código Patrimonial.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al registrar el activo mueble.'
        });
    }

}
async function registrarActivoInmobiliario(req, res) {
    try {
        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario, idTipoInmueble,direccion,areaTotalM2} = req.body;

        if (!nombre || !codigoPatrimonial) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre, código patrimonial son obligatorios.'
            });
        }

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;

        const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';

        const cadenaBloque = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,
            costo, fechaAdquisicion, idAmbiente].join('|');

        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosInmobiliarios = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idTipoInmueble,direccion,areaTotalM2,idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.registrarActivoInmueble(datosInmobiliarios);
        res.status(201).json({
            status: 'success',
            message: 'Activo inmobiliario registrado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe el inmueble registrado con ese Código Patrimonial.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al registrar el activo inmueble.'
        });
    }
}
async function registrarActivoMaquinaria(req, res) {
    try {
        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario, idMarca,idModelo,numeroSerie,idTipoMaquinaria} = req.body;

        if (!nombre || !codigoPatrimonial || !numeroSerie) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre, código patrimonial, número de serie son obligatorios.'
            });
        }

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;

        const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';

        const cadenaBloque = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,
            costo, fechaAdquisicion, idAmbiente].join('|');

        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosMaquinaria = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idMarca, idModelo,numeroSerie,idTipoMaquinaria,idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.registrarActivoMaquinaria(datosMaquinarias);
        res.status(201).json({
            status: 'success',
            message: 'Activo maquinaria registrado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe el maquinaria registrado con ese Código Patrimonial.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al registrar el activo maquinaria.'
        });
    }
}
async function registrarActivoOficina(req, res) {
    try {
        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario, idMarca,idModelo,idTipoEquipo,capacidadPotencia,dimensiones} = req.body;

        if (!nombre || !codigoPatrimonial ) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre, código patrimonial son obligatorios.'
            });
        }

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;

        const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';

        const cadenaBloque = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,
            costo, fechaAdquisicion, idAmbiente].join('|');

        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosOficina = [nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,fechaAdquisicion,
            idFactura,costo,idAmbiente,idUsuario,idMarca, idModelo,idTipoEquipo,capacidadPotencia,dimensiones,idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.registrarActivoOficina(datosOficina);
        res.status(201).json({
            status: 'success',
            message: 'Activo oficina registrado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe el activo oficina registrado con ese Código Patrimonial.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al registrar el activo oficina.'
        });
    }
}
async function actualizarActivoVehicular(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,
            idAmbiente,idUsuario,idMarca, idModelo, anio,chasis,idTipoVehiculo, kilometraje,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto, idAmbiente].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosVehicularesAct = [idActivo,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,
            idMarca, idModelo, anio,chasis,idTipoVehiculo,
            kilometraje,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.actualizarActivoVehicular(datosVehicularesAct);
        res.status(201).json({
            status: 'success',
            message: 'Activo vehicular actualizado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial o chasis ingresado ya pertenece a otro vehículo.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al actualizar el vehículo.'
        });
    }
}
async function actualizarActivoInformatico(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,
            idAmbiente,idUsuario,idMarca, idModelo,idTipoEquipo,numeroSerie,procesador,memoriaRAM,
            almacenamientoGB,discoDuro,idSistemaOperativo,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto, idAmbiente].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosInfomaticosAct = [idActivo, nombre,codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,
            idMarca, idModelo, idTipoEquipo,numeroSerie,procesador, memoriaRAM,
            almacenamientoGB,discoDuro,idSistemaOperativo,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.actualizarActivoInformatico(datosInfomaticosAct);
        res.status(201).json({
            status: 'success',
            message: 'Activo informatico actualizado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial o número de serie ingresado ya pertenece a otro equipo.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al actualizar el equipo.'
        });
    }
}
async function actualizarActivoMobiliario(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario, idTipoMueble,material,color, dimensiones,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto, idAmbiente].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosMobiliariosAct = [idActivo, nombre,codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,
            idTipoMueble, material,color,dimensiones,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.actualizarActivoMobiliario(datosMobiliariosAct);
        res.status(201).json({
            status: 'success',
            message: 'Activo mobiliario actualizado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial ingresado ya pertenece a otro mueble.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al actualizar el mueble.'
        });
    }
}
async function actualizarActivoInmobiliario(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario, idTipoInmueble,direccion,areaTotalM2,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto, idAmbiente].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosInmobiliariosAct = [idActivo, nombre,codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,
            idTipoInmueble, direccion,areaTotalM2,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.actualizarActivoInmobiliario(datosInmobiliariosAct);
        res.status(201).json({
            status: 'success',
            message: 'Activo inmueble actualizado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial ingresado ya pertenece a otro inmueble.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al actualizar el inmueble.'
        });
    }
}
async function actualizarActivoMaquinaria(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario, idMarca,idModelo,numeroSerie,idTipoMaquinaria,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto, idAmbiente].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosMaquinariaAct = [idActivo, nombre,codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,
            idMarca,idModelo,numeroSerie,idTipoMaquinaria,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.actualizarActivoMaquinaria(datosMaquinariaAct);
        res.status(201).json({
            status: 'success',
            message: 'Activo maquinaria actualizado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial o el número de serie ingresado ya pertenece a otra maquinaria.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al actualizar la maquinaria.'
        });
    }
}
async function actualizarActivoOficina(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {nombre, codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,idMarca,idModelo,idTipoEquipo,capacidadPotencia,dimensiones,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,nombre, codigoPatrimonial, codigoProveedor, codigoProyecto, idAmbiente].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosOficinaAct = [idActivo, nombre,codigoPatrimonial, codigoProveedor, codigoProyecto,idEstado,idAmbiente,idUsuario,
            idMarca,idModelo,idTipoEquipo,capacidadPotencia,dimensiones,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.actualizarActivoOficina(datosOficinaAct);
        res.status(201).json({
            status: 'success',
            message: 'Activo oficina actualizado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial ingresado ya pertenece a otra oficina.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al actualizar la oficina.'
        });
    }
}
async function ajusteContable(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {costo,idFactura,fechaAdquisicion,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,costo,idFactura,fechaAdquisicion].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosContables = [idActivo, costo,idFactura,fechaAdquisicion,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.ajusteContable(datosContables);
        res.status(201).json({
            status: 'success',
            message: 'El ajuste contable se realizo con exito.'
        })

    }catch(err){
        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al realizar el ajuste contable.'
        });
    }
}
async function EliminarActivo(req, res) {
    try{

        const idActivo = parseInt(req.params.id);

        if (isNaN(idActivo)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de activo inválido.' });
        }

        const {idTipoMovimiento,observacion} = req.body;

        const idUsuarioSistema = req.usuario.id;
        const ipOrigen = req.ip ;
        const hashAnterior = await activoService.ultimoHash(idActivo);

        const cadenaBloque = [hashAnterior,idTipoMovimiento].join('|');
        const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

        const datosBaja = [idActivo, idTipoMovimiento,observacion || '',idUsuarioSistema,ipOrigen,hashAnterior,hashActual]

        await activoService.darBaja(datosBaja);
        res.status(201).json({
            status: 'success',
            message: 'Activo eliminado exitosamente en el sistema.'
        })

    }catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Conflicto: El código patrimonial ingresado ya pertenece a un activo.'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor eliminar un activo.'
        });
    }
}
async function KPIs(req, res) {
    try{
        const kpis = await activoService.KPIsDashboard();

        res.status(200).json({
            status: 'success',
            message: 'KPIs del dashboard recuperados exitosamente.',
            data: kpis
        });

    }catch(err){
        res.status(500).json({
                status: 'error',
                message: 'Hubo un error interno en el servidor al obtener los KPIs del dashboard.'
        });
    }
}
async function Dashboard(req, res) {
    try{
        const datosGrafico = await activoService.Dashboard();

        res.status(200).json({
            status: 'success',
            message: 'Datos del gráfico por sedes recuperados exitosamente.',
            data: datosGrafico
        });

    }catch(err){
        res.status(500).json({
            status: 'error',
            message: 'Hubo un error interno en el servidor al obtener los datos del gráfico.'
        });
    }
}
async function importarExcelMasivo(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'No se subió ningún archivo Excel.' });
        }

        const ipOrigen = req.ip || req.connection.remoteAddress;
        let insertadosTotal = 0;
        let erroresTotales = [];

        // 1. LEEMOS EL ARCHIVO EXCEL COMPLETO
        const workbook = xlsx.readFile(req.file.path);

        // --- 2. PROCESAMOS LA PESTAÑA: VEHICULAR ---
        // Verificamos si la pestaña existe en el Excel con ese nombre exacto
        if (workbook.Sheets['Vehicular']) {
            // Convertimos esa pestaña a un arreglo de JSON automáticamente
            const datosVehiculares = xlsx.utils.sheet_to_json(workbook.Sheets['Vehicular']);

            for (let i = 0; i < datosVehiculares.length; i++) {
                const row = datosVehiculares[i];
                try {
                    const hashAnterior = '0000000000000000000000000000000000000000000000000000000000000000';
                    const cadenaBloque = `${row['Código Patrimonial']}-${new Date().getTime()}`;
                    const hashActual = crypto.createHash('sha256').update(cadenaBloque).digest('hex');

                    // Mapeas las columnas tal cual lo hicimos antes
                    const datosVehiculo = [
                        row['Nombre'], row['Código Patrimonial'], row['Código Proveedor'], row['Código Proyecto'],
                        parseInt(row['Estado']), row['Fecha Adquisición'], row['Factura'], parseFloat(row['Costo']),
                        parseInt(row['Unidad Operativa']), parseInt(row['Responsable']), 1,
                        parseInt(row['Marca']), parseInt(row['Modelo']), parseInt(row['Año']),
                        row['Chasis'], parseInt(row['Tipo Vehículo']), parseFloat(row['Kilometraje']),
                        req.body.idUsuarioSistema || 1, ipOrigen, hashAnterior, hashActual
                    ];

                    await activoService.registrarActivoVehicular(datosVehiculo);
                    insertadosTotal++;
                } catch (err) {
                    erroresTotales.push(`Pestaña Vehicular (Fila ${i + 2}): ${err.message}`);
                }
            }
        }

        // --- 3. PROCESAMOS LA PESTAÑA: INFORMÁTICA ---
        if (workbook.Sheets['Informática']) {
            const datosInformatica = xlsx.utils.sheet_to_json(workbook.Sheets['Informática']);

            for (let i = 0; i < datosInformatica.length; i++) {
                const row = datosInformatica[i];
                try {
                    // ... (Generas tu hash y haces el mapeo exacto de las columnas de informática) ...
                    // await activoService.registrarActivoInformatico(datosInfoMapeados);
                    insertadosTotal++;
                } catch (err) {
                    erroresTotales.push(`Pestaña Informática (Fila ${i + 2}): ${err.message}`);
                }
            }
        }



        // 4. LIMPIEZA Y RESPUESTA
        fs.unlinkSync(req.file.path); // Borramos el Excel del servidor

        res.status(200).json({
            status: 'success',
            message: `Importación finalizada. ${insertadosTotal} activos totales registrados.`,
            errores: erroresTotales.length > 0 ? erroresTotales : null
        });

    } catch (err) {
        console.error("Error al leer el Excel:", err);
        res.status(500).json({ status: 'error', message: 'Error interno procesando el archivo de Excel.' });
    }
}

module.exports = {
    listarActivos,
    listarActivosSpe,
    registrarActivoVehicular,
    registrarActivoInformatico,
    registrarActivoInmobiliario,
    registrarActivoMobiliario,
    registrarActivoMaquinaria,
    registrarActivoOficina,
    actualizarActivoVehicular,
    actualizarActivoInformatico,
    actualizarActivoMobiliario,
    actualizarActivoInmobiliario,
    actualizarActivoMaquinaria,
    actualizarActivoOficina,
    ajusteContable,
    EliminarActivo,
    KPIs,
    Dashboard,
    importarExcelMasivo
};