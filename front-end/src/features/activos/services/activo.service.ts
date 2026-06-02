import { api } from "@/api/axios";

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