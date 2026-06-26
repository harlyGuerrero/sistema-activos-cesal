export interface ActivoApi {
  idActivo: number;

  nombreActivo: string;

  codigoPatrimonial: string;

  codigoProveedor: string;

  codigoProyecto: string;

  idFactura: number;
  
  numeroFactura: string;

  idTipoActivo: number;

  tipoActivo: string;

  estadoActivo: string;

  costo: number;

  fechaAdquisicion: string;

  ambiente: string;

  unidadOperativa: string;

  sede: string;

  zona: string;

  isActive: boolean;
  responsable: {
    id: number;
    nombre: string;
    cargo: string;
    correo: string;
  };

  f_creacion: string;

  f_ultimaActualizacion: string;
}

export interface ActivosResponse {

  status: string;

  message: string;

  totalActivos: number;

  data: ActivoApi[];

}