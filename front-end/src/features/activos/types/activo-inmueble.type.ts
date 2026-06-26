import { type ActivoBase } from "./activo-base.type";

export interface ActivoInmueble
  extends ActivoBase {

  tipoInmuebleId: number;

  direccion: string;

  areaTotalM2: number;
}