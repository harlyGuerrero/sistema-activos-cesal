import type { MovimientoActivo }
from "../types/movimientos.type";

export const movimientosMock: MovimientoActivo[] = [

  {
    id: 5,
    activoId: 1,

    tipo: "Mantenimiento",

    titulo: "Mantenimiento",

    badge: "Servicio Técnico",

    descripcion:
      "Mantenimiento preventivo realizado al activo.",

    usuario: "Soporte Técnico CESAL",

    cargo: "Área de Soporte",

    fecha: "05/06/2025",

    hora: "03:20 p. m.",

    detalle1:
      "Limpieza interna, actualización de sistema",

    detalle2:
      "y verificación de componentes.",
  },

  {
    id: 4,
    activoId: 1,

    tipo: "Traslado",

    titulo: "Traslado",

    badge: "Cambio de Ubicación",

    descripcion:
      "Traslado del activo entre sedes de la institución.",

    usuario: "Luis Enrique Torres",

    cargo: "Coordinador de Logística",

    fecha: "18/04/2025",

    hora: "02:45 p. m.",

    detalle1:
      "Sede Central - San Isidro",

    detalle2:
      "Sede Huachipa",
  },

  {
    id: 3,
    activoId: 1,

    tipo: "Asignación",

    titulo: "Asignación",

    badge: "Cambio de Responsable",

    descripcion:
      "Activo asignado a nuevo responsable.",

    usuario: "Juan Pérez Ramírez",

    cargo: "Analista de Sistemas",

    fecha: "10/02/2025",

    hora: "11:30 a. m.",

    detalle1:
      "Analista de Sistemas",

    detalle2:
      "Cargo / Rol",
  },

  {
    id: 2,
    activoId: 1,

    tipo: "Alta",

    titulo: "Alta de Activo",

    badge: "Registro Inicial",

    descripcion:
      "Ingreso inicial del activo al inventario institucional.",

    usuario: "María Fernanda López",

    cargo: "Administradora de Inventario",

    fecha: "15/01/2025",

    hora: "09:15 a. m.",

    detalle1:
      "Sede Central - San Isidro",

    detalle2:
      "Ubicación",
  },

  {
    id: 1,
    activoId: 1,

    tipo: "Baja",

    titulo: "Baja de Activo",

    badge: "Desincorporación",

    descripcion:
      "Activo dado de baja por desuso y obsolescencia.",

    usuario: "José Carlos Andrade",

    cargo: "Responsable de Patrimonio",

    fecha: "28/12/2024",

    hora: "04:30 p. m.",

    detalle1:
      "Acta de Baja N° 2024-156",

    detalle2:
      "Documento",
  },
];