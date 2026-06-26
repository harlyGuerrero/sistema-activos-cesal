import { useEffect, useState } from "react";

import { obtenerEspecificacion } from "./activo-especificacion.service";

interface UseEspecificacionResult<T> {

  data: T | null;

  loading: boolean;

  error: string | null;

}

export function useEspecificacion<TApi, TModel>(

  activoId: number,

  codigoPatrimonial: string,

  mapper: (data: TApi) => TModel,

): UseEspecificacionResult<TModel> {

  const [data, setData] =
    useState<TModel | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    async function cargar() {

      try {

        setLoading(true);

        const response =
          await obtenerEspecificacion<TApi>(
            activoId,
            codigoPatrimonial,
          );

        setData(
          mapper(response),
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

  }, [
    activoId,
    codigoPatrimonial,
    mapper,
  ]);

  return {

    data,

    loading,

    error,

  };

}