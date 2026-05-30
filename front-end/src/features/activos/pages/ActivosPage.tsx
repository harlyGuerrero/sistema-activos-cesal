import { TablaActivos } from "@/features/activos/components/TablaActivos";
import { Link } from "react-router";

import { Button } from "@/shared/ui/button";
import { CloudUpload, Download, Plus } from "lucide-react";
import { TarjetasMetricasActivos } from "@/features/dashboard/components/TarjetasMetricasActivos";

export default function ActivosPage() {
  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Gestión de Activos
          </h1>
          <p className="mt-1 text-slate-500">
            Administración, control y trazabilidad de los Activos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="bg-white shadow py-4 px-4">
            <CloudUpload /> Importar
          </Button>
          <Button variant="secondary" className="bg-white shadow py-4 px-4">
            <Download /> Exportar
          </Button>
          <Link to="/activos/crear">
            <Button variant="default" className="bg-blue-600 shadow text-white py-4 px-4 [&_svg]:text-white ">
              <Plus  className="text-white"/>
              Nuevo Activo
            </Button>
          </Link>
        </div>
      </section>
      <section className="">
        <TarjetasMetricasActivos />
      </section>

      <section>
        <TablaActivos />
      </section>
    </div>
  );
}
