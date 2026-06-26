import { obtenerEspecificacionActivo } from "./activo-especificacion.api";

export async function obtenerEspecificacion<T>(
  id: number,
  codigoPatrimonial: string,
): Promise<T> {

  return await obtenerEspecificacionActivo<T>(
    id,
    codigoPatrimonial,
  );

}