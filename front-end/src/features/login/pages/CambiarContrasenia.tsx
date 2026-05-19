import { useNavigate } from "react-router"
import { LockKeyhole, RotateCcwKey, ShieldCheck, Info } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"

export default function CambiarContrasenia() {
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Aquí luego validarás y enviarás al backend.
    navigate("/contrasenia-actualizada")
  }

  return (
    <main
      className="
        flex min-h-svh items-center justify-center px-4 py-6
        bg-[radial-gradient(circle_at_top_left,rgba(0,107,166,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(229,230,0,0.16),transparent_35%),linear-gradient(135deg,#f9fcff_0%,#f4f9fb_50%,#fffef4_100%)]
      "
    >
      <Card className="w-full max-w-[420px] ring-0 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.10)]">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#006BA6]">
              <LockKeyhole className="h-6 w-6" />
            </div>

            <h1 className="text-2xl font-bold text-slate-950">
              Cambiar Contraseña
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Actualiza tus credenciales para mantener la seguridad de la cuenta institucional.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Contraseña actual
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-0 bg-slate-100 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Nueva contraseña
              </Label>

              <div className="relative">
                <RotateCcwKey className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-0 bg-slate-100 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wide text-slate-600">
                Confirmar nueva contraseña
              </Label>

              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-0 bg-slate-100 pl-10"
                />
              </div>
            </div>

            <div className="flex gap-3 rounded-lg bg-orange-50 px-3 py-3 text-xs text-orange-700">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                La contraseña debe contener al menos 8 caracteres, una mayúscula y un número.
              </p>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#0079B8] text-sm font-semibold shadow-[0_10px_22px_rgba(0,121,184,0.22)] hover:bg-[#006BA6]"
            >
              Cambiar Contraseña
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-slate-600"
              onClick={() => navigate("/login")}
            >
              Cancelar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}