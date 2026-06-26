import type * as React from "react";
import { Link, useNavigate } from "react-router";

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircleHelp,
  Globe,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";

import LoginBg from "@/assets/cesal-login-bg.png";
import LogoCollapsed from "@/assets/logo-collapsed.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormData } from "../schemas/LoginSchema";

import { login } from "../api/auth.service";
import { useAuthStore } from "../store/authStore";

// import { AlertCircleIcon } from "lucide-react"
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/shared/ui/alert"

export function LoginForm({ ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data.email, data.password);

      console.log(response);

      setSession(response.token, response.user);

      if (response.user.auth === 1) {
        navigate("/cambiar-contrasenia", {
          replace: true,
        });
        return;
      }
      setSession(response.token, response.user);
      window.history.pushState(null, "", "/dashboard");
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="w-full max-w-[900px]" {...props}>
      <Card
        className="overflow-hidden rounded-[22px] ring-0 bg-white p-0
          shadow-[0_22px_70px_rgba(15,23,42,0.12)]
        "
      >
        <CardContent className="grid h-[660px] p-0 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Panel izquierdo */}
          <section className="relative hidden overflow-hidden bg-[#0F3D87] text-white lg:block">
            <img
              src={LoginBg}
              alt="Infraestructura institucional"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,37,92,0.78)_0%,rgba(10,52,120,0.64)_42%,rgba(8,58,120,0.84)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div>
                <div className="flex items-start gap-3">
                  <div>
                    <Building2 className="mt-3 h-11 w-11" />
                    <div className="mt-1 h-1 w-12 rounded-full bg-[#D9E021]" />
                  </div>

                  <div>
                    <h1 className="text-[28px] font-bold leading-tight tracking-tight">
                      Sistema
                    </h1>
                    <h2 className="text-[28px] font-bold leading-tight tracking-tight">
                      Patrimonial
                    </h2>
                  </div>
                </div>

                <p className="mt-7 max-w-[285px] text-[15px] leading-7 text-white/95">
                  Control integral de activos fijos e infraestructura
                  institucional con los más altos estándares de seguridad y
                  eficiencia gubernamental.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
                  <ShieldCheck className="h-8 w-8" />
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
                  <BadgeCheck className="h-8 w-8" />
                </div>
              </div>
            </div>
          </section>

          {/* Panel derecho */}
          <section className="flex h-full flex-col justify-center bg-white px-10 py-8">
            <div className="mx-auto w-full max-w-[340px]">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-4">
                  <div>
                    <img
                      src={LogoCollapsed}
                      alt="Logo CESAL"
                      className="mb-5 h-14 w-14 rounded-full object-contain"
                    />

                    <h1 className="text-[30px] font-bold tracking-tight text-[#145EA8]">
                      Iniciar sesión
                    </h1>

                    <p className="mt-1.5 text-sm text-slate-600">
                      Accede al sistema de gestión de activos
                    </p>
                  </div>

                  <Field className="gap-2">
                    <FieldLabel
                      htmlFor="email"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Correo electrónico
                    </FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4  text-slate-400" />

                      <Input
                        id="email"
                        type="email"
                        placeholder="test.admin001@cesal.org"
                        {...form.register("email")}
                        className="
    h-11 rounded-xl border-0 bg-slate-100 pl-10
    text-sm text-slate-700
    placeholder:text-slate-400
    focus-visible:ring-2
    focus-visible:ring-[#145EA8]
  "
                      />

                      {form.formState.errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </Field>

                  <Field className="gap-2">
                    <FieldLabel
                      htmlFor="password"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Contraseña
                    </FieldLabel>

                    <div className="relative">
                      <LockKeyhole className="absolute left-3.5 top-3.5 h-4 w-4  text-slate-400" />

                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••••"
                        {...form.register("password")}
                        className="
    h-11 rounded-xl border-0 bg-slate-100 pl-10
    text-sm text-slate-700
    placeholder:text-slate-400
    focus-visible:ring-2
    focus-visible:ring-[#145EA8]
  "
                      />

                      {form.formState.errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </Field>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-slate-600">
                      <Checkbox
                        checked={form.watch("rememberMe")}
                        onCheckedChange={(checked) =>
                          form.setValue("rememberMe", !!checked)
                        }
                        className="h-3.5 w-3.5"
                      />
                      <span>Recordar sesión</span>
                    </label>

                    <Link
                      to="/recuperar-password"
                      className="font-semibold text-[#145EA8] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="
                      mt-1 h-11 rounded-xl bg-[#2E77BD] text-sm font-semibold
                      shadow-[0_10px_22px_rgba(46,119,189,0.22)]
                      hover:bg-[#1F69B1]
                    "
                  >
                    Ingresar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </FieldGroup>
              </form>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="mb-3 text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Soporte técnico especializado
                </p>

                <div className="flex items-center justify-center gap-5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CircleHelp className="h-3.5 w-3.5" />
                    <span>Centro de Ayuda</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Español (PE)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
