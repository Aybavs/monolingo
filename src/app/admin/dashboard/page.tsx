"use client";

import DashboardCard from "@/components/admin/DashboardCard";
import Chart from "@/components/admin/DashboardChart";

const mockData = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$45,231.89",
    icon: <span>$</span>,
    change: "+20.1% from last month",
    description: "",
  },
  {
    id: 2,
    title: "Subscriptions",
    value: "+2350",
    icon: <span>👥</span>,
    change: "+180.1% from last month",
    description: "",
  },
  {
    id: 3,
    title: "Sales",
    value: "+12,234",
    icon: <span>💳</span>,
    change: "+19% from last month",
    description: "",
  },
  {
    id: 4,
    title: "Active Now",
    value: "+573",
    icon: <span>📈</span>,
    change: "+201 since last hour",
    description: "",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockData.map((item) => (
          <DashboardCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            change={item.change}
            description={item.description}
          />
        ))}
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
