"use client";

import * as React from "react";

import { NavPrincipal } from "@/components/nav-principal";
import { NavOrganizacion } from "@/components/nav-organizacion";
import { NavOperaciones } from "@/components/nav-operaciones";
import { NavAdministracion } from "@/components/nav-administracion";
import { NavUser } from "@/components/nav-user";
import { NavHeader } from "@/components/nav-header";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ArrowRightLeft,
  Archive,
  LayoutDashboard,
  Settings,
  ChartColumnStackedIcon,
  Building2,
  LucideUsers,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "Ángela Aliaga",
    email: "a.aliaga@cesal.org",
    avatar: "/avatars/shadcn.jpg",
  },

  principal: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Activos",
      url: "/activos",
      icon: <Archive />,
    },
    {
      title: "Movimientos",
      url: "/movimientos",
      icon: <ArrowRightLeft />,
    },
  ],
  organizacion: [
    {
      name: "Sedes",
      url: "/sedes",
      icon: <Building2 />,
    }
  ],
  operaciones: [
    {
      name: "Reportes",
      url: "/reportes",
      icon: <ChartColumnStackedIcon />,
    }
  ],
  administracion: [
    {
      name: "Usuarios",
      url: "/usuarios",
      icon: <LucideUsers />,
    },
    {
      name: "Configuración",
      url: "/configuracion",
      icon: <Settings />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-0">
        <NavPrincipal principal={data.principal}/>
        <NavOrganizacion organizacion={data.organizacion} />
        <NavOperaciones operaciones={data.operaciones} />
        <NavAdministracion administracion ={data.administracion} />
      </SidebarContent>
      <SidebarFooter className="px-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
