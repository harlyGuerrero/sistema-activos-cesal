import { Moon, Sun } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Switch } from "@/shared/ui/switch"
import { useTheme } from "@/app/providers/ThemeProvider"

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === "dark"

  return (
    <>
      {/* Vista completa cuando el sidebar está abierto */}
      <div
        className="
          flex h-14 items-center justify-between rounded-2xl
          bg-slate-100 px-5 text-slate-600
          dark:bg-slate-800 dark:text-slate-200

          group-data-[collapsible=icon]:hidden
        "
      >
        <div className="flex items-center gap-3">
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}

          <span className="text-sm font-semibold">
            Modo Oscuro
          </span>
        </div>

        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          aria-label="Cambiar modo oscuro"
        />
      </div>

      {/* Vista colapsada: solo ícono */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Cambiar modo oscuro"
        className="
          hidden h-10 w-10 rounded-xl text-slate-500
          hover:bg-slate-100 hover:text-blue-600
          dark:text-slate-300 dark:hover:bg-slate-800

          group-data-[collapsible=icon]:flex
        "
      >
        {isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </>
  )
}