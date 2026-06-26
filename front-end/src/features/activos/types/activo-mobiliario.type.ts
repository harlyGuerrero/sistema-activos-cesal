import type { ActivoBase } from "./activo-base.type";

export interface ActivoMobiliario extends ActivoBase {

  // Clasificación
  tipoMuebleId: number;

  // Fabricante
  marcaId?: number;
  modeloId?: number;

  // Identificación
  numeroSerie?: string;

  // Características
  material: string;
  color: string;

  // Medidas
  largoCm?: number;
  anchoCm?: number;
  altoCm?: number;

  // Estado físico
  observacionesTecnicas?: string;
}