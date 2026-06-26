interface CampoFichaProps {
  label: string;
  value: string | number;
}

export function CampoFicha({
  label,
  value,
}: CampoFichaProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-100
        py-3
        dark:border-slate-800
      "
    >
      <span
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
          text-sm
          font-semibold
          text-slate-900
          dark:text-slate-100
        "
      >
        {value}
      </span>
    </div>
  );
}