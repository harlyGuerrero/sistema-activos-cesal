import { z } from "zod";

export const AltaActivoSchema = z.object({
  ubicacionProyecto: z
    .string()
    .min(
      1,
      "Este campo es requerido para completar la reactivación."
    ),
});

export type AltaActivoFormData = z.infer<
  typeof AltaActivoSchema
>;