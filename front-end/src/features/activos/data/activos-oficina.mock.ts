import type { ActivoOficina } from "../types/activo-oficina.type";
export const oficina: ActivoOficina[] = [
  {
  id: 40,
  nombre: "Proyector Epson X49",
  codigoPatrimonial: "PAT-OFI-001",
  codigoProyecto: "CAP-001",
  codigoProveedor: "EPSON-001",
  numeroFactura: "FAC-001",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2024-01-10"),
  costo: 2400,
  estadoActivoId: 1,

  zonaOperativaId: 1,
  sedeId: 1,
  unidadOperativaId: 2,
  ambienteId: 3,

  responsableId: 1,

  tipoEquipoOficinaId: 1,
  marcaId: 1,
  modeloId: 1,
  numeroSerie: "EPS-X49-001",
  conectividad: "HDMI, USB",
  observacionesTecnicas:
    "Equipo utilizado para capacitaciones."
},
{
  id: 41,
  nombre: "Pantalla Retráctil KlipXtreme 100",
  codigoPatrimonial: "PAT-OFI-002",
  codigoProyecto: "CAP-002",
  codigoProveedor: "KLIP-001",
  numeroFactura: "FAC-002",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2024-02-01"),
  costo: 650,
  estadoActivoId: 2,

  zonaOperativaId: 1,
  sedeId: 1,
  unidadOperativaId: 2,
  ambienteId: 4,

  responsableId: 1,

  tipoEquipoOficinaId: 2,
  marcaId: 2,
  modeloId: 2,
  numeroSerie: "KXT-100-002",
  conectividad: "No aplica",
  observacionesTecnicas:
    "Pantalla utilizada para presentaciones y capacitaciones."
},
{
  id: 42,
  nombre: "Televisor Samsung 55 Pulgadas",
  codigoPatrimonial: "PAT-OFI-003",
  codigoProyecto: "COM-001",
  codigoProveedor: "SAM-001",
  numeroFactura: "FAC-003",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2024-04-11"),
  costo: 2900,
  estadoActivoId: 1,

  zonaOperativaId: 1,
  sedeId: 2,
  unidadOperativaId: 3,
  ambienteId: 6,

  responsableId: 3,

  tipoEquipoOficinaId: 3,
  marcaId: 3,
  modeloId: 3,
  numeroSerie: "SAM-TV55-003",
  conectividad: "HDMI, WiFi, Bluetooth",
  observacionesTecnicas:
    "Utilizado para presentaciones institucionales."
},
{
  id: 43,
  nombre: "Cámara Logitech Brio",
  codigoPatrimonial: "PAT-OFI-004",
  codigoProyecto: "COM-002",
  codigoProveedor: "LOG-001",
  numeroFactura: "FAC-004",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2025-01-10"),
  costo: 750,
  estadoActivoId: 2,

  zonaOperativaId: 1,
  sedeId: 1,
  unidadOperativaId: 1,
  ambienteId: 2,

  responsableId: 1,

  tipoEquipoOficinaId: 4,
  marcaId: 4,
  modeloId: 4,
  numeroSerie: "LOG-BRIO-004",
  conectividad: "USB",
  observacionesTecnicas:
    "Cámara utilizada para videoconferencias."
},
{
  id: 44,
  nombre: "Parlante JBL Flip 6",
  codigoPatrimonial: "PAT-OFI-005",
  codigoProyecto: "COM-003",
  codigoProveedor: "JBL-001",
  numeroFactura: "FAC-005",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2024-08-10"),
  costo: 900,
  estadoActivoId: 1,

  zonaOperativaId: 2,
  sedeId: 3,
  unidadOperativaId: 5,
  ambienteId: 8,

  responsableId: 4,

  tipoEquipoOficinaId: 5,
  marcaId: 5,
  modeloId: 5,
  numeroSerie: "JBL-FLIP6-005",
  conectividad: "Bluetooth, USB-C",
  observacionesTecnicas:
    "Equipo de audio para eventos y capacitaciones."
},
{
  id: 45,
  nombre: "Micrófono Shure SM58",
  codigoPatrimonial: "PAT-OFI-006",
  codigoProyecto: "COM-004",
  codigoProveedor: "SHURE-001",
  numeroFactura: "FAC-006",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2024-10-15"),
  costo: 550,
  estadoActivoId: 2,

  zonaOperativaId: 3,
  sedeId: 4,
  unidadOperativaId: 6,
  ambienteId: 10,

  responsableId: 2,

  tipoEquipoOficinaId: 6,
  marcaId: 6,
  modeloId: 6,
  numeroSerie: "SHU-SM58-006",
  conectividad: "XLR",
  observacionesTecnicas:
    "Micrófono dinámico para eventos institucionales."
},
{
  id: 46,
  nombre: "Grabadora Zoom H1n",
  codigoPatrimonial: "PAT-OFI-007",
  codigoProyecto: "COM-005",
  codigoProveedor: "ZOOM-001",
  numeroFactura: "FAC-007",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2024-09-18"),
  costo: 480,
  estadoActivoId: 1,

  zonaOperativaId: 1,
  sedeId: 2,
  unidadOperativaId: 4,
  ambienteId: 7,

  responsableId: 3,

  tipoEquipoOficinaId: 7,
  marcaId: 7,
  modeloId: 7,
  numeroSerie: "ZOOM-H1N-007",
  conectividad: "USB, MicroSD",
  observacionesTecnicas:
    "Grabadora digital utilizada para entrevistas y talleres."
},
{
  id: 47,
  nombre: "Sistema de Audio Yamaha MG10XU",
  codigoPatrimonial: "PAT-OFI-008",
  codigoProyecto: "COM-006",
  codigoProveedor: "YAM-001",
  numeroFactura: "FAC-008",
  tipoActivoId: 3,
  fechaAdquisicion: new Date("2023-12-10"),
  costo: 3400,
  estadoActivoId: 3,

  zonaOperativaId: 1,
  sedeId: 1,
  unidadOperativaId: 2,
  ambienteId: 3,

  responsableId: 1,

  tipoEquipoOficinaId: 8,
  marcaId: 8,
  modeloId: 8,
  numeroSerie: "YAM-MG10XU-008",
  conectividad: "USB, XLR",
  observacionesTecnicas:
    "Equipo actualmente en mantenimiento preventivo."
}
];
