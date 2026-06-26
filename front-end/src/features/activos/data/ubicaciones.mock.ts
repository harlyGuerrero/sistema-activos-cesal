export const zonasOperativas = [
  {
    id: 1,
    nombre: "Lima",
  },
  {
    id: 2,
    nombre: "Sierra",
  },
  {
    id: 3,
    nombre: "Selva",
  },
];

export const sedes = [
  {
    id: 1,
    nombre: "San Isidro",
    zonaOperativaId: 1,
  },
  {
    id: 2,
    nombre: "Huachipa",
    zonaOperativaId: 1,
  },
  {
    id: 3,
    nombre: "Abancay",
    zonaOperativaId: 2,
  },
  {
    id: 4,
    nombre: "Atalaya",
    zonaOperativaId: 3,
  },
];
export const unidadesOperativas = [
  // SAN ISIDRO

  {
    id: 1,
    nombre: "Sede Principal",
    sedeId: 1,
  },

  {
    id: 2,
    nombre: "CAE",
    sedeId: 1,
  },

  // HUACHIPA

  {
    id: 3,
    nombre: "CETPRO",
    sedeId: 2,
  },

  {
    id: 4,
    nombre: "Almacén Logístico",
    sedeId: 2,
  },

  // ABANCAY

  {
    id: 5,
    nombre: "PAO",
    sedeId: 3,
  },

  // ATALAYA

  {
    id: 6,
    nombre: "PAO",
    sedeId: 4,
  },

  {
    id: 7,
    nombre: "Centro Comunitario",
    sedeId: 4,
  },
];
export const ambientes = [
  // SAN ISIDRO

  {
    id: 1,
    nombre: "Oficina Principal",
    unidadOperativaId: 1,
  },

  {
    id: 2,
    nombre: "Sala de Reuniones",
    unidadOperativaId: 1,
  },

  {
    id: 3,
    nombre: "Aula 01",
    unidadOperativaId: 2,
  },

  {
    id: 4,
    nombre: "Aula 02",
    unidadOperativaId: 2,
  },

  // HUACHIPA

  {
    id: 5,
    nombre: "Taller CETPRO",
    unidadOperativaId: 3,
  },

  {
    id: 6,
    nombre: "Laboratorio",
    unidadOperativaId: 3,
  },

  {
    id: 7,
    nombre: "Almacén Principal",
    unidadOperativaId: 4,
  },

  // ABANCAY

  {
    id: 8,
    nombre: "Oficina Regional",
    unidadOperativaId: 5,
  },

  // ATALAYA

  {
    id: 9,
    nombre: "Centro Comunitario",
    unidadOperativaId: 7,
  },

  {
    id: 10,
    nombre: "Caseta de Vigilancia",
    unidadOperativaId: 6,
  },
];
