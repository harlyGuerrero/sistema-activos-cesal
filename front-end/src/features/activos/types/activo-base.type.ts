export interface ActivoBase {
  id: number;

  // Información Patrimonial
  nombre: string;
  codigoPatrimonial: string;
  codigoProyecto: string;
  codigoProveedor: string;
  numeroFactura: string;
  tipoActivoId: number;
  fechaAdquisicion: Date;
  costo: number;
  estadoActivoId: number;

  // Ubicación
  zonaOperativaId: number;
  sedeId: number;
  unidadOperativaId: number;
  ambienteId: number;

  // Responsable
  responsableId: number;
}