"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function NavOrganizacion({
  organizacion,
}: {
  organizacion: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const location = useLocation();
  return (
    <SidebarGroup className="">
      <SidebarGroupLabel className="text-zinc-400 px-7">
        ORGANIZACIÓN
      </SidebarGroupLabel>
      <SidebarMenu>
        {organizacion.map((item) => {
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}/`);
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                isActive={isActive}
                className="
                  relative h-12 rounded-xl border-l-[7px] border-l-transparent px-5
                  text-[15px] font-medium text-slate-600 transition-all duration-200

                  hover:bg-zinc-50 hover:text-blue-600

                  data-[active=true]:border-l-blue-600
                  data-[active=true]:bg-white
                  data-[active=true]:text-blue-600
                  data-[active=true]:font-semibold
                  data-[active=true]:shadow-[0_1px_8px_rgba(0,0,0,0.08)]

                  [&_svg]:size-6
                  [&_svg]:shrink-0
                  data-[active=true]:[&_svg]:text-blue-600

                  group-data-[collapsible=icon]:!h-10
                  group-data-[collapsible=icon]:!w-10
                  group-data-[collapsible=icon]:!p-0
                  group-data-[collapsible=icon]:!border-l-[4px]
                  group-data-[collapsible=icon]:mx-auto
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:gap-0
                  group-data-[collapsible=icon]:rounded-xl

                  group-data-[collapsible=icon]:[&>span]:hidden
                  group-data-[collapsible=icon]:[&_svg]:mx-auto
                  group-data-[collapsible=icon]:[&_svg]:size-5
                "
              >
                <Link to={item.url}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
