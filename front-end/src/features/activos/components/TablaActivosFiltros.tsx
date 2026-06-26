"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/shared/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface TablaActivosFiltrosProps {
  search: string;
  categoria: string;
  estado: string;
  sede: string;

  onSearchChange: (value: string) => void;
  onCategoriaChange: (value: string) => void;
  onEstadoChange: (value: string) => void;
  onSedeChange: (value: string) => void;

  onClear: () => void;

  totalActivos: number;
}

export function TablaActivosFiltros({
  search,
  categoria,
  estado,
  sede,

  onSearchChange,
  onCategoriaChange,
  onEstadoChange,
  onSedeChange,

  onClear,

  totalActivos,
}: TablaActivosFiltrosProps) {
  return (
    <div
      className="
        rounded-2xl
        bg-card
        p-5
        shadow
      "
    >
      {/* HEADER */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Activos Patrimoniales</h2>

          <p className="text-sm text-muted-foreground">
            {totalActivos} activos encontrados
          </p>
        </div>
      </div>

      {/* FILTROS */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* BUSCADOR */}

        <div className="lg:col-span-2">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Buscar
          </label>

          <div className="relative">
            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
              placeholder="Nombre, código, factura..."
            />
          </div>
        </div>

        {/* CATEGORÍA */}

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Categoría
          </label>

          <Select value={categoria} onValueChange={onCategoriaChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Todas">Todas</SelectItem>

              <SelectItem value="Equipos Informáticos">
                Equipos Informáticos
              </SelectItem>

              <SelectItem value="Bienes Vehiculares">
                Bienes Vehiculares
              </SelectItem>

              <SelectItem value="Equipos de Oficina">
                Equipos de Oficina
              </SelectItem>

              <SelectItem value="Muebles de Oficina">
                Muebles de Oficina
              </SelectItem>

              <SelectItem value="Equipos de Maquinaria">
                Equipos de Maquinaria
              </SelectItem>

              <SelectItem value="Bienes Inmuebles">Bienes Inmuebles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ESTADO */}

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Estado
          </label>

          <Select value={estado} onValueChange={onEstadoChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>

              <SelectItem value="Disponible">Disponible</SelectItem>

              <SelectItem value="Asignado">Asignado</SelectItem>

              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>

              <SelectItem value="Baja">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* SEDE */}

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Sede
          </label>

          <Select value={sede} onValueChange={onSedeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Todas">Todas</SelectItem>

              <SelectItem value="San Isidro">San Isidro</SelectItem>

              <SelectItem value="Huachipa">Huachipa</SelectItem>

              <SelectItem value="Abancay">Abancay</SelectItem>

              <SelectItem value="Atalaya">Atalaya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* BOTÓN LIMPIAR */}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClear}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-blue-600
            hover:text-blue-700
          "
        >
          <X className="h-4 w-4" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
