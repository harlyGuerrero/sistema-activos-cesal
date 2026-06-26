import type { AssetStatus }
from "../constants/asset-status";

export interface ActivoDetalle {

  id: number;

  tipoActivoId: number;

  nombre: string;

  codigoPatrimonial: string;

  codigoProyecto: string;

  codigoProveedor: string;

  numeroFactura: string;

  categoria: string;

  estado: AssetStatus;

  costo: number;

  fechaAdquisicion: string;

  ambiente: string;

  sede: string;

  zona: string;

  unidadOperativa: string;

  responsable: {

    id: number;

    nombre: string;

    correo: string;

    cargo: string;

  };

}