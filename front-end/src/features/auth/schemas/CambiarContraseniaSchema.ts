import { z } from "zod";

export const CambiarContraseniaSchema = z
  .object({
    contraseniaActual: z
      .string()
      .min(1, "La contraseña actual es obligatoria"),

    nuevaContrasenia: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una mayúscula"
      )
      .regex(
        /\d/,
        "La contraseña debe contener al menos un número"
      ),

    confirmarContrasenia: z
      .string()
      .min(1, "Debe confirmar la contraseña"),
  })
  .refine(
    (data) =>
      data.nuevaContrasenia === data.confirmarContrasenia,
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmarContrasenia"],
    }
  );

export type CambiarContraseniaFormData = z.infer<
  typeof CambiarContraseniaSchema
>;