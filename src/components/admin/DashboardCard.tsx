import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  description: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  change,
  description,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className=" flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <div>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className=" text-sm">{change}</div>
        <div className=" text-xs">{description}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
