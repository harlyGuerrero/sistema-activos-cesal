"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

const TOTAL_ASSETS = 13000

const assetData = [
  {
    status: "disponible",
    total: 6240,
    fill: "#22c55e",
  },
  {
    status: "asignado",
    total: 4810,
    fill: "#3b82f6",
  },
  {
    status: "mantenimiento",
    total: 1170,
    fill: "#f59e0b",
  },
  {
    status: "baja",
    total: 780,
    fill: "#ef4444",
  },
]

const chartConfig = {
  disponible: {
    label: "Disponible",
    color: "#22c55e",
  },
  asignado: {
    label: "Asignado",
    color: "#3b82f6",
  },
  mantenimiento: {
    label: "Mantenimiento",
    color: "#f59e0b",
  },
  baja: {
    label: "De baja",
    color: "#ef4444",
  },
} satisfies ChartConfig

export function GraficoActivosPorEstado() {
  const id = "asset-status-chart"

  const [activeStatus, setActiveStatus] = React.useState("disponible")

  const activeIndex = React.useMemo(
    () => assetData.findIndex((item) => item.status === activeStatus),
    [activeStatus]
  )

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 6} />
            <Sector
              {...props}
              outerRadius={outerRadius + 18}
              innerRadius={outerRadius + 10}
            />
          </g>
        )
      }

      return <Sector {...props} outerRadius={outerRadius} />
    },
    [activeIndex]
  )

  return (
    <Card className="h-full rounded-3xl ring-0 border-0 dark:bg-slate-950">
      <ChartStyle id={id} config={chartConfig} />

      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-[20px] font-semibold text-slate-800 dark:text-slate-400">
            Activos por Estado
          </CardTitle>
        </div>

        <Select value={activeStatus} onValueChange={setActiveStatus}>
          <SelectTrigger className="h-10 w-[160px] rounded-xl border-slate-200 dark:text-slate-400 dark:border-slate-400">
            <SelectValue className="dark:text-slate-400"/>
          </SelectTrigger>

          <SelectContent>
            {assetData.map((item) => (
              <SelectItem key={item.status} value={item.status}>
                {chartConfig[item.status as keyof typeof chartConfig].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col items-center justify-between pt-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={assetData}
              dataKey="total"
              nameKey="status"
              innerRadius={62}
              strokeWidth={5}
              shape={renderPieShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy - 2}
                        className="fill-slate-900 text-3xl font-bold dark:fill-slate-400"
                      >
                        {assetData[activeIndex].total.toLocaleString()}
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 22}
                        className="fill-slate-500 text-sm"
                      >
                        {
  chartConfig[
    assetData[activeIndex].status as keyof typeof chartConfig
  ].label
}
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* LEYENDA INFERIOR */}
        <div className="mt-6 w-full space-y-3">
          {assetData.map((item) => {
            const percentage = ((item.total / TOTAL_ASSETS) * 100).toFixed(0)

            return (
              <div
                key={item.status}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: item.fill,
                    }}
                  />

                  <span className="font-medium text-slate-600 dark:text-slate-700">
                    {
                      chartConfig[
                        item.status as keyof typeof chartConfig
                      ].label
                    }
                  </span>
                </div>

                <span className="font-semibold text-slate-800 dark:text-slate-400">
                  {item.total.toLocaleString()} · {percentage}%
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}