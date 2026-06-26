import { type ActivoBase } from "./activo-base.type";

export interface ActivoVehicular
  extends ActivoBase {

  marcaId: number;
  modeloId: number;
  anio: Date;
  chasis: string;
  tipoVehiculoId: number;
  kilometraje: number;
}