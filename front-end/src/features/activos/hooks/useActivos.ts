import { useEffect, useState } from "react";

import { listarActivos } from "../services/activo.service";

import type { ActivoListado } from "../types/activo-listado.type";

export function useActivos() {
  const [activos, setActivos] = useState<ActivoListado[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const data = await listarActivos();
        console.log("Datos Obtenidos")
        setActivos(data);
      } catch (error) {
        console.error("Error al cargar activos:", error);

        setError("No fue posible cargar los activos.");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  return {
    activos,

    loading,

    error,
  };
}
