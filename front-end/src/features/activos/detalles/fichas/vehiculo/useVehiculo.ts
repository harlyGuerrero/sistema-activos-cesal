import { useEffect, useState } from "react";

import { obtenerEspecificacion } from "../../especificaciones/activo-especificacion.service";

import { mapVehiculo } from "./vehiculo.mapper";

import type { Vehiculo } from "./vehiculo.type";
import type { VehiculoApi } from "./vehiculo-api.type";

interface UseVehiculoResult {

  vehiculo: Vehiculo | null;

  loading: boolean;

  error: string | null;

}

export function useVehiculo(
  activoId: number,
  codigoPatrimonial: string,
): UseVehiculoResult {

  const [vehiculo, setVehiculo] =
    useState<Vehiculo | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    async function cargar() {

      try {

        setLoading(true);

        const data =
          await obtenerEspecificacion<VehiculoApi>(
            activoId,
            codigoPatrimonial,
          );

        setVehiculo(
          mapVehiculo(data),
        );

      } catch {

        setError(
          "No fue posible cargar las especificaciones.",
        );

      } finally {

        setLoading(false);

      }

    }

    cargar();

  }, [activoId, codigoPatrimonial]);

  return {

    vehiculo,

    loading,

    error,

  };

}