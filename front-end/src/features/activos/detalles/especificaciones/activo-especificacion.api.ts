import { api } from "@/shared/lib/api/axios";

import type { ActivoEspecificacionResponse } from "./activo-especificacion-response.type";

export async function obtenerEspecificacionActivo<T>(
  id: number,
  codigoPatrimonial: string,
): Promise<T> {

  const { data } =
    await api.get<
      ActivoEspecificacionResponse<T>
    >(
      `/activo/ready-Specification/${id}`,
      {
        params: {
          codigo: codigoPatrimonial,
        },
      },
    );

  return data.data;

}