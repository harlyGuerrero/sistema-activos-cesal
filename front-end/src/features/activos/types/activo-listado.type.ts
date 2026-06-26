import type { AssetStatus } from "../constants/asset-status";

export interface ActivoListado {
  id: number;
  tipoActivoId: number;
  codigoPatrimonial: string;
  numeroFactura: string;
  nombre: string;
  codigoProveedor: string;
  codigoProyecto: string;
  categoria: string;

  sede: string;
  zona: string;
  unidadOperativa: string;
  ambiente: string;
  
  estado: AssetStatus;

  responsable: {
    id: number;
    nombre: string;
    cargo: string;
    correo: string;
  };

  fechaAdquisicion: string;
  costo: number;
}
