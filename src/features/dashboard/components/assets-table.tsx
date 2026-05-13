"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Laptop,
  Printer,
  Armchair,
  Car,
  Monitor,
  ChevronLeft,
  ChevronRight,
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

type Asset = {
  codigo: string;
  nombre: string;
  serie: string;
  categoria: string;
  sede: string;
  codigoProyecto: string;
  estado: "Disponible" | "Asignado" | "Mantenimiento" | "Baja";
  icon: React.ElementType;
};

const assets: Asset[] = [
  {
    codigo: "ACT-2023-001",
    nombre: 'MacBook Pro M2 14"',
    serie: "C02XG1",
    categoria: "Tecnología",
    sede: "Lima - Oficina 302",
    codigoProyecto: "PRY-EDU-001",
    estado: "Disponible",
    icon: Laptop,
  },
  {
    codigo: "ACT-2023-045",
    nombre: "Escritorio Ergonómico",
    serie: "XD-778",
    categoria: "Mobiliario",
    sede: "Cusco - Regional",
    codigoProyecto: "PRY-GOP-004",
    estado: "Asignado",
    icon: Armchair,
  },
  {
    codigo: "ACT-2022-112",
    nombre: "Toyota Hilux 2022",
    serie: "BCX-912",
    categoria: "Vehículos",
    sede: "Arequipa - Campo",
    codigoProyecto: "PRY-SAL-002",
    estado: "Mantenimiento",
    icon: Car,
  },
  {
    codigo: "ACT-2020-089",
    nombre: "Impresora Industrial",
    serie: "EP-7782",
    categoria: "Tecnología",
    sede: "Almacén Central",
    codigoProyecto: "PRY-ADM-010",
    estado: "Baja",
    icon: Printer,
  },
  {
    codigo: "ACT-2024-021",
    nombre: "Monitor Dell 27”",
    serie: "DL-8821",
    categoria: "Tecnología",
    sede: "Lima - Oficina 101",
    codigoProyecto: "PRY-EDU-003",
    estado: "Disponible",
    icon: Monitor,
  },
  {
    codigo: "ACT-2024-056",
    nombre: "Silla Ejecutiva",
    serie: "SE-1234",
    categoria: "Mobiliario",
    sede: "Huancayo - Operaciones",
    codigoProyecto: "PRY-OPE-005",
    estado: "Asignado",
    icon: Armchair,
  },
  {
    codigo: "ACT-2023-090",
    nombre: "Laptop Lenovo ThinkPad",
    serie: "LN-8820",
    categoria: "Tecnología",
    sede: "Apurímac - Regional",
    codigoProyecto: "PRY-TIC-008",
    estado: "Disponible",
    icon: Laptop,
  },
];

const badgeStyles = {
  Disponible: "bg-green-100 text-green-700",
  Asignado: "bg-blue-100 text-blue-700",
  Mantenimiento: "bg-yellow-100 text-yellow-700",
  Baja: "bg-red-100 text-red-700",
};

export function AssetsTable() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");
  const [sede, setSede] = useState("Todas");
  const [proyecto, setProyecto] = useState("Todos");

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.nombre.toLowerCase().includes(search.toLowerCase()) ||
        asset.codigo.toLowerCase().includes(search.toLowerCase()) ||
        asset.serie.toLowerCase().includes(search.toLowerCase());

      return (
        matchesSearch &&
        (categoria === "Todas" || asset.categoria === categoria) &&
        (estado === "Todos" || asset.estado === estado) &&
        (sede === "Todas" || asset.sede.includes(sede)) &&
        (proyecto === "Todos" || asset.codigoProyecto === proyecto)
      );
    });
  }, [search, categoria, estado, sede, proyecto]);
  const clearFilters = () => {
    setSearch("");
    setCategoria("Todas");
    setEstado("Todos");
    setSede("Todas");
    setProyecto("Todos");
  };
  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardContent className="p-4 md:p-6">
        {/* FILTROS */}
        <div className="mb-6 rounded-2xl bg-slate-50 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
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
            <div className="space-y-2 w-full"  >
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Categoría
              </label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger size={"sm"} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
                <SelectTrigger size={"sm"} className="w-full">
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

            {/* Sede */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sede
              </label>
              <Select value={sede} onValueChange={setSede}>
                <SelectTrigger size={"sm"} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas">Todas</SelectItem>
                  <SelectItem value="Lima">Lima</SelectItem>
                  <SelectItem value="Cusco">Cusco</SelectItem>
                  <SelectItem value="Arequipa">Arequipa</SelectItem>
                  <SelectItem value="Apurímac">Apurímac</SelectItem>
                  <SelectItem value="Huancayo">Huancayo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Código Proyecto */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Cod. Proyecto
              </label>
              <Select value={proyecto} onValueChange={setProyecto}>
                <SelectTrigger size={"sm"} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="PRY-EDU-001">PRY-EDU-001</SelectItem>
                  <SelectItem value="PRY-GOP-004">PRY-GOP-004</SelectItem>
                  <SelectItem value="PRY-SAL-002">PRY-SAL-002</SelectItem>
                  <SelectItem value="PRY-TIC-008">PRY-TIC-008</SelectItem>
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
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="p-4 text-left">Código</th>
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

                    <td>
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-slate-500" />
                        <div>
                          <p>{asset.nombre}</p>
                          <p className="text-xs text-slate-500">
                            {asset.serie}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{asset.categoria}</td>
                    <td>{asset.sede}</td>
                    <td>{asset.codigoProyecto}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${badgeStyles[asset.estado]}`}
                      >
                        {asset.estado}
                      </span>
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
                    <Icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{asset.nombre}</p>
                      <p className="text-xs text-slate-500">{asset.codigo}</p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${badgeStyles[asset.estado]}`}
                  >
                    {asset.estado}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-slate-600">
                  <p>
                    <strong>Categoría:</strong> {asset.categoria}
                  </p>
                  <p>
                    <strong>Sede:</strong> {asset.sede}
                  </p>
                  <p>
                    <strong>Proyecto:</strong> {asset.codigoProyecto}
                  </p>
                  <p>
                    <strong>Serie:</strong> {asset.serie}
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
