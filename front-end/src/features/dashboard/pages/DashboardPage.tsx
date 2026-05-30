import { TarjetasMetricasActivos } from "@/features/dashboard/components/TarjetasMetricasActivos";
import { GraficoActivosPorSede } from "../components/GraficoActivosPorSede";
import { GraficoActivosPorEstado } from "../components/GraficoActivosPorEstado";
import { TablaActivos } from "../../activos/components/TablaActivos";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <TarjetasMetricasActivos />
      </section>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <GraficoActivosPorSede />
        <div className="rounded-2xl shadow-sm">
          <GraficoActivosPorEstado />
        </div>
      </section>
      <section>
        <TablaActivos />
      </section>
    </div>
  );
}
