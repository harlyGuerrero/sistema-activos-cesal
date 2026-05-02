import { BrowserRouter } from "react-router"

import AppRoutes from "@/routes/AppRoutes"
import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App