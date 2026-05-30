import { z } from "zod";

export const BajaActivoSchema = z.object({
  motivoBaja: z.string().min(1, "Seleccione un motivo"),
  observaciones: z
    .string()
    .min(10, "Ingrese una observación más detallada"),
});

export type BajaActivoFormData = z.infer<
  typeof BajaActivoSchema
>;