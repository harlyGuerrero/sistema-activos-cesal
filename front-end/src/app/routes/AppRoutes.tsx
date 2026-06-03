import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SystemLayout from "../layouts/SystemLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ActivosPage from "@/features/activos/pages/ActivosPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import CambiarContrasenia from "@/features/auth/pages/CambiarContrasenia";
import ContraseniaActualizada from "@/features/auth/pages/ContraseniaActualizada";
import ErrorPage from "../layouts/ErrorPage";
import SeleccionarCategoriaActivo from "@/features/activos/pages/SeleccionarCategoriaActivo";
import NuevoActivoInformatico from "@/features/activos/pages/categorias/NuevoActivoInformatico";

import ProtectedRoute from "./ProtectedRoute";
import { useAuthStore } from "@/features/auth/store/authStore";

interface GuestGuardProps {
  children: React.ReactNode;
}

function GuestGuard({ children }: GuestGuardProps) {
  const token = useAuthStore((state) => state.token);

  if (token) {
    const lastRoute = localStorage.getItem("lastRoute") || "/dashboard";

    return <Navigate to={lastRoute} replace />;
  }

  return children;
}

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

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

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/cambiar-contrasenia",
    element: <CambiarContrasenia />,
  },
  {
    path: "/contrasenia-actualizada",
    element: <ContraseniaActualizada />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthGuard>
          <SystemLayout />
        </AuthGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/activos",
        element: <ActivosPage />,
      },
      {
        path: "/activos/nuevo",
        element: <SeleccionarCategoriaActivo />,
      },
      {
        path: "/activos/nuevo/equipos-informaticos",
        element: <NuevoActivoInformatico />,
      },
      {
        path: "/movimientos",
        element: <PlaceholderPage title="Historial de Movimientos" />,
      },
      {
        path: "/reportes",
        element: <PlaceholderPage title="Reportes" />,
      },
      {
        path: "/sedes",
        element: <PlaceholderPage title="Gestión de Sedes" />,
      },
      {
        path: "/usuarios",
        element: <PlaceholderPage title="Gestión de Usuarios" />,
      },
      {
        path: "/configuracion",
        element: <PlaceholderPage title="Configuración" />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={Router} />;
}

export default AppRouter;
