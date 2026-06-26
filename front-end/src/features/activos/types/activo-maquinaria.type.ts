import { type ActivoBase } from "./activo-base.type";

export interface ActivoMaquinaria
  extends ActivoBase {

  // Clasificación
  tipoMaquinariaId: number;

  // Fabricante
  marcaId: number;
  modeloId: number;

  // Identificación
  numeroSerie: string;

  // Datos técnicos
  potencia?: string;
  capacidad?: string;

  // Control
  fechaUltimoMantenimiento?: Date;
  proximoMantenimiento?: Date;

  // Observaciones
  observacionesTecnicas?: string;
}