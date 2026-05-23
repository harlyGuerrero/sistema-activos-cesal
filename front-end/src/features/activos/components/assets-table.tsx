"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { assets } from "../data/assets.mock";

import {
  badgeStyles,
  statusIcons,
} from "../constants/asset-status";


export function AssetsTable() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");
  const [sede, setSede] = useState("Todas");

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.nombre.toLowerCase().includes(search.toLowerCase()) ||
        asset.codigo.toLowerCase().includes(search.toLowerCase()) ||
        asset.codigoProyecto.toLowerCase().includes(search.toLowerCase()) ||
        asset.factura.toLowerCase().includes(search.toLowerCase());

      return (
        matchesSearch &&
        (categoria === "Todas" || asset.categoria === categoria) &&
        (estado === "Todos" || asset.estado === estado) &&
        (sede === "Todas" || asset.sede.includes(sede))
      );
    });
  }, [search, categoria, estado, sede]);
  const clearFilters = () => {
    setSearch("");
    setCategoria("Todas");
    setEstado("Todos");
    setSede("Todas");
  };
  return (
    <Card className="rounded-3xl border-none shadow-sm ring-0 dark:bg-slate-950">
      <CardContent className="p-4 md:p-6">
        <CardTitle className="text-[20px] font-semibold text-slate-800 dark:text-slate-400 pb-5">
          Activos Recientes
        </CardTitle>
        {/* FILTROS */}
        <div className="mb-6 rounded-2xl bg-slate-50 p-4 md:p-6 dark:bg-slate-900">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Búsqueda */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Búsqueda rápida
              </label>
              <Input
                placeholder="ID, Serie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2 w-full">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Categoría
              </label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger
                  size={"sm"}
                  className="w-full dark:text-slate-400"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:text-slate-400">
                  <SelectItem value="Todas">Todas</SelectItem>
                  <SelectItem value="Tecnología">Tecnología</SelectItem>
                  <SelectItem value="Mobiliario">Mobiliario</SelectItem>
                  <SelectItem value="Vehículos">Vehículos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Estado
              </label>
              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger
                  size={"sm"}
                  className="w-full dark:text-slate-400"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:text-slate-400">
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Asignado">Asignado</SelectItem>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sede */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sede
              </label>
              <Select value={sede} onValueChange={setSede}>
                <SelectTrigger
                  size={"sm"}
                  className="w-full dark:text-slate-400"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:text-slate-400">
                  <SelectItem value="Todas">Todas</SelectItem>
                  <SelectItem value="Lima">Lima</SelectItem>
                  <SelectItem value="Cusco">Cusco</SelectItem>
                  <SelectItem value="Arequipa">Arequipa</SelectItem>
                  <SelectItem value="Apurímac">Apurímac</SelectItem>
                  <SelectItem value="Huancayo">Huancayo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="text-xs uppercase dark:text-slate-400">
              <tr>
                <th className="p-4 text-left">Código</th>
                <th className="p-4 text-left">Nro. Factura</th>
                <th className="text-left">Activo</th>
                <th className="text-left">Categoría</th>
                <th className="text-left">Ubicación</th>
                <th className="text-left">Código Proyecto</th>
                <th className="text-left">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((asset) => {
                const Icon = asset.icon;

                return (
                  <tr key={asset.codigo} className="border-t">
                    <td className="p-4 font-medium text-blue-700">
                      {asset.codigo}
                    </td>
                    <td className="p-4 font-medium text-blue-700">
                      {asset.factura}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="dark:text-slate-400">{asset.nombre}</p>
                        </div>
                      </div>
                    </td>

                    <td className="dark:text-slate-400">{asset.categoria}</td>
                    <td className="dark:text-slate-400">{asset.sede}</td>
                    <td className="dark:text-slate-400">
                      {asset.codigoProyecto}
                    </td>

                    <td>
                      <div
                        className={`rounded-full flex w-max items-center gap-1.5 px-3 py-1 text-xs font-medium ${badgeStyles[asset.estado]}`}
                      >
                        {statusIcons[asset.estado]}
                        <span>{asset.estado}</span>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <Pencil className="h-4 w-4 text-blue-600" />
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="space-y-4 lg:hidden">
          {filteredAssets.map((asset) => {
            const Icon = asset.icon;

            return (
              <div key={asset.codigo} className="rounded-2xl border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-slate-400">
                        {asset.nombre}
                      </p>
                      <p className="text-xs text-slate-500">{asset.codigo}</p>
                    </div>
                  </div>

                  <div
                    className={`rounded-full flex items-center gap-1.5 px-3 py-1 text-xs font-medium ${badgeStyles[asset.estado]}`}
                  >
                    {statusIcons[asset.estado]}
                    <span>{asset.estado}</span>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <p>
                    <strong>Nro. Factura:</strong> {asset.proveedor}
                  </p>
                  <p>
                    <strong>Código Proveedor:</strong> {asset.proveedor}
                  </p>
                  <p>
                    <strong>Categoría:</strong> {asset.categoria}
                  </p>
                  <p>
                    <strong>Sede:</strong> {asset.sede}
                  </p>
                  <p>
                    <strong>Proyecto:</strong> {asset.codigoProyecto}
                  </p>
                </div>

                <div className="mt-4 flex gap-4">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <Pencil className="h-4 w-4 text-blue-600" />
                  <Trash2 className="h-4 w-4 text-red-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINACIÓN */}
        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
          <span>{filteredAssets.length} activos</span>

          <div className="flex gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>1</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
