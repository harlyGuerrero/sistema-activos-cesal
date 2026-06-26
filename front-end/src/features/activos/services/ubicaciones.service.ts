import {
  zonasOperativas,
  sedes,
  unidadesOperativas,
  ambientes,
} from "../data/ubicaciones.mock";

export function obtenerZona(
  id: number
) {
  return (
    zonasOperativas.find(
      zona => zona.id === id
    )?.nombre ?? "-"
  );
}

export function obtenerSede(
  id: number
) {
  return (
    sedes.find(
      sede => sede.id === id
    )?.nombre ?? "-"
  );
}

export function obtenerAmbiente(
  id: number
) {
  return (
    ambientes.find(
      ambientes => ambientes.id === id
    )?.nombre ?? "-"
  );
}

export function obtenerUnidadOperativa(
  id: number
) {
  return (
    unidadesOperativas.find(
      unidad => unidad.id === id
    )?.nombre ?? "-"
  );
}