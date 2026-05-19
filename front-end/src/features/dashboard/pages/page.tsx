import { AssetsMetricCards } from "@/features/dashboard/components/AssetsMetricCards";
import { AssetsBarChart } from "../components/AssetsBarChart";
import { AssetsStatusChart } from "../components/AssetsStatusChart";
import { AssetsTable } from "../components/AssetsTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <AssetsMetricCards />
      </section>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <AssetsBarChart />
        <div className="rounded-2xl shadow-sm">
          <AssetsStatusChart />
        </div>
      </section>
      <section>
        <AssetsTable />
      </section>
    </div>
  );
}
