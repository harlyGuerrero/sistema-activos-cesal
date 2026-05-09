import type * as React from "react"
import { Link, useLocation } from "react-router"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavPrincipal({
  principal,
}: {
  principal: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-7 text-xs font-semibold uppercase tracking-wide
    text-slate-400
    dark:text-slate-500
    group-data-[collapsible=icon]:hidden">
        PRINCIPAL
      </SidebarGroupLabel>

      <SidebarMenu>
        {principal.map((item) => {
          const isActive =
            location.pathname === item.url ||
            location.pathname.startsWith(`${item.url}/`)

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className="
                  relative h-12 rounded-xl border-l-[7px] border-l-transparent px-5
  text-[15px] font-medium
  text-slate-600 transition-all duration-200

  hover:bg-slate-100 hover:text-blue-600

  dark:text-slate-400
  dark:hover:bg-slate-800
  dark:hover:text-blue-400

  data-[active=true]:border-l-blue-600
  data-[active=true]:bg-white
  data-[active=true]:text-blue-600
  data-[active=true]:font-semibold
  data-[active=true]:shadow-[0_1px_8px_rgba(0,0,0,0.08)]

  dark:data-[active=true]:border-l-blue-500
  dark:data-[active=true]:bg-slate-900
  dark:data-[active=true]:text-blue-400
  dark:data-[active=true]:shadow-none

  [&_svg]:size-6
  [&_svg]:shrink-0
  [&_svg]:text-slate-500

  dark:[&_svg]:text-slate-400

  data-[active=true]:[&_svg]:text-blue-600
  dark:data-[active=true]:[&_svg]:text-blue-400

  group-data-[collapsible=icon]:!h-10
  group-data-[collapsible=icon]:!w-10
  group-data-[collapsible=icon]:!p-0
  group-data-[collapsible=icon]:!border-l-[4px]
  group-data-[collapsible=icon]:mx-auto
  group-data-[collapsible=icon]:justify-center
  group-data-[collapsible=icon]:rounded-xl
                "
              >
                <Link to={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}