export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#006BA6]">Dashboard</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Panel de Control
        </h1>
        <p className="mt-1 text-slate-500">
          Resumen general del sistema patrimonial de activos fijos CESAL.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-slate-500">
            Total de activos
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">23,000</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-slate-500">
            Activos disponibles
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">0</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-slate-500">
            Activos asignados
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">0</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-slate-500">
            En mantenimiento
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">0</h2>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <div className="min-h-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Distribución de activos por sede
          </h3>
        </div>

        <div className="min-h-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Activos por estado
          </h3>
        </div>
      </div>
    </section>
  )
}