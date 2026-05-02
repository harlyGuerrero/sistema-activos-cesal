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
      <SidebarGroupLabel className="text-zinc-400 px-7">
        PRINCIPAL
      </SidebarGroupLabel>

      <SidebarMenu className="gap-1">
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
                  relative h-12 rounded-1x1 px-5 text-[15px] font-medium
                  text-slate-600 transition-all duration-200
                  border-l-7 border-l-transparent

                  hover:bg-zinc-50 hover:text-primary

                  data-[active=true]:bg-white
                  data-[active=true]:text-blue-600
                  data-[active=true]:shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                  data-[active=true]:font-semibold
                  data-[active=true]:border-l-blue-600

                  [&_svg]:size-6
                  [&_svg]:shrink-0
                  data-[active=true]:[&_svg]:text-blue-600
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