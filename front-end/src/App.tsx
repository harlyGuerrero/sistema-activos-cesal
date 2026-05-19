import AppRoutes from "@/app/routes/AppRoutes"
import { AppProviders } from "@/app/providers/AppProviders"

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App