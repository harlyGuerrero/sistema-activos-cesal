import type { ColumnDef } from "@tanstack/react-table";

import {
  Eye,
  Pencil,
  ArchiveX,
  ArchiveRestore,
} from "lucide-react";

import { Button } from "@/shared/ui/button";

import type { ActivoListado } from "../types/activo-listado.type";

import { activoIcons } from "../constants/activo-icons";

import {
  badgeStyles,
  statusIcons,
} from "../constants/asset-status";
import type { TablaActivosActions } from "../types/tabla-activos-actions.type";

export function getActivosColumns(
  actions: TablaActivosActions
): ColumnDef<ActivoListado>[] {
    return [
  // ==========================================
  // CÓDIGO
  // ==========================================
  {
    accessorKey: "codigoPatrimonial",

    header: () => (
      <div className="">
        Código
      </div>
    ),

    size: 180,
    cell: ({ row }) => {
      const asset = row.original;

      return (
        <div className="flex flex-col pl-4">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {asset.codigoPatrimonial}
          </span>
          
          {/* <span className="text-xs text-slate-500">
            {asset.numeroFactura}
          </span> */}
        </div>
      );
    },
  },
   // ==========================================
  // FACTURA
  // ==========================================
{
  accessorKey: "numeroFactura",

  header: "Factura",

  size: 180,

  cell: ({ row }) => (
    <span
      className="
        text-sm
        font-medium
        text-slate-700
        dark:text-slate-300
      "
    >
      {row.original.numeroFactura}
    </span>
  ),
},
  

// ==========================================
  // ACTIVO
  // ==========================================  
  {
    accessorKey: "nombre",

    header: "Nombre de Activo",

    size: 320,

    cell: ({ row }) => {
      const asset = row.original;

      const Icon =
        activoIcons[asset.tipoActivoId] ??
        activoIcons[1];

      return (
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-100
              dark:bg-slate-800
            "
          >
            <Icon
              className="
                h-5
                w-5
                text-slate-600
                dark:text-slate-300
              "
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                font-medium
                text-slate-900
                dark:text-slate-100
              "
            >
              {asset.nombre}
            </p>

            <p className="text-xs text-slate-500">
              Cod. Prov: {asset.codigoProveedor}
            </p>
          </div>
        </div>
      );
    },
  },



  // ==========================================
  // CATEGORÍA
  // ==========================================
  {
    accessorKey: "categoria",

    header: "Categoría",

    size: 220,

    cell: ({ row }) => (
      <span
        className="
          inline-flex
          rounded-full
          bg-slate-100
          px-3
          py-1
          text-xs
          font-medium
          text-slate-700
          dark:bg-slate-800
          dark:text-slate-300
        "
      >
        {row.original.categoria}
      </span>
    ),
  },

  // ==========================================
  // UBICACIÓN
  // ==========================================
  {
    accessorKey: "sede",

    header: "Ubicación",

    size: 220,

    cell: ({ row }) => {
      const asset = row.original;

      return (
        <div>
          <p className="font-medium">
            {asset.sede} - {asset.unidadOperativa}
          </p>

          <p className="text-xs text-slate-500">
            {asset.ambiente}
          </p>
        </div>
      );
    },
  },
// ==========================================
  // RESPONSABLE
  // ==========================================
{
  id: "responsable",

  header: "Responsable",

  size: 280,

  cell: ({ row }) => {
    const responsable =
      row.original.responsable;

    

    return (
      <div className="space-y-1">
        <p className="font-medium text-slate-900 dark:text-slate-100">
          {responsable.nombre}
        </p>
        <p className="text-xs text-slate-400">
          {responsable.correo}
        </p>
      </div>
    );
  },
},

  // ==========================================
  // PROYECTO
  // ==========================================
  {
    accessorKey: "codigoProyecto",

    header: "Proyecto",

    size: 180,

    cell: ({ row }) => (
      <span
        className="
          rounded-lg
          bg-blue-50
          px-3
          py-1
          text-xs
          font-medium
          text-blue-700
          dark:bg-blue-950
          dark:text-blue-300
        "
      >
        {row.original.codigoProyecto}
      </span>
    ),
  },

  // ==========================================
  // ESTADO
  // ==========================================
  {
    accessorKey: "estado",

    header: "Estado",

    size: 180,

    cell: ({ row }) => {
      const estado = row.original.estado;

      return (
        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${badgeStyles[estado]}
          `}
        >
          {statusIcons[estado]}

          <span>{estado}</span>
        </div>
      );
    },
  },

  // ==========================================
  // ACCIONES
  // ==========================================
  {
  id: "acciones",

  header: () => (
    <div className="text-center">
      Acciones
    </div>
  ),

  size: 160,

  cell: ({ row }) => {
    const asset = row.original;

    return (
      <div className="flex items-center justify-center gap-1 pr-4">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-lg"
          onClick={() =>
            actions.onVer?.(asset)
          }
        >
          <Eye className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-lg"
          onClick={() =>
            actions.onEditar?.(asset)
          }
        >
          <Pencil className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        </Button>

        {asset.estado !== "Baja" ? (
          <Button
            size="icon"
            variant="ghost"
            className="
              h-8
              w-8
              rounded-lg
              hover:bg-red-50
              dark:hover:bg-red-950
            "
            onClick={() =>
              actions.onDarBaja?.(asset)
            }
          >
            <ArchiveX className="h-4 w-4 text-red-500" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="
              h-8
              w-8
              rounded-lg
              hover:bg-blue-50
              dark:hover:bg-blue-950
            "
            onClick={() =>
              actions.onDarAlta?.(asset)
            }
          >
            <ArchiveRestore className="h-4 w-4 text-blue-500" />
          </Button>
        )}
      </div>
    );
  },
},
];
}