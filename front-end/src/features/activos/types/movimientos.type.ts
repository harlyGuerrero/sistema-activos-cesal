export interface MovimientoActivo {
  id: number;
  activoId: number;

  tipo:
    | "Alta"
    | "Asignación"
    | "Traslado"
    | "Mantenimiento"
    | "Baja";

  titulo: string;
  badge: string;

  descripcion: string;

  usuario: string;
  cargo: string;

  fecha: string;
  hora: string;

  detalle1: string;
  detalle2: string;
}