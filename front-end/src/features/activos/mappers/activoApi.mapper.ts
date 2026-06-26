import type { ActivoApi } from "../types/activo-api.type";

import type { ActivoListado } from "../types/activo-listado.type";

import type { AssetStatus } from "../constants/asset-status";

function mapEstado(
  estado: string,
): AssetStatus {

  switch (estado.toLowerCase()) {

    case "operativo":
      return "Disponible";

    case "asignado":
      return "Asignado";

    case "mantenimiento":
      return "Mantenimiento";

    case "baja":
      return "Baja";

    default:
      return "Disponible";
  }
}

export function mapActivoApiToListado(
  activo: ActivoApi,
): ActivoListado {

  return {

    id: activo.idActivo,

    tipoActivoId: activo.idTipoActivo,

    nombre: activo.nombreActivo,

    codigoPatrimonial:
      activo.codigoPatrimonial,

    codigoProyecto:
      activo.codigoProyecto,

    codigoProveedor:
      activo.codigoProveedor,

    numeroFactura:
      activo.numeroFactura,

    categoria:
      activo.tipoActivo,

    estado:
      mapEstado(
        activo.estadoActivo,
      ),

    responsable:activo.responsable,

    zona:
      activo.zona,

    sede:
      activo.sede,

    unidadOperativa:
      activo.unidadOperativa,
    
    ambiente: activo.ambiente,

    fechaAdquisicion:
      new Date(
        activo.fechaAdquisicion,
      ).toLocaleDateString("es-PE"),

    costo:
      activo.costo,

  };

}