import { z } from "zod";

export const ActivoInformaticoSchema = z.object({
  nombre: z.string().min(3),
  codigoPatrimonial: z.string().min(1),
  codigoProyecto: z.string().min(1),
  codigoProveedor: z.string().min(1),
  numeroFactura: z.string().min(1),
  fechaAdquisicion: z.date(),
  costo: z.number().positive(),

  estadoActivoId: z.number(),

  zonaOperativaId: z.number(),
  sedeId: z.number(),
  unidadOperativaId: z.number(),
  ambienteId: z.number(),
  responsableId: z.number().min(1, "Seleccione un responsable"),

  tipoEquipoId: z.number().min(1, "Seleccione un tipo de equipo"),

  marcaId: z.number().min(1, "Seleccione una marca"),

  modeloId: z.number().min(1, "Seleccione un modelo"),

  numeroSerie: z.string().min(1, "Ingrese el número de serie"),

  procesador: z.string().min(1, "Ingrese el procesador"),

  memoriaRam: z.string().min(1, "Ingrese la memoria RAM"),

  almacenamiento: z.string().min(1, "Ingrese el almacenamiento"),

  sistemaOperativoId: z.number().min(1, "Seleccione un sistema operativo"),

  observacionesTecnicas: z.string().optional(),

});

export type ActivoInformaticoFormData = z.infer<typeof ActivoInformaticoSchema>;
