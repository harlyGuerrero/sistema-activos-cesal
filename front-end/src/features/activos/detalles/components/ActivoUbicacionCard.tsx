import { MapPin } from "lucide-react";

interface Props {
  zonaOperativa: string;
  sede: string;
  unidadOperativa: string;
}

export function ActivoUbicacionCard({
  zonaOperativa,
  sede,
  unidadOperativa,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />

        <h3 className="font-semibold">
          Ubicación Física
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Zona:</strong> {zonaOperativa}
        </p>

        <p>
          <strong>Sede:</strong> {sede}
        </p>

        <p>
          <strong>Unidad:</strong> {unidadOperativa}
        </p>
      </div>
    </div>
  );
}