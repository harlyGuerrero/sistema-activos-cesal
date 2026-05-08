import { Outlet, useLocation } from "react-router"
import { useMemo } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { AppBreadcrumb } from "@/components/app-breadcrumb"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"

export default function SystemLayout() {
  const location = useLocation()

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbItems(location.pathname)
  }, [location.pathname])

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-[#006BA6] shadow-sm hover:bg-[#EAF6FB]" />

            <Separator orientation="vertical" className="!self-auto mr-2 h-4" />

            <AppBreadcrumb items={breadcrumbItems} />
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] bg-[#F4FAFB] p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  activos: "Activos",
  editar: "Editar",
  movimientos: "Movimientos",
  reportes: "Reportes",
  sedes: "Sedes",
  usuarios: "Usuarios",
  configuracion: "Configuración",
}

export type BreadcrumbItemData = {
  label: string
  href: string
}

function getBreadcrumbItems(pathname: string): BreadcrumbItemData[] {
  const segments = pathname.split("/").filter(Boolean)

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")

    return {
      href,
      label: routeLabels[segment] ?? formatSegmentLabel(segment),
    }
  })
}

function formatSegmentLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}