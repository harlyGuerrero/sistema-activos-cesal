import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <main
      className="
        min-h-svh overflow-hidden px-4 py-5
        bg-[radial-gradient(circle_at_top_left,rgba(0,107,166,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(229,230,0,0.16),transparent_35%),linear-gradient(135deg,#f9fcff_0%,#f4f9fb_50%,#fffef4_100%)]
      "
    >
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-[900px] flex-col items-center justify-center">
        <LoginForm />

        <footer className="mt-5 flex w-full items-center justify-between text-[10px] tracking-wide text-slate-400">
          <p>© 2026 SISTEMA PATRIMONIAL DE CONTROL DE ACTIVOS FIJOS.</p>

          <div className="flex items-center gap-6 uppercase">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Soporte</span>
          </div>
        </footer>
      </div>
    </main>
  )
}