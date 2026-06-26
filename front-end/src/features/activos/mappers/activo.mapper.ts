
import { assets } from "../data/assets.mock";
import type { ActivoListado }
from "../types/activo-listado.type";
/* ==========================================
 * HELPERS
 * ========================================== */
import {
  obtenerEstado,
  obtenerCategoria,
  obtenerResponsable,
} from "../services/catalogos.service";

import {
  obtenerZona,
  obtenerSede,
  obtenerUnidadOperativa,
  obtenerAmbiente,
} from "../services/ubicaciones.service";



/* ==========================================
 * MAPPER
 * ========================================== */

export const activosListado: ActivoListado[] = assets.map((activo) => {
  const responsable = obtenerResponsable(activo.responsableId);

  return {
    id: activo.id,

    tipoActivoId: activo.tipoActivoId,

    nombre: activo.nombre,

    codigoPatrimonial: activo.codigoPatrimonial,

    codigoProyecto: activo.codigoProyecto,

    codigoProveedor: activo.codigoProveedor,

    numeroFactura: activo.numeroFactura,

    categoria: obtenerCategoria(activo.tipoActivoId),

    estado: obtenerEstado(activo.estadoActivoId),

    responsable: {
      id: responsable?.id ?? 0,
      nombre: responsable?.nombre ?? "Activo no Asignado",
      correo: responsable?.correo ?? "",
      cargo: responsable?.cargo ?? "",

    },

    zona: obtenerZona(activo.zonaOperativaId),

    ambiente: obtenerAmbiente(activo.ambienteId),

    sede: obtenerSede(activo.sedeId),

    unidadOperativa: obtenerUnidadOperativa(activo.unidadOperativaId),

    fechaAdquisicion: new Date(activo.fechaAdquisicion).toLocaleDateString(
      "es-PE",
    ),

    costo: activo.costo,
  };
});
