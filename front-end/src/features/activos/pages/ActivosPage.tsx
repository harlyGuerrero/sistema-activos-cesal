import { Link } from "react-router";
import {
  CloudUpload,
  Download,
  Plus,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

import { TablaActivos } from "@/features/activos/components/TablaActivos";
import { TarjetasMetricasActivos } from "@/features/dashboard/components/TarjetasMetricasActivos";

export default function ActivosPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}

      <section
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Título */}

        <div>
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
              dark:text-slate-300
              sm:text-3xl
            "
          >
            Gestión de Activos
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Administración, control y trazabilidad de los
            activos institucionales.
          </p>
        </div>

        {/* Acciones */}

        <div
          className="
            flex
            flex-col
            gap-3
            sm:grid
            sm:grid-cols-2
            lg:flex
            lg:flex-row
          "
        >
          <Button
            variant="secondary"
            className="
              w-full
              bg-white
              shadow
              dark:bg-slate-700
              lg:w-auto
            "
          >
            <CloudUpload />
            <span>Importar</span>
          </Button>

          <Button
            variant="secondary"
            className="
              w-full
              bg-white
              shadow
              dark:bg-slate-700
              lg:w-auto
            "
          >
            <Download />
            <span>Exportar</span>
          </Button>

          <Link
            to="/activos/nuevo"
            className="w-full lg:w-auto"
          >
            <Button
              className="
                w-full
                bg-blue-600
                text-white
                shadow
                hover:bg-blue-700
                lg:w-auto
              "
            >
              <Plus />

              <span>Nuevo Activo</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Métricas */}

      <section>
        <TarjetasMetricasActivos />
      </section>

      {/* Tabla */}

      <section>
        <TablaActivos />
      </section>
    </div>
  );
}