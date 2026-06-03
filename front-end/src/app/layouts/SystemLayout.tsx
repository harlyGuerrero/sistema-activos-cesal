import { Outlet, useLocation } from "react-router";
import { useMemo } from "react";

import { AppSidebar } from "@/shared/components/navigation/app-sidebar";
import { AppBreadcrumb } from "@/shared/components/navigation/app-breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";

import { Separator } from "@/shared/ui/separator";
import { useLastRoute } from "@/features/auth/hooks/useLastRoute";

export default function SystemLayout() {
   useLastRoute();
  const location = useLocation();

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbItems(location.pathname);
  }, [location.pathname]);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />

      <SidebarInset>
        <header
          className=" sticky top-0 z-40 flex h-16 shrink-0 items-center
        border-b border-slate-200 bg-white px-4
        dark:border-slate-800 dark:bg-[#111827]"
        >
          <div className="flex items-center gap-3">
            <SidebarTrigger
              className="h-9 w-9 rounded-lg border border-slate-200 bg-white
            text-[#006BA6] shadow-sm hover:bg-[#EAF6FB]

            dark:border-slate-700 dark:bg-slate-900
            dark:text-blue-400 dark:hover:bg-slate-800"
            />

            <Separator
              orientation="vertical"
              className="!self-auto mr-2 ml-2 h-4 bg-slate-300 dark:bg-slate-700"
            />

            <AppBreadcrumb items={breadcrumbItems} />
          </div>
        </header>

        <main
          className=" min-h-[calc(100vh-4rem)] p-6
        bg-[radial-gradient(circle_at_top_left,rgba(0,107,166,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(229,230,0,0.16),transparent_35%),linear-gradient(135deg,#f9fcff_0%,#f4f9fb_50%,#fffef4_100%)]

        dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#020617_100%)]"
        >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  activos: "Activos",
  crear: "Crear",
  movimientos: "Movimientos",
  reportes: "Reportes",
  sedes: "Sedes",
  usuarios: "Usuarios",
  configuracion: "Configuración",
};

export type BreadcrumbItemData = {
  label: string;
  href: string;
};

function getBreadcrumbItems(pathname: string): BreadcrumbItemData[] {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    return {
      href,
      label: routeLabels[segment] ?? formatSegmentLabel(segment),
    };
  });
}

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
