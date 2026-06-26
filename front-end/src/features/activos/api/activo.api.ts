import { api } from "@/shared/lib/api/axios";

import type {
  ActivosResponse,
} from "../types/activo-api.type";
// import type { ActivoDetalleResponse } from "../types/activo-detalle-api.type";

export async function obtenerActivos() {

  const { data } =
    await api.get<ActivosResponse>(
      "/activo/ready"
    );

  return data.data;
}
// export async function obtenerActivoDetalle(

//   codigoPatrimonial: string,

// ) {

//   const { data } =
//     await api.get<
//       ActivoDetalleResponse
//     >(
//       `/activo/${codigoPatrimonial}`
//     );

//   return data.data;

// }
