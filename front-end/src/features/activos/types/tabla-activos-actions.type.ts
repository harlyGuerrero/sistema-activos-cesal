import type { ActivoListado } from "./activo-listado.type";

export interface TablaActivosActions {
  onVer?: (activo: ActivoListado) => void;

  onEditar?: (activo: ActivoListado) => void;

  onDarBaja?: (activo: ActivoListado) => void;

  onDarAlta?: (activo: ActivoListado) => void;
}