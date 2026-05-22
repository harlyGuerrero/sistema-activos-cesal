import { AppProviders } from "@/app/providers/AppProviders"
import AppRouter from "@/app/routes/AppRotes-v1"

function App() {
  return (
    <AppProviders>
      <AppRouter/>
    </AppProviders>
  )
}

export default App