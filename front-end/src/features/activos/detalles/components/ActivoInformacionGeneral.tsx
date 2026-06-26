import type {
  ActivoDetalle,
} from "../../types/activo-detalle.type";

interface Props {
  activo: ActivoDetalle;
}

export function ActivoInformacionGeneral({
  activo,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

      <InfoCard
        titulo="Código Patrimonial"
        valor={activo.codigoPatrimonial}
      />

      <InfoCard
        titulo="Código Proveedor"
        valor={activo.codigoProveedor}
      />

      <InfoCard
        titulo="Número Factura"
        valor={activo.numeroFactura}
      />

      <InfoCard
        titulo="Fecha Adquisición"
        valor={activo.fechaAdquisicion}
      />

      <InfoCard
        titulo="Categoría"
        valor={activo.categoria}
      />

    </div>
  );
}

interface InfoCardProps {
  titulo: string;
  valor: string;
}

function InfoCard({
  titulo,
  valor,
}: InfoCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {titulo}
      </p>

      <p
        className="
          mt-2
          text-base
          font-semibold
          text-slate-900
          dark:text-slate-100
        "
      >
        {valor}
      </p>
    </div>
  );
}