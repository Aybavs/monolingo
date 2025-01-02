"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card } from "../ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const mockChartData = [
  { date: "Day 1", users: 15 },
  { date: "Day 2", users: 30 },
  { date: "Day 3", users: 25 },
  { date: "Day 4", users: 40 },
  { date: "Day 5", users: 35 },
  { date: "Day 6", users: 50 },
  { date: "Day 7", users: 45 },
  { date: "Day 8", users: 60 },
  { date: "Day 9", users: 55 },
  { date: "Day 10", users: 70 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#a78bfa",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const Chart = () => {
  return (
    <Card className="p-6 ">
      <h3 className="text-lg text-center font-bold mb-4">
        New Users in the Last 10 Days
      </h3>
      <ResponsiveContainer className="pr-10" width="100%" height={300}>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            data={mockChartData}
            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Bar
              dataKey="users"
              fill="var(--color-desktop)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
