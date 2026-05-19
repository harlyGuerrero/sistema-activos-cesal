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
  CheckCircle2,
  Circle,
  AlertTriangle,
  XCircle,
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
  factura: string;
  proveedor: string;
  nombre: string;
  categoria: string;
  sede: string;
  codigoProyecto: string;
  estado: "Disponible" | "Asignado" | "Mantenimiento" | "Baja";
  icon: React.ElementType;
};

const assets: Asset[] = [
  {
    codigo: "ACT-2023-001",
    proveedor: "S2011523267",
    factura: "F001-0005620",
    nombre: 'MacBook Pro M2 14"',
    categoria: "Tecnología",
    sede: "Lima - Oficina 302",
    codigoProyecto: "PRY-EDU-001",
    estado: "Disponible",
    icon: Laptop,
  },
  {
    codigo: "ACT-2023-045",
    proveedor: "50653",
    factura: "F001-0008620",
    nombre: "Escritorio Ergonómico",
    categoria: "Mobiliario",
    sede: "Cusco - Regional",
    codigoProyecto: "PRY-GOP-004",
    estado: "Asignado",
    icon: Armchair,
  },
  {
    codigo: "ACT-2022-112",
    proveedor: "968947",
    factura: "F001-0009920",
    nombre: "Toyota Hilux 2022",
    categoria: "Vehículos",
    sede: "Arequipa - Campo",
    codigoProyecto: "PRY-SAL-002",
    estado: "Mantenimiento",
    icon: Car,
  },
  {
    codigo: "ACT-2020-089",
    proveedor: "50651",
    factura: "F001-0006920",
    nombre: "Impresora Industrial",
    categoria: "Tecnología",
    sede: "Almacén Central",
    codigoProyecto: "PRY-ADM-010",
    estado: "Baja",
    icon: Printer,
  },
  {
    codigo: "ACT-2024-021",
    proveedor: "50698",
    factura: "F001-0009620",
    nombre: "Monitor Dell 27”",
    categoria: "Tecnología",
    sede: "Lima - Oficina 101",
    codigoProyecto: "PRY-EDU-003",
    estado: "Disponible",
    icon: Monitor,
  },
  {
    codigo: "ACT-2024-056",
    proveedor: "50690",
    factura: "F001-0008920",
    nombre: "Silla Ejecutiva",
    categoria: "Mobiliario",
    sede: "Huancayo - Operaciones",
    codigoProyecto: "PRY-OPE-005",
    estado: "Asignado",
    icon: Armchair,
  },
  {
    codigo: "ACT-2023-090",
    proveedor: "50660",
    factura: "F001-0003620",
    nombre: "Laptop Lenovo ThinkPad",
    categoria: "Tecnología",
    sede: "Apurímac - Regional",
    codigoProyecto: "PRY-TIC-008",
    estado: "Disponible",
    icon: Laptop,
  },
];

const badgeStyles: Record<Asset["estado"], string> = {
  Disponible: "bg-green-100 text-green-700 dark:bg-green-950",
  Asignado: "bg-blue-100 text-blue-700 dark:bg-blue-950",
  Mantenimiento: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950",
  Baja: "bg-red-100 text-red-700 dark:bg-red-950",
};
const statusIcons: Record<Asset["estado"], React.ReactNode> = {
  Disponible: (
    <CheckCircle2 className="h-3 w-3 text-green-500 fill-green-500" />
  ),
  Asignado: <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />,
  Mantenimiento: <AlertTriangle className="h-3 w-3 text-amber-500" />,
  Baja: <XCircle className="h-3 w-3 text-red-500" />,
};
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
                <SelectTrigger size={"sm"} className="w-full dark:text-slate-400">
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
                <SelectTrigger size={"sm"} className="w-full dark:text-slate-400">
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
                <SelectTrigger size={"sm"} className="w-full dark:text-slate-400">
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
                    <td className="dark:text-slate-400">{asset.codigoProyecto}</td>

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
                      <p className="font-medium dark:text-slate-400">{asset.nombre}</p>
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
