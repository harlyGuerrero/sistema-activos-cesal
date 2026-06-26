"use client";

import { useMemo, useState } from "react";

// import { activosListado } from "../mappers/activo.mapper";
import { useActivos } from "../hooks/useActivos";

import { getActivosColumns } from "../columns/activos-columns";

import { DataTable } from "./DataTable";
import { TablaActivosFiltros } from "./TablaActivosFiltros";
import type { ActivoListado } from "../types/activo-listado.type";
import { ModalAltaActivo } from "./ModalAltaActivo";

import { ModalBajaActivo } from "./ModalBajaActivo";
import { MobileAssetCard } from "./MobileAssetCard";
import { useNavigate } from "react-router";

export function TablaActivos() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");
  const [sede, setSede] = useState("Todas");

  const [activoSeleccionado, setActivoSeleccionado] =
    useState<ActivoListado | null>(null);
  const [modalAltaOpen, setModalAltaOpen] = useState(false);
  const [modalBajaOpen, setModalBajaOpen] = useState(false);

  const navigate = useNavigate();

  const { activos, loading, error } = useActivos();

  // const verDetalle = (activo: ActivoListado) => {
  //   navigate(`/activos/${activo.codigoPatrimonial.toLocaleUpperCase()}`);
  // };
  const verDetalle = (activo: ActivoListado) => {
  navigate(
    `/activos/${activo.codigoPatrimonial.toUpperCase()}`,
    {
      state: {
        activo,
      },
    },
  );
};

  const abrirModalAlta = (activo: ActivoListado) => {
    setActivoSeleccionado(activo);

    setModalAltaOpen(true);
  };

  const abrirModalBaja = (activo: ActivoListado) => {
    setActivoSeleccionado(activo);

    setModalBajaOpen(true);
  };
  const columns = useMemo(
    () =>
      getActivosColumns({
        onDarAlta: abrirModalAlta,

        onDarBaja: abrirModalBaja,

        onVer: verDetalle,

        onEditar: (activo) => {
          console.log("EDITAR", activo);
        },
      }),
    [],
  );
  const filteredAssets = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return activos.filter((asset) => {
      const matchesSearch =
        asset.nombre.toLowerCase().includes(searchTerm) ||
        asset.codigoPatrimonial.toLowerCase().includes(searchTerm) ||
        asset.numeroFactura.toLowerCase().includes(searchTerm) ||
        asset.codigoProyecto.toLowerCase().includes(searchTerm);

      return (
        matchesSearch &&
        (categoria === "Todas" || asset.categoria === categoria) &&
        (estado === "Todos" || asset.estado === estado) &&
        (sede === "Todas" || asset.sede === sede)
      );
    });
  }, [activos, search, categoria, estado, sede]);

  const clearFilters = () => {
    setSearch("");
    setCategoria("Todas");
    setEstado("Todos");
    setSede("Todas");
  };
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Cargando activos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="space-y-6 p-8 bg-white dark:bg-slate-950 rounded-2xl shadow">
      {/* FILTROS */}

      <TablaActivosFiltros
        search={search}
        categoria={categoria}
        estado={estado}
        sede={sede}
        totalActivos={filteredAssets.length}
        onSearchChange={setSearch}
        onCategoriaChange={setCategoria}
        onEstadoChange={setEstado}
        onSedeChange={setSede}
        onClear={clearFilters}
      />

      {/* TABLA */}

      <DataTable columns={columns} data={filteredAssets} />

      <ModalAltaActivo
        isOpen={modalAltaOpen}
        onClose={() => {
          setModalAltaOpen(false);
          setActivoSeleccionado(null);
        }}
        activo={activoSeleccionado}
      />

      <ModalBajaActivo
        isOpen={modalBajaOpen}
        onClose={() => {
          setModalBajaOpen(false);
          setActivoSeleccionado(null);
        }}
        activo={activoSeleccionado}
      />

      <div className="space-y-8 md:hidden">
        {filteredAssets.map((asset) => (
          <MobileAssetCard
            key={asset.id}
            asset={asset}
            onDarAlta={abrirModalAlta}
            onDarBaja={abrirModalBaja}
            onVer={verDetalle}
            onEditar={(activo) => console.log("EDITAR", activo)}
          />
        ))}
      </div>
    </div>
  );
}
