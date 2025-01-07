"use client";
import React from "react";

import DashboardCard from "@/components/admin/DashboardCard";
import Chart from "@/components/admin/DashboardChart";
import {
  getTotalUsers,
  getTotalLessons,
  getTotalExercises,
} from "@/lib/admin/adminService";

const initialData = [
  {
    id: 1,
    title: "Total Users",
    value: "",
    icon: <span>$</span>,
    description: "",
  },
  {
    id: 2,
    title: "Total Lessons",
    value: "",
    icon: <span>👥</span>,
    description: "",
  },
  {
    id: 3,
    title: "Total Exercises",
    value: "",
    icon: <span>💳</span>,
    description: "",
  },
  {
    id: 4,
    title: "Total Languages",
    value: "1",
    icon: <span>📈</span>,
    description: "",
  },
];

const Dashboard = () => {
  const [mockData, setMockData] = React.useState(initialData);

  React.useEffect(() => {
    getTotalUsers().then((data) => {
      setMockData((prevData) => {
        const newData = [...prevData];
        newData[0].value = data.count;
        return newData;
      });
    });
    getTotalLessons().then((data) => {
      setMockData((prevData) => {
        const newData = [...prevData];
        newData[1].value = data.count;
        return newData;
      });
    });
    getTotalExercises().then((data) => {
      setMockData((prevData) => {
        const newData = [...prevData];
        newData[2].value = data.count;
        return newData;
      });
    });
  }, []);
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
            description={item.description}
          />
        ))}
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
