import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Ingrese un correo válido")
    .min(1, "El correo es obligatorio"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "Mínimo 8 caracteres"),

  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;