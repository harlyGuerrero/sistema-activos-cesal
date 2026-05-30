import { useNavigate } from "react-router"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"

export default function ContraseniaActualizada() {
  const navigate = useNavigate()

  return (
    <main
      className="
        flex min-h-svh items-center justify-center px-4 py-6
        bg-[radial-gradient(circle_at_top_left,rgba(0,107,166,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(229,230,0,0.16),transparent_35%),linear-gradient(135deg,#f9fcff_0%,#f4f9fb_50%,#fffef4_100%)]
      "
    >
      <Card className="w-full max-w-[430px] ring-0 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.10)]">
        <CardContent className="p-10 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <CheckCircle2 className="h-11 w-11" />
          </div>

          <h1 className="text-2xl font-bold text-slate-950">
            ¡Contraseña actualizada!
          </h1>

          <p className="mx-auto mt-4 max-w-[320px] text-sm leading-7 text-slate-600">
            Tu contraseña ha sido cambiada correctamente. Tu cuenta ahora cuenta con los nuevos estándares de seguridad institucional.
          </p>

          <Button
            onClick={() => navigate("/dashboard")}
            className="mt-8 h-12 w-full rounded-xl bg-[#0079B8] text-sm font-semibold shadow-[0_10px_22px_rgba(0,121,184,0.22)] hover:bg-[#006BA6]"
          >
            Entendido
          </Button>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            Seguridad de activos institucionales
          </p>
        </CardContent>
      </Card>
    </main>
  )
}