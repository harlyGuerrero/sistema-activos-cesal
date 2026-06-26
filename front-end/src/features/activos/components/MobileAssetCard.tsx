"use client";

import { Eye, Pencil, ArchiveX, ArchiveRestore } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

import type { ActivoListado } from "../types/activo-listado.type";

import { activoIcons } from "../constants/activo-icons";

import { badgeStyles, statusIcons } from "../constants/asset-status";

interface MobileAssetCardProps {
  asset: ActivoListado;

  onVer?: (asset: ActivoListado) => void;

  onEditar?: (asset: ActivoListado) => void;

  onDarBaja?: (asset: ActivoListado) => void;

  onDarAlta?: (asset: ActivoListado) => void;
}

export function MobileAssetCard({
  asset,
  onVer,
  onEditar,
  onDarBaja,
  onDarAlta,
}: MobileAssetCardProps) {
  const Icon = activoIcons[asset.tipoActivoId] ?? activoIcons[1];

  return (
    <Card
      className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          ring-0
          dark:border-slate-800
          dark:bg-slate-950
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between p-5">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Icon className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
              {asset.nombre}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {asset.codigoPatrimonial}
            </p>
          </div>
        </div>

        <div
          className={`
              flex
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${badgeStyles[asset.estado]}
            `}
        >
          {statusIcons[asset.estado]}
          <span>{asset.estado}</span>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="border-t border-slate-200 dark:border-slate-600" />
      {/* INFO */}

      <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Nro. Factura
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-500">
            {asset.numeroFactura}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Código Proveedor
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-500">
            {asset.codigoProveedor}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Categoría
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-500">
            {asset.categoria}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Sede
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-500">
            {asset.unidadOperativa}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Proyecto
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-500">
            {asset.codigoProyecto}
          </p>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="border-t border-slate-200 pt-4 pr-4 dark:border-slate-700">
        <div className="flex justify-end gap-2">
          <Button size="icon" variant="outline" onClick={() => onVer?.(asset)}>
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => onEditar?.(asset)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          {asset.estado !== "Baja" ? (
            <Button
              size="icon"
              variant="outline"
              onClick={() => onDarBaja?.(asset)}
            >
              <ArchiveX className="h-4 w-4 text-red-500" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="outline"
              onClick={() => onDarAlta?.(asset)}
            >
              <ArchiveRestore className="h-4 w-4 text-blue-500" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
