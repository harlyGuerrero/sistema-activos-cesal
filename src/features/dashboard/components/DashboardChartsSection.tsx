import { AssetsTable } from "./assets-table";
import { AssetDistributionChart } from "./AssetsBySedeBarChart";
import { AssetStatusChart } from "./AssetsStatusChart";

export function DashboardChartsSection() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <AssetDistributionChart />

        <div className="rounded-2xl bg-white shadow-sm">
          <AssetStatusChart />
        </div>
      </section>
      <section>
        <AssetsTable />
      </section>
    </div>
  );
}
