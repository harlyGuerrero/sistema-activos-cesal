import { CampoFicha } from "../../components/CampoFicha";

import { useVehiculo } from "./useVehiculo";

interface Props {

  activoId: number;

  codigoPatrimonial: string;

}

export function FichaVehiculo({
  activoId,
  codigoPatrimonial,
}: Props) {

  const {

    vehiculo,

    loading,

    error,

  } = useVehiculo(
    activoId,
    codigoPatrimonial,
  );

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        Cargando especificaciones...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 text-red-500 shadow">
        {error}
      </div>
    );
  }

  if (!vehiculo) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        No se encontraron especificaciones.
      </div>
    );
  }

  return (

    <div className="space-y-6 rounded-2xl bg-white p-4 shadow">

      <CampoFicha
        label="Marca"
        value={vehiculo.marca.nombre}
      />

      <CampoFicha
        label="Modelo"
        value={vehiculo.modelo.nombre}
      />

      <CampoFicha
        label="Año"
        value={vehiculo.anio}
      />

      <CampoFicha
        label="Tipo de Vehículo"
        value={vehiculo.tipoVehiculo.nombre}
      />

      <CampoFicha
        label="Chasis"
        value={vehiculo.chasis}
      />

      <CampoFicha
        label="Kilometraje"
        value={`${vehiculo.kilometraje.toLocaleString()} km`}
      />

    </div>

  );

}