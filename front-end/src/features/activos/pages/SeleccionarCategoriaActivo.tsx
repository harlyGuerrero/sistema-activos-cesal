"use client";

import { useNavigate } from "react-router";

import {
  Car,
  Monitor,
  Presentation,
  Armchair,
  Wrench,
  Building2,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/ui/card";

const categorias = [
  {
    titulo: "Bienes Vehiculares",
    descripcion:
      "Registrar automóviles, camionetas, motocicletas y transporte institucional.",
    icono: Car,
    ruta: "/activos/nuevo/bienes-vehiculares",
    color: "bg-blue-100 text-blue-700",
  },

  {
    titulo: "Equipos Informáticos",
    descripcion:
      "Laptops, servidores, estaciones de trabajo y periféricos de alto rendimiento.",
    icono: Monitor,
    ruta: "/activos/nuevo/equipos-informaticos",
    color: "bg-[#005F9E] text-white",
  },

  {
    titulo: "Equipos de Oficina",
    descripcion:
      "Sistemas de audio, proyectores, cámaras y pantallas de vigilancia.",
    icono: Presentation,
    ruta: "/activos/nuevo/equipos-oficina",
    color: "bg-blue-100 text-blue-700",
  },

  {
    titulo: "Muebles de Oficina",
    descripcion:
      "Registrar escritorios, sillas ergonómicas, estanterías y mobiliario institucional.",
    icono: Armchair,
    ruta: "/activos/nuevo/muebles-oficina",
    color: "bg-yellow-300 text-yellow-900",
  },

  {
    titulo: "Equipos de Maquinaria",
    descripcion:
      "Equipos de mantenimiento, herramientas eléctricas y manuales.",
    icono: Wrench,
    ruta: "/activos/nuevo/equipos-maquinaria",
    color: "bg-amber-700 text-white",
  },

  {
    titulo: "Bienes Inmuebles",
    descripcion:
      "Estructuras modulares, casetas y elementos constructivos fijos.",
    icono: Building2,
    ruta: "/activos/nuevo/bienes-inmuebles",
    color: "bg-slate-200 text-slate-700",
  },
];

export default function SeleccionarCategoriaActivoPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="space-y-3">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Clasificación inicial del activo
          </h1>

          <p className="mt-3 max-w-3xl text-slate-500">
            Seleccione una categoría para iniciar el registro detallado.
            Este paso define la categoría patrimonial del activo para su
            posterior registro y control.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categorias.map((categoria) => {
          const Icon = categoria.icono;

          return (
            <Card
              key={categoria.titulo}
              onClick={() => navigate(categoria.ruta)}
              className="
                cursor-pointer
                rounded-3xl
                border
                border-slate-100
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#006BA6]
                hover:shadow-xl
              "
            >
              <CardContent className="flex h-full flex-col p-6">
                {/* Icono */}
                <div
                  className={`
                    mb-6
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${categoria.color}
                  `}
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* Título */}
                <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                  {categoria.titulo}
                </h3>

                {/* Descripción */}
                <p className="mb-8 flex-1 text-sm leading-6 text-slate-500">
                  {categoria.descripcion}
                </p>

                {/* Acción */}
                <div className="flex items-center gap-2 font-semibold text-[#006BA6]">
                  <span>Comenzar</span>

                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}