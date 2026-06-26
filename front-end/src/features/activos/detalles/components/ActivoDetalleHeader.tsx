"use client";

import { Download, Pencil } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { badgeStyles, statusIcons } from "../../constants/asset-status";

import type { AssetStatus } from "../../constants/asset-status";

interface ActivoDetalleHeaderProps {
  nombre: string;


  estado: AssetStatus;

  onBack?: () => void;

  onEdit?: () => void;

  onDownload?: () => void;
}

export function ActivoDetalleHeader({
  nombre,
  estado,
  onEdit,
  onDownload,
}: ActivoDetalleHeaderProps) {
  return (
    <div className="space-y-6">
      <div
        className="
          flex
          flex-col
          gap-6
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-950

          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >
        {/* IZQUIERDA */}

        <div className="flex items-center gap-5 space-y-4 ">
          

          <div className="m-0">
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-slate-100
              "
            >
              {nombre}
            </h1>
          </div>

          <div
            className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              ${badgeStyles[estado]}
            `}
          >
            {statusIcons[estado]}

            <span>{estado}</span>
          </div>
        </div>

        {/* DERECHA */}

        <div className="flex gap-3">
          <Button className="bg-white text-slate-900 shadow"  onClick={onDownload}>
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>

          <Button onClick={onEdit} className="bg-blue-700">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}
