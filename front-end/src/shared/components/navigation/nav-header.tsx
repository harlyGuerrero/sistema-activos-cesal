import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import { Link } from "react-router";

import logoCesal from "@/assets/logo.svg";
import logoCollapsed from "@/assets/logo-collapsed.png";

export function NavHeader() {
  return (
    <SidebarMenu className="px-2 py-2 group-data-[collapsible=icon]:px-0">
      <SidebarMenuItem className="flex justify-center">
        <SidebarMenuButton
          asChild
          size="lg"
          className="
            h-16 w-full rounded-xl p-0
            hover:bg-transparent

            group-data-[collapsible=icon]:!h-12
            group-data-[collapsible=icon]:!w-12
            group-data-[collapsible=icon]:!p-0
            group-data-[collapsible=icon]:rounded-full
          "
        >
          <Link
            to="/dashboard"
            className="
              flex h-full w-full items-center justify-center
              rounded-xl
              group-data-[collapsible=icon]:rounded-full
            "
          >
            {/* Logo completo cuando el sidebar está abierto */}
            <img
              src={logoCesal}
              alt="Logo CESAL"
              className="
                h-12 w-full object-contain
                group-data-[collapsible=icon]:hidden
              "
            />

            {/* Logo circular cuando el sidebar está colapsado */}
            <img
              src={logoCollapsed}
              alt="Logo CESAL"
              className="
                hidden h-10 w-10 rounded-full object-contain
                group-data-[collapsible=icon]:block
              "
            />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
