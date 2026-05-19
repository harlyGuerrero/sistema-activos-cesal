"use client";

import * as React from "react";

import { NavUser } from "@/shared/components/nav-user";
import { NavHeader } from "@/shared/components/nav-header";
import { DarkModeToggle } from "@/shared/components/dark-mode-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/ui/sidebar";
import {
  ArrowRightLeft,
  Archive,
  LayoutDashboard,
  Settings,
  ChartColumnStackedIcon,
  Building2,
  LucideUsers,
} from "lucide-react";

import { SidebarNavSection } from "@/shared/components/sidebar-nav-section";

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
      title: "Sedes",
      url: "/sedes",
      icon: <Building2 />,
    },
  ],
  operaciones: [
    {
      title: "Reportes",
      url: "/reportes",
      icon: <ChartColumnStackedIcon />,
    },
  ],
  administracion: [
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: <LucideUsers />,
    },
    {
      title: "Configuración",
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
        <SidebarNavSection label="Principal" items={data.principal} />
        <SidebarNavSection label="Organización" items={data.organizacion} />
        <SidebarNavSection label="Operaciones" items={data.operaciones} />
        <SidebarNavSection label="Administración" items={data.administracion} />
      </SidebarContent>
      <SidebarFooter
        className="gap-3 px-3 pb-4
    group-data-[collapsible=icon]:items-center
    group-data-[collapsible=icon]:px-0"
      >
        <DarkModeToggle />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
