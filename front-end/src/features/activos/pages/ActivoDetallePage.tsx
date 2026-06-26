import { useLocation, Navigate } from "react-router";

import { ActivoDetalleHeader } from "../detalles/components/ActivoDetalleHeader";
import { ActivoResponsableCard } from "../detalles/components/ActivoResponsableCard";
import { ActivoGaleria } from "../detalles/components/ActivoIGaleria";
import { ActivoValorCard } from "../detalles/components/ActivoValorCard";
import { ActivoUbicacionCard } from "../detalles/components/ActivoUbicacionCard";
import { ActivoProyectoCard } from "../detalles/components/ActivoProyectoCard";
import { ActivoTabs } from "../detalles/components/ActivoTabs";

import type { ActivoListado } from "../types/activo-listado.type";

export default function ActivoDetallePage() {

  const { state } = useLocation();

  const activo =
    state?.activo as ActivoListado | undefined;

  /**
   * Si el usuario entra directamente
   * escribiendo la URL
   */

  if (!activo) {

    return (
      <Navigate
        to="/activos"
        replace
      />
    );

  }

  return (
    <div className="space-y-6 p-6">

      <ActivoDetalleHeader
        nombre={activo.nombre}
        estado={activo.estado}
      />

      <div className="grid gap-6 lg:grid-cols-3">

        {/* IZQUIERDA */}

        <div className="lg:col-span-2">

          <ActivoGaleria
            imagenes={[
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
              "https://images.unsplash.com/photo-1518770660439-4636190af475",
            ]}
          />

        </div>

        {/* DERECHA */}

        <div className="space-y-4">

          <ActivoValorCard
            costo={activo.costo}
          />

          <ActivoResponsableCard
            responsable={activo.responsable}
          />

          <ActivoUbicacionCard
            zonaOperativa={activo.zona}
            sede={activo.sede}
            unidadOperativa={activo.unidadOperativa}
          />

          <ActivoProyectoCard
            codigoProyecto={activo.codigoProyecto}
          />

        </div>

      </div>

      <ActivoTabs
        activo={activo}
      />

    </div>
  );

}