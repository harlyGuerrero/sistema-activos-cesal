import { useEffect, useState } from "react";

import { obtenerEspecificacion } from "../../especificaciones/activo-especificacion.service";

import { mapInformatico } from "./informatico.mapper";

import type { Informatico } from "./informatico.type";
import type { InformaticoApi } from "./informatico-api.type";

interface UseInformaticoResult {
  informatico: Informatico | null;
  loading: boolean;
  error: string | null;
}

export function useInformatico(
  activoId: number,
  codigoPatrimonial: string,
): UseInformaticoResult {

  const [informatico, setInformatico] =
    useState<Informatico | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    async function cargar() {

      try {

        setLoading(true);

        const data =
          await obtenerEspecificacion<InformaticoApi>(
            activoId,
            codigoPatrimonial,
          );

        setInformatico(
          mapInformatico(data),
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

    informatico,

    loading,

    error,

  };

}