interface Props {
  codigoProyecto: string;
}

export function ActivoProyectoCard({
  codigoProyecto,
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
      <h3 className="mb-4 font-semibold">
        Proyecto Asignado
      </h3>

      <span
        className="
          rounded-xl
          bg-blue-50
          px-3
          py-2
          text-sm
          font-medium
          text-blue-700
        "
      >
        {codigoProyecto}
      </span>
    </div>
  );
}