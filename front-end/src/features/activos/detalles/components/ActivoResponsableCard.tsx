"use client";

import {
  UserRound,
  Mail,
  Briefcase,
} from "lucide-react";

interface Responsable {
  nombre: string;
  correo: string;
  cargo: string;
}

interface ActivoResponsableCardProps {
  responsable: Responsable;
}

export function ActivoResponsableCard({
  responsable,
}: ActivoResponsableCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border-l-9
        border-blue-700
        bg-white
        p-5
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* TÍTULO */}

      <div className="mb-4 flex items-center gap-2">

        <h3
          className="
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Responsable Actual
        </h3>
      </div>

      {/* PERFIL */}

      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-blue-100
            dark:bg-blue-950
          "
        >
          <UserRound className="h-6 w-6 text-blue-600" />
        </div>

        <div className="min-w-0">
          <h2
            className="
              font-semibold
              text-slate-900
              dark:text-slate-100
            "
          >
            {responsable.nombre}
          </h2>

          <div className="flex items-center gap-2">
            <Briefcase className="h-3 w-3 text-slate-400" />

            <span className="text-sm text-slate-500">
              {responsable.cargo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-slate-400" />

            <span
              className="
                text-sm
                text-slate-500
                break-all
              "
            >
              {responsable.correo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}