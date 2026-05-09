import { BrowserRouter } from "react-router";

import AppRoutes from "@/routes/AppRoutes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";

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
