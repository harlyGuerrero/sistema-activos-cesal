import { Navigate, Route, Routes } from "react-router";

import SystemLayout from "@/app/layouts/SystemLayout";
import DashboardPage from "@/features/dashboard/pages/page";
import ActivosPage from "@/features/activos/pages/page";
import CrearActivo from "@/features/activos/pages/CrearActivo";
import LoginPage from "@/features/login/pages/LoginPage";
import CambiarContrasenia from "@/features/login/pages/CambiarContrasenia";
import ContraseniaActualizada from "@/features/login/pages/ContraseniaActualizada";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section>
      <p className="text-sm font-medium text-[#006BA6]">Módulo</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">
        {title}
      </h1>
      <p className="mt-1 text-slate-500">
        Esta página será desarrollada en la siguiente etapa del sistema.
      </p>
    </section>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas / acceso */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cambiar-contrasenia" element={<CambiarContrasenia />} />
      <Route path="/contrasenia-actualizada" element={<ContraseniaActualizada />} />

      {/* Rutas privadas del sistema */}
      <Route element={<SystemLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/activos" element={<ActivosPage />} />

        <Route path="/activos/crear" element={<CrearActivo />} />

        <Route
          path="/movimientos"
          element={<PlaceholderPage title="Historial de Movimientos" />}
        />
        <Route
          path="/reportes"
          element={<PlaceholderPage title="Reportes" />}
        />
        <Route
          path="/sedes"
          element={<PlaceholderPage title="Gestión de Sedes" />}
        />
        <Route
          path="/usuarios"
          element={<PlaceholderPage title="Gestión de Usuarios" />}
        />
        <Route
          path="/configuracion"
          element={<PlaceholderPage title="Configuración" />}
        />
      </Route>
    </Routes>
  );
}
