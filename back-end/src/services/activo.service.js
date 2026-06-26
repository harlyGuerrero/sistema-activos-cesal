const db = require('../config/db');
/**
 * Nota:
 * bcryptjs se usa por compatibilidad con arquitectura de 32btis
 * En servidores de arquitectura x64 se puede usar el nativo bcrypt
 */
const bcrypt = require('bcryptjs');

async function listarActivos(){

    const [rowActivos] = await db.query('call sp_listar_activoGenerales()');
    const data = rowActivos[0];

    let total_Activo=0;

    if (data.length > 0){
        total_Activo = data[0].totalActivos;
        data.forEach(activo => {
            delete activo.totalActivos;
        })
    }

    return {
        total_Activo,
        data
    }
}

async function listarActivoEspecifico(codigoPatrimonial) {
    const [result] = await db.execute('CALL sp_listar_activoEspecifico(?)', [codigoPatrimonial]);

    if (!result[0] || result[0].length === 0) {
        return null;
    }

    return result[0][0];
}

async function registrarActivoVehicular(datosVehiculares){
    const query = `CALL sp_registrar_activoVehicular(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    // Aquí 'datos' es el array que ya armaste en el controlador con los 20 elementos
    return await db.execute(query, datosVehiculares);
}

async function registrarActivoInformatico(datosInformaticos){
    const [rowActivoInformatico] = await db.query('call sp_registrar_activoInformatico(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosInformaticos]);
    return rowActivoInformatico;
}

async function registrarActivoMueble(datosMobiliarios){
    const [rowActivoMobiliario] = await db.query('call sp_registrar_activoMobiliario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosMobiliarios]);
    return rowActivoMobiliario;
}

async function registrarActivoInmueble(datosInmobiliarios){
    const [rowActivoInmobiliario] = await db.query('call sp_registrar_activoInmobiliario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosInmobiliarios]);
    return rowActivoInmobiliario;
}

async function registrarActivoMaquinaria(datosMaquinarias){
    const [rowActivoMaquinaria] = await db.query('call sp_registrar_activoMaquinaria(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosMaquinarias]);
    return rowActivoMaquinaria;
}

async function registrarActivoOficina(datosOficina){
    const [rowActivoOficina] = await db.query('call sp_registrar_activoMaquinaria(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosOficina]);
    return rowActivoOficina;
}

async function ultimoHash(idActivo){
    const [rowhash] = await db.query('select hashActual from historialActivo where idActivo = ? order by id desc limit 1',[idActivo]);
    return rowhash.length>0 ? rowhash[0].hashActual : '0000000000000000000000000000000000000000000000000000000000000000';
}

async function actualizarActivoVehicular(datosVehicularesAct){
    const [rowActivoVehicularAct]=('call sp_actualizar_activoVehicular(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosVehicularesAct]);
    return datosVehicularesAct;
}

async function actualizarActivoInformatico(datosInformaticoAct){
    const [rowActivoInformaticoAct]=('call sp_actualizar_activoInformatico(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosInformaticoAct]);
    return datosInformaticoAct;
}

async function actualizarActivoMobiliario(datosMobiliarioAct){
    const [rowActivoMobiliarioAct]=('call sp_actualizar_activoMobiliario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosMobiliarioAct]);
    return datosMobiliarioAct;
}

async function actualizarActivoInmobiliario(datosInmobiliarioAct){
    const [rowActivoInmobiliarioAct]=('call sp_actualizar_activoInmueble(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosInmobiliarioAct]);
    return rowActivoInmobiliarioAct;
}

async function actualizarActivoMaquinaria(datosMaquinariaAct){
    const [rowActivoMaquinariaAct]=('call sp_actualizar_activoMaquinaria(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosMaquinariaAct]);
    return rowActivoMaquinariaAct;
}

async function actualizarActivoOficina(datosOficinaAct){
    const [rowActivoOficinaAct]=('call sp_actualizar_activoOficina(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[datosOficinaAct]);
    return rowActivoOficinaAct;
}

async function darBaja(datosBajas){
    const [rowBaja]=('call sp_baja_activo(?,?,?,?,?,?,?)',[datosBajas]);
    return rowBaja;
}

async function ajusteContable(datosContables){
    const [rowContable]=('call sp_ajusteContable(?,?,?,?,?,?,?,?,?)',[datosContables]);
    return rowContable;
}

async function KPIsDashboard(){
    const [rowKPIs] = await db.query('call sp_dashboardKPIs()');
    return rowKPIs[0][0];
}

async function Dashboard(){
    const [rowKPIsSedes] = await db.query('call sp_dashboardKPIs_sedes()');
    return rowKPIsSedes[0];
}

module.exports = {
    listarActivos,
    listarActivoEspecifico,
    registrarActivoVehicular,
    registrarActivoInformatico,
    registrarActivoMueble,
    registrarActivoInmueble,
    registrarActivoMaquinaria,
    registrarActivoOficina,
    ultimoHash,
    actualizarActivoVehicular,
    actualizarActivoInformatico,
    actualizarActivoMobiliario,
    actualizarActivoInmobiliario,
    actualizarActivoMaquinaria,
    actualizarActivoOficina,
    ajusteContable,
    darBaja,
    KPIsDashboard,
    Dashboard,
};