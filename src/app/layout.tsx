import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  activos: "Activos",
  movimientos: "Movimientos",
  reportes: "Reportes",
  sedes: "Sedes",
  usuarios: "Usuarios",
  configuracion: "Configuración",
};

function getBreadcrumbItems(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => ({
      path: segment,
      label: routeLabels[segment] ?? segment,
    }));
}

export default function SystemLayout() {
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);

  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-[#006BA6] shadow-sm hover:bg-[#EAF6FB]" />
            <Separator orientation="vertical" className="!self-auto mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList className="flex items-center gap-2">
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;

                  const href =
                    "/" +
                    breadcrumbItems
                      .slice(0, index + 1)
                      .map((breadcrumb) => breadcrumb.path)
                      .join("/");

                  return (
                    <Fragment key={href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="font-semibold text-[#006BA6]">
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link
                              to={href}
                              className="text-slate-500 hover:text-[#006BA6]"
                            >
                              {item.label}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>

                      {!isLast && (
                        <BreadcrumbSeparator className="flex items-center justify-center text-slate-300 [&>svg]:size-4" />
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="min-h-screen bg-[#F4FAFB] p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
