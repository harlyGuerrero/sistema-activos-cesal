import { LoginForm } from "@/shared/components/login-form"
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 p-6
        bg-[radial-gradient(circle_at_top_left,rgba(0,107,166,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(229,230,0,0.16),transparent_35%),linear-gradient(135deg,#f9fcff_0%,#f4f9fb_50%,#fffef4_100%)]

        dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#020617_100%)]">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}