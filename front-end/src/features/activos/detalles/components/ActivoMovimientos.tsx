import { CalendarDays, Clock3, MapPin, User, ArrowRight } from "lucide-react";

import type { MovimientoActivo } from "../../types/movimientos.type";

import { movimientoConfig } from "../../constants/movimiento-config";

interface Props {
  movimientos: MovimientoActivo[];
}

export function ActivoMovimientos({ movimientos }: Props) {
  return (
    <div className="space-y-4">
      {movimientos.map((movimiento, index) => {
        const config = movimientoConfig[movimiento.tipo];

        const Icon = config.icon;

        return (
          <div key={movimiento.id} className="relative flex gap-6">
            {/* TIMELINE */}

            <div className="relative flex w-12 justify-center">
              {/* LINEA */}

              {index !== movimientos.length - 1 && (
                <div
                  className="
                      absolute
                      top-12
                      h-full
                      w-px
                      bg-slate-200
                      dark:bg-slate-700
                    "
                />
              )}

              {/* ICONO */}

              <div
                className={`
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-white
                    shadow-sm
                    ${config.iconBg}
                  `}
              >
                <Icon
                  className={`
                      h-5
                      w-5
                      ${config.iconColor}
                    `}
                />
              </div>
            </div>

            {/* CARD */}

            <div
              className="
                  flex-1
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  hover:shadow-md
                  dark:border-slate-800
                  dark:bg-slate-950
                "
            >
              {/* HEADER */}

              <div className="flex items-start gap-5">
                {/* ICONO GRANDE */}

                {/* <div
                  className={`
                      hidden
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      md:flex
                      ${config.iconBg}
                    `}
                >
                  <Icon
                    className={`
                        h-7
                        w-7
                        ${config.iconColor}
                      `}
                  />
                </div> */}

                {/* CONTENIDO */}

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className="
                          text-xl
                          font-semibold
                          text-slate-900
                          dark:text-slate-100
                        "
                    >
                      {movimiento.titulo}
                    </h3>

                    <span
                      className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${config.badge}
                        `}
                    >
                      {movimiento.badge}
                    </span>
                  </div>

                  <p
                    className="
                        mt-2
                        text-sm
                        text-slate-600
                        dark:text-slate-400
                      "
                  >
                    {movimiento.descripcion}
                  </p>

                  {/* DIVIDER */}

                  <div
                    className="
                        my-5
                        border-t
                        border-slate-100
                        dark:border-slate-800
                      "
                  />

                  {/* METADATA */}

                  <div
                    className="
                        grid
                        gap-4
                        md:grid-cols-4
                      "
                  >
                    {/* USUARIO */}

                    <div className="flex gap-3">
                      <User
                        className="
                            mt-0.5
                            h-4
                            w-4
                            text-slate-500
                          "
                      />

                      <div>
                        <p
                          className="
                              text-sm
                              font-medium
                            "
                        >
                          {movimiento.usuario}
                        </p>

                        <p
                          className="
                              text-xs
                              text-slate-500
                            "
                        >
                          {movimiento.cargo}
                        </p>
                      </div>
                    </div>

                    {/* FECHA */}

                    <div className="flex gap-3">
                      <CalendarDays
                        className="
                            mt-0.5
                            h-4
                            w-4
                            text-slate-500
                          "
                      />

                      <div>
                        <p
                          className="
                              text-sm
                              font-medium
                            "
                        >
                          {movimiento.fecha}
                        </p>

                        <p
                          className="
                              text-xs
                              text-slate-500
                            "
                        >
                          Fecha
                        </p>
                      </div>
                    </div>

                    {/* HORA */}

                    <div className="flex gap-3">
                      <Clock3
                        className="
                            mt-0.5
                            h-4
                            w-4
                            text-slate-500
                          "
                      />

                      <div>
                        <p
                          className="
                              text-sm
                              font-medium
                            "
                        >
                          {movimiento.hora}
                        </p>

                        <p
                          className="
                              text-xs
                              text-slate-500
                            "
                        >
                          Hora
                        </p>
                      </div>
                    </div>

                    {/* DETALLE */}

                    <div className="flex gap-3">
                      <MapPin
                        className="
                            mt-0.5
                            h-4
                            w-4
                            text-slate-500
                          "
                      />

                      <div>
                        {movimiento.tipo === "Traslado" ? (
                          <>
                            <div
                              className="
                                  flex
                                  items-center
                                  gap-5
                                  text-sm
                                  font-medium
                                "
                            >
                              <span>{movimiento.detalle1}</span>

                              <ArrowRight className="h-4 w-4" />

                              <span>{movimiento.detalle2}</span>
                            </div>

                            
                          </>
                        ) : (
                          <>
                            <p
                              className="
                                  text-sm
                                  font-medium
                                "
                            >
                              {movimiento.detalle1}
                            </p>

                            <p
                              className="
                                  text-xs
                                  text-slate-500
                                "
                            >
                              {movimiento.detalle2}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
