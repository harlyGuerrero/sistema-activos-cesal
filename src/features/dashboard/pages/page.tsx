import { DashboardMetricCards } from "@/features/dashboard/components/DashboardMetricCards"
import { DashboardChartsSection } from "../components/DashboardChartsSection"

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <DashboardMetricCards />
      <DashboardChartsSection />
    </section>
  )
}