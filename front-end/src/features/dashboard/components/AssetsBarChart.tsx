"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import type { BarShapeProps } from "recharts/types/cartesian/Bar";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";

import { Button } from "@/shared/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { Calendar } from "@/shared/ui/calendar";

const TOTAL_ASSETS = 13000;

const chartData = [
  { sede: "Lima", activos: 4100, fill: "#8BA7DC" },
  { sede: "Cusco", activos: 2850, fill: "#5C7CE2" },
  { sede: "Arequipa", activos: 3250, fill: "#5E74F0" },
  { sede: "Apurímac", activos: 1650, fill: "#3E46D8" },
  { sede: "Huancayo", activos: 1150, fill: "#343BBE" },
];

const chartConfig = {
  activos: {
    label: "Activos",
  },
} satisfies ChartConfig;

const ACTIVE_INDEX = 2;

export function AssetsBarChart() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Card className="rounded-3xl border-0 ring-0 shadow-sm dark:bg-slate-950">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[20px] font-semibold text-slate-800 dark:text-slate-400">
          Distribución de activos por sede
        </CardTitle>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-xl border-slate-200 dark:border-slate-400 dark:text-slate-400"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {date ? format(date, "PPP") : "Seleccionar fecha"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className="space-y-8">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} stroke="#E7EDF5" />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={16}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${(value / 1000).toFixed(1)}k`} />

            <XAxis
              dataKey="sede"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="activos"
              radius={10}
              shape={({ index, ...props }: BarShapeProps) =>
                index === ACTIVE_INDEX ? (
                  <Rectangle
                    {...props}
                    fillOpacity={0.95}
                    stroke={props.payload.fill}
                    strokeWidth={2}
                    strokeDasharray={4}
                    radius={10}
                  />
                ) : (
                  <Rectangle {...props} radius={10} />
                )
              }
            />
          </BarChart>
        </ChartContainer>

        <div className="grid grid-cols-5 gap-4">
          {chartData.map((item) => {
            const percentage = ((item.activos / TOTAL_ASSETS) * 100).toFixed(0);

            return (
              <div key={item.sede} className="flex items-start gap-3">
                <span
                  className="mt-1 h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />

                <div>
                  <p className="font-medium text-slate-700">{item.sede}</p>

                  <p className="text-sm text-slate-400">
                    {item.activos.toLocaleString()} activos · {percentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
