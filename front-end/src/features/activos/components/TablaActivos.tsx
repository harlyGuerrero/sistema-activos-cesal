"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ArchiveX,
  ArchiveRestore,
} from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { assets } from "../data/assets.mock";

import { badgeStyles, statusIcons } from "../constants/asset-status";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";

import { ModalBajaActivo } from "./ModalBajaActivo";
import { ModalAltaActivo } from "./ModalAltaActivo";

export function TablaActivos() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");
  const [sede, setSede] = useState("Todas");

  const [modalBajaOpen, setModalBajaOpen] = useState(false);

  const [activoSeleccionado, setActivoSeleccionado] = useState<Asset | null>(
    null,
  );

  const [modalAltaOpen, setModalAltaOpen] = useState(false);

  type Asset = {
    codigo: string;
    factura: string;
    proveedor: string;
    nombre: string;
    categoria: string;
    sede: string;
    codigoProyecto: string;
    estado: "Disponible" | "Asignado" | "Mantenimiento" | "Baja";
    icon: React.ElementType;
  };
  const abrirModalBaja = (asset: Asset) => {
    setActivoSeleccionado(asset);
    setModalBajaOpen(true);
  };
  const abrirModalAlta = (asset: Asset) => {
    setActivoSeleccionado(asset);
    setModalAltaOpen(true);
  };
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
        {/* DESKTOP TABLE */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="max-h-150 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
                  <TableRow className="border-slate-200 dark:border-slate-800">
                    <TableHead className="pl-6">Código</TableHead>
                    <TableHead>Nro. Factura</TableHead>
                    <TableHead>Activo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredAssets.map((asset) => {
                    const Icon = asset.icon;

                    return (
                      <TableRow
                        key={asset.codigo}
                        className="group border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/60"
                      >
                        {/* CÓDIGO */}
                        <TableCell className="pl-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-blue-700 dark:text-blue-400">
                              {asset.codigo}
                            </span>

                            <span className="text-xs text-slate-500">
                              {asset.factura}
                            </span>
                          </div>
                        </TableCell>

                        {/* FACTURA */}
                        <TableCell>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {asset.factura}
                          </span>
                        </TableCell>

                        {/* ACTIVO */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                              <Icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                            </div>

                            <div className="space-y-1">
                              <p className="font-medium text-slate-800 dark:text-slate-200">
                                {asset.nombre}
                              </p>

                              <p className="text-xs text-slate-500">
                                Cod. Prov: {asset.proveedor}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* CATEGORÍA */}
                        <TableCell>
                          <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {asset.categoria}
                          </div>
                        </TableCell>

                        {/* UBICACIÓN */}
                        <TableCell>
                          <div className="max-w-45">
                            <p className="truncate text-sm text-slate-700 dark:text-slate-300">
                              {asset.sede}
                            </p>
                          </div>
                        </TableCell>

                        {/* PROYECTO */}
                        <TableCell>
                          <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {asset.codigoProyecto}
                          </span>
                        </TableCell>

                        {/* ESTADO */}
                        <TableCell>
                          <div
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[asset.estado]}`}
                          >
                            {statusIcons[asset.estado]}
                            <span>{asset.estado}</span>
                          </div>
                        </TableCell>

                        {/* ACCIONES */}
                        <TableCell>
                          <div className="flex items-center justify-center gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-lg"
                            >
                              <Eye className="h-4 w-4 text-blue-600 dark:text-slate-300" />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-lg"
                            >
                              <Pencil className="h-4 w-4 text-blue-600" />
                            </Button>

                            {asset.estado !== "Baja" ? (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
                                onClick={() => abrirModalBaja(asset)}
                              >
                                <ArchiveX className="h-4 w-4 cursor-pointer text-red-500" />
                              </Button>
                            ) : (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950"
                                onClick={() => abrirModalAlta(asset)}
                              >
                                <ArchiveRestore className="h-4 w-4 cursor-pointer text-blue-600" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
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
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg"
                  >
                    <Eye className="h-4 w-4 text-blue-600 dark:text-slate-300" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg"
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  {asset.estado !== "Baja" ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => abrirModalBaja(asset)}
                    >
                      <ArchiveX className="h-4 w-4 cursor-pointer text-red-500" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950"
                      onClick={() => abrirModalAlta(asset)}
                    >
                      <ArchiveRestore className="h-4 w-4 cursor-pointer text-blue-600" />
                    </Button>
                  )}
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
        {activoSeleccionado && (
          <ModalBajaActivo
            isOpen={modalBajaOpen}
            onClose={() => {
              setModalBajaOpen(false);
              setActivoSeleccionado(null);
            }}
            activo={{
              codigo: activoSeleccionado.codigo,
              nombre: activoSeleccionado.nombre,
            }}
          />
        )}
        {activoSeleccionado && (
          <ModalAltaActivo
            isOpen={modalAltaOpen}
            onClose={() => setModalAltaOpen(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}
