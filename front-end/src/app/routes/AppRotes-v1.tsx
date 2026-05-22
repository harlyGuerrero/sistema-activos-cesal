import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SystemLayout from "../layouts/SystemLayout";
import DashboardPage from "@/features/dashboard/pages/page";
import ActivosPage from "@/features/activos/pages/page";
import CrearActivo from "@/features/activos/pages/CrearActivo";
import LoginPage from "@/features/login/pages/LoginPage";
import CambiarContrasenia from "@/features/login/pages/CambiarContrasenia";
import ContraseniaActualizada from "@/features/login/pages/ContraseniaActualizada";
import ErrorPage from "../layouts/ErrorPage";

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
    element: <LoginPage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  },
  {
    path: "/cambiar-contrasenia",
    element: <CambiarContrasenia/>
  },
  {
path: "/contrasenia-actualizada",
element: <ContraseniaActualizada/>
  },

  {
    path: "/",
    element: <SystemLayout />,
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
            path: "/activos/crear",
            element: <CrearActivo />,
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
