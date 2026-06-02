export interface ActivoInformaticoFormData {
  // Información Patrimonial
  nombre: string;
  codigoPatrimonial: string;
  codigoProyecto: string;
  codigoProveedor: string;
  numeroFactura: string;
  fechaAdquisicion: Date;
  costo: number;
  estadoActivoId: number;

  // Ubicación y Asignación
  zonaOperativaId: number;
  sedeId: number;
  unidadOperativaId: number;
  ambienteId: number;
  responsableId: number;

  // Especificaciones Técnicas
  tipoEquipoId: number;
  marcaId: number;
  modeloId: number;
  numeroSerie: string;
  procesador: string;
  memoriaRam: string;
  almacenamiento: string;
  sistemaOperativoId: number;
  observacionesTecnicas?: string;

  // Adjuntos
  imagenes: File[];
}