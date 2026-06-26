import type { Informatico } from "./informatico.type";
import type { InformaticoApi } from "./informatico-api.type";

export function mapInformatico(
  data: InformaticoApi,
): Informatico {

  return {

    numeroSerie:
      data.numeroSerie,

    procesador:
      data.procesador,

    memoriaRam:
      Number(data.MemoriaRAM),

    almacenamientoGB:
      Number(data.almacenamientoGB),

    marca: {

      id:
        data.idMarca,

      nombre:
        data.marca,

    },

    modelo: {

      id:
        data.idModelo,

      nombre:
        data.modelo,

    },

    tipoEquipo: {

      id:
        data.idTipoEquipo,

      nombre:
        data.tipoEquipo,

    },

    sistemaOperativo: {

      id:
        data.idSO,

      nombre:
        data.SistemaOperativo,

    },

  };

}