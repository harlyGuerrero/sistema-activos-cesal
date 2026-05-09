import { BrowserRouter } from "react-router";

import AppRoutes from "@/app/routes/AppRoutes";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { ThemeProvider } from "./shared/components/theme-provider";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="cesal-theme">
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
