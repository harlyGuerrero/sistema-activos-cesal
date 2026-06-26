import type { ActivoBase } from "./activo-base.type";

export interface ActivoOficina extends ActivoBase {

  // Clasificación
  tipoEquipoOficinaId: number;

  // Fabricante
  marcaId: number;
  modeloId: number;

  // Identificación
  numeroSerie?: string;

  // Especificaciones
  conectividad?: string;
  potencia?: string;

  // Observaciones
  observacionesTecnicas?: string;
}