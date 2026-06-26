import { api } from "@/shared/lib/api/axios";
import { assets } from "../data/assets.mock";

import { obtenerActivos } from "../api/activo.api";

import { mapActivoApiToListado } from "../mappers/activoApi.mapper";

export const activoService = {
  obtenerMarcas: async () => {
    const response = await api.get("/marcas");

    return response.data;
  },

  obtenerModelos: async (
    marcaId: number
  ) => {
    const response = await api.get(
      `/modelos?marcaId=${marcaId}`
    );

    return response.data;
  },

  crearActivoInformatico: async (
    data: unknown
  ) => {
    const response = await api.post(
      "/activos/informaticos",
      data
    );

    return response.data;
  },
};

export function obtenerActivoPorCodigo(
  codigoPatrimonial: string
) {
  return assets.find(
    activo =>
      activo.codigoPatrimonial.toLowerCase() ===
      codigoPatrimonial.toLowerCase()
  );
}

export async function listarActivos() {

  const activos = await obtenerActivos();

  return activos.map(mapActivoApiToListado);

}