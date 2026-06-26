import type { VehiculoApi } from "./vehiculo-api.type";
import type { Vehiculo } from "./vehiculo.type";

export function mapVehiculo(
  data: VehiculoApi,
): Vehiculo {

  return {

    anio: data.anio,

    chasis: data.chasis,

    kilometraje: Number(
      data.kilometraje,
    ),

    marca: {

      id: data.idMarca,

      nombre: data.marca,

    },

    modelo: {

      id: data.idModelo,

      nombre: data.modelo,

    },

    tipoVehiculo: {

      id: data.idTipoVehiculo,

      nombre: data.tipoVehiculo,

    },

  };

}