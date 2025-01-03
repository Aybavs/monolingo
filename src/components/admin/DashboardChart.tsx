"use client";

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import { getUsersByDate } from '@/lib/admin';

import { Card } from '../ui/card';

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
  const [chartData, setChartData] = useState<unknown[]>([]);
  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(new Date().setDate(new Date().getDate() - 10))
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const users = await getUsersByDate(startDate, endDate);

        // Verileri günlük bazda gruplama
        const groupedData: Record<string, number> = {};
        for (const user of users as { date_joined: string }[]) {
          const date = new Date(user.date_joined).toISOString().split("T")[0];
          groupedData[date] = (groupedData[date] || 0) + 1;
        }

        // Chart için verileri formatlama
        const formattedData = Object.entries(groupedData).map(
          ([date, users]) => ({
            date,
            users,
          })
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchChartData();
  }, [endDate, startDate]);

  return (
    <Card className="p-6">
      <h3 className="text-lg text-center font-bold mb-4">
        New Users in the Last 10 Days
      </h3>
      <ResponsiveContainer className="pr-10" width="100%" height={300}>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 30, left: 40 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)} // Tarihi kısaltarak göster
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
