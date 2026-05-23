import type { LucideIcon } from "lucide-react";

import {
  Archive,
  CheckCircle2,
  IdCard,
  TrendingUp,
  TriangleAlert,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

type MetricVariant = "blue" | "green" | "blueLight" | "orange";

type DescriptionVariant = "success" | "muted" | "warning";

type DashboardMetric = {
  title: string;
  value: number;
  description: string;
  descriptionVariant: DescriptionVariant;
  icon: LucideIcon;
  variant: MetricVariant;
  showTrendIcon?: boolean;
  showWarningIcon?: boolean;
};

const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Total de activos",
    value: 13000,
    description: "+2.4% este mes",
    descriptionVariant: "success",
    icon: Archive,
    variant: "blue",
    showTrendIcon: true,
  },
  {
    title: "Activos disponibles",
    value: 6240,
    description: "48.0% del inventario",
    descriptionVariant: "muted",
    icon: CheckCircle2,
    variant: "green",
  },
  {
    title: "Activos asignados",
    value: 4810,
    description: "En uso activo",
    descriptionVariant: "muted",
    icon: IdCard,
    variant: "blueLight",
  },
  {
    title: "En mantenimiento",
    value: 1170,
    description: "Acción requerida",
    descriptionVariant: "warning",
    icon: Wrench,
    variant: "orange",
    showWarningIcon: true,
  },
];

const cardVariants: Record<
  MetricVariant,
  {
    border: string;
    iconBox: string;
  }
> = {
  blue: {
    border: "border-l-[#006BA6]",
    iconBox: "bg-blue-100 text-[#006BA6] dark:bg-blue-950",
  },
  green: {
    border: "border-l-emerald-500",
    iconBox: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950",
  },
  blueLight: {
    border: "border-l-blue-500",
    iconBox: "bg-blue-100 text-blue-500 dark:bg-blue-950",
  },
  orange: {
    border: "border-l-orange-400",
    iconBox: "bg-orange-100 text-orange-500 dark:bg-orange-950",
  },
};

const descriptionVariants: Record<DescriptionVariant, string> = {
  success: "text-emerald-600",
  muted: "text-slate-500 dark:text-slate-400",
  warning: "text-orange-500",
};

export function AssetsMetricCards() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {dashboardMetrics.map((metric) => {
        const Icon = metric.icon;
        const variant = cardVariants[metric.variant];

        return (
          <Card
            key={metric.title}
            className={cn(
              "overflow-hidden ring-0 rounded-2xl border-0 border-l-4 bg-white shadow-sm",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              "dark:bg-slate-950",
              variant.border,
            )}
          >
            <CardContent className="grid h-29.5 grid-rows-[auto_1fr_auto] px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500 dark:text-slate-400">
                    {metric.title}
                  </p>
                  <div className="flex items-center">
                    <h3 className="text-[30px] font-semibold leading-none tracking-[-0.02em] text-slate-950 dark:text-slate-400">
                      {metric.value.toLocaleString("en-US")}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      "mt-3 flex items-center gap-1 text-[12px] font-semibold",
                      descriptionVariants[metric.descriptionVariant],
                    )}
                  >
                    {metric.showTrendIcon && (
                      <TrendingUp className="h-3.5 w-3.5" />
                    )}

                    {metric.showWarningIcon && (
                      <TriangleAlert className="h-3.5 w-3.5" />
                    )}

                    <span>{metric.description}</span>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    variant.iconBox,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
