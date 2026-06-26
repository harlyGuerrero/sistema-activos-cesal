import { FichaInformatico } from "../fichas/informatico/FichaInformatico";
import { FichaVehiculo } from "../fichas/vehiculo/FichaVehiculo";
// import { FichaMobiliario } from "./fichas/mobiliario/FichaMobiliario";

interface Props {
  activoId: number;
  codigoPatrimonial: string;
  tipoActivoId: number;
}

const fichas = {
  1: FichaVehiculo,
  2: FichaInformatico,

  // 3: FichaMobiliario,
  // 4: FichaInmueble,
  // 5: FichaMaquinaria,
  // 6: FichaOficina,
} as const;

export function ActivoFichaTecnica({
  activoId,
  codigoPatrimonial,
  tipoActivoId,
}: Props) {

  const Ficha = fichas[tipoActivoId as keyof typeof fichas];

  if (!Ficha) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          p-8
          text-center
          text-slate-500
        "
      >
        No existe una ficha técnica para esta categoría.
      </div>
    );
  }

  return (
    <Ficha
      activoId={activoId}
      codigoPatrimonial={codigoPatrimonial}
    />
  );
}