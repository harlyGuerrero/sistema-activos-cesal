import type { ReactNode } from "react"
import { BrowserRouter } from "react-router"

import { TooltipProvider } from "@/shared/ui/tooltip"
import { ThemeProvider } from "@/shared/components/theme-provider"

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="cesal-theme">
        <TooltipProvider delayDuration={200}>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}