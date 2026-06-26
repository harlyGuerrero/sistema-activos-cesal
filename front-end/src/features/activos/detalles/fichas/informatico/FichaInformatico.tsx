import { CampoFicha } from "../../components/CampoFicha";

import { useInformatico } from "./useInformatico";

interface Props {
  activoId: number;
  codigoPatrimonial: string;
}

export function FichaInformatico({
  activoId,
  codigoPatrimonial,
}: Props) {

  const {
    informatico,
    loading,
    error,
  } = useInformatico(
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

  if (!informatico) {
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
        value={informatico.marca.nombre}
      />

      <CampoFicha
        label="Modelo"
        value={informatico.modelo.nombre}
      />

      <CampoFicha
        label="Número de Serie"
        value={informatico.numeroSerie}
      />

      <CampoFicha
        label="Procesador"
        value={informatico.procesador}
      />

      <CampoFicha
        label="Memoria RAM"
        value={`${informatico.memoriaRam} GB`}
      />

      <CampoFicha
        label="Almacenamiento"
        value={`${informatico.almacenamientoGB} GB`}
      />

      <CampoFicha
        label="Sistema Operativo"
        value={informatico.sistemaOperativo.nombre}
      />

    </div>
  );
}