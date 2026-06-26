import type { ActivoInmueble } from "../types/activo-inmueble.type";
export const inmuebles: ActivoInmueble[] = [

{
  id:17,
  nombre:"Centro de Atención Educativa CAE",
  codigoPatrimonial:"PAT-INM-002",
  codigoProyecto:"INFRA-002",
  codigoProveedor:"INM-CESAL-002",
  numeroFactura:"FAC-002",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2019-05-12"),
  costo:1800000,
  estadoActivoId: 1,

  zonaOperativaId: 1,
  sedeId: 1,
  unidadOperativaId: 2,
  ambienteId: 2,

  responsableId: 2,

  tipoInmuebleId: 4,
  direccion:"Av. República 456, San Isidro, Lima",
  areaTotalM2: 350
},
{
  id:18,
  nombre:"CETPRO Huachipa",
  codigoPatrimonial:"PAT-INM-003",
  codigoProyecto:"INFRA-003",
  codigoProveedor:"INM-CESAL-003",
  numeroFactura:"FAC-003",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2020-02-15"),
  costo:2100000,
  estadoActivoId: 1,

  zonaOperativaId: 1,
  sedeId: 2,
  unidadOperativaId: 3,
  ambienteId: 3,

  responsableId: 3,

  tipoInmuebleId: 4,
  direccion:"Carretera Central Km 12, Huachipa",
  areaTotalM2: 420
},
{
  id:19,
  nombre:"Almacén Logístico Huachipa",
  codigoPatrimonial:"PAT-INM-004",
  codigoProyecto:"INFRA-004",
  codigoProveedor:"INM-CESAL-004",
  numeroFactura:"FAC-004",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2021-03-10"),
  costo:980000,
  estadoActivoId: 1,

  zonaOperativaId: 1,
  sedeId: 2,
  unidadOperativaId: 3,
  ambienteId: 4,

  responsableId: 4,

  tipoInmuebleId: 3,
  direccion:"Zona Industrial Huachipa Mz. B Lt. 10",
  areaTotalM2: 280
},
{
  id:20,
  nombre:"Oficina Regional Abancay",
  codigoPatrimonial:"PAT-INM-005",
  codigoProyecto:"INFRA-005",
  codigoProveedor:"INM-CESAL-005",
  numeroFactura:"FAC-005",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2020-08-18"),
  costo:1250000,
  estadoActivoId: 1,

  zonaOperativaId: 2,
  sedeId: 3,
  unidadOperativaId: 4,
  ambienteId: 5,

  responsableId: 5,

  tipoInmuebleId: 2,
  direccion:"Jr. Apurímac 789, Abancay",
  areaTotalM2: 220
},
{
  id:21,
  nombre:"Centro Comunitario Atalaya",
  codigoPatrimonial:"PAT-INM-006",
  codigoProyecto:"INFRA-006",
  codigoProveedor:"INM-CESAL-006",
  numeroFactura:"FAC-006",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2021-11-20"),
  costo:1450000,
  estadoActivoId: 1,

  zonaOperativaId: 3,
  sedeId: 4,
  unidadOperativaId: 4,
  ambienteId: 6,

  responsableId: 1,

  tipoInmuebleId: 4,
  direccion:"Av. Principal S/N, Atalaya",
  areaTotalM2: 380
},
{
  id: 22,
  nombre:"Caseta de Vigilancia Atalaya",
  codigoPatrimonial:"PAT-INM-007",
  codigoProyecto:"INFRA-007",
  codigoProveedor:"INM-CESAL-007",
  numeroFactura:"FAC-007",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2022-01-15"),
  costo:120000,
  estadoActivoId: 2,

  zonaOperativaId: 3,
  sedeId: 4,
  unidadOperativaId: 4,
  ambienteId: 7,

  responsableId: 2,

  tipoInmuebleId: 5,
  direccion:"Ingreso Principal Atalaya",
  areaTotalM2: 25
},
{
  id: 23,
  nombre:"Módulo Prefabricado de Capacitación",
  codigoPatrimonial:"PAT-INM-008",
  codigoProyecto:"INFRA-008",
  codigoProveedor:"INM-CESAL-008",
  numeroFactura:"FAC-008",
  tipoActivoId: 6,
  fechaAdquisicion: new Date("2023-04-12"),
  costo:450000,
  estadoActivoId: 3,

  zonaOperativaId: 2,
  sedeId: 3,
  unidadOperativaId: 4,
  ambienteId: 8,

  responsableId: 3,

  tipoInmuebleId: 6,
  direccion:"Complejo Educativo Abancay",
  areaTotalM2: 120
}

];