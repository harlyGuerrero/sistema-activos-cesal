import type { ElementType } from "react";

export type AssetStatus =
  | "Disponible"
  | "Asignado"
  | "Mantenimiento"
  | "Baja";

export type Asset = {
  codigo: string;
  factura: string;
  proveedor: string;
  nombre: string;
  categoria: string;
  sede: string;
  codigoProyecto: string;
  estado: AssetStatus;
  icon: ElementType;
};