import {
  Laptop,
  Printer,
  Armchair,
  Car,
  Monitor,
} from "lucide-react";

import type { Asset } from "../types/asset.types";

export const assets: Asset[] = [
  {
    codigo: "ACT-2023-001",
    proveedor: "S2011523267",
    factura: "F001-0005620",
    nombre: 'MacBook Pro M2 14"',
    categoria: "Tecnología",
    sede: "Lima - Oficina 302",
    codigoProyecto: "PRY-EDU-001",
    estado: "Disponible",
    icon: Laptop,
  },

  {
    codigo: "ACT-2023-045",
    proveedor: "50653",
    factura: "F001-0008620",
    nombre: "Escritorio Ergonómico",
    categoria: "Mobiliario",
    sede: "Cusco - Regional",
    codigoProyecto: "PRY-GOP-004",
    estado: "Asignado",
    icon: Armchair,
  },

  {
    codigo: "ACT-2022-112",
    proveedor: "968947",
    factura: "F001-0009920",
    nombre: "Toyota Hilux 2022",
    categoria: "Vehículos",
    sede: "Arequipa - Campo",
    codigoProyecto: "PRY-SAL-002",
    estado: "Mantenimiento",
    icon: Car,
  },

  {
    codigo: "ACT-2020-089",
    proveedor: "50651",
    factura: "F001-0006920",
    nombre: "Impresora Industrial",
    categoria: "Tecnología",
    sede: "Almacén Central",
    codigoProyecto: "PRY-ADM-010",
    estado: "Baja",
    icon: Printer,
  },

  {
    codigo: "ACT-2024-021",
    proveedor: "50698",
    factura: "F001-0009620",
    nombre: "Monitor Dell 27”",
    categoria: "Tecnología",
    sede: "Lima - Oficina 101",
    codigoProyecto: "PRY-EDU-003",
    estado: "Disponible",
    icon: Monitor,
  },
];