import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value: string | number;
  trend?: string;
  color?: "primary" | "secondary" | "accent";
}

export const DashboardCard = ({
  title,
  description,
  icon: Icon,
  value,
  trend,
  color = "primary",
}: DashboardCardProps) => {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-xs mt-1">{description}</CardDescription>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}/10`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {trend && (
            <div className="text-xs text-muted-foreground">{trend}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
