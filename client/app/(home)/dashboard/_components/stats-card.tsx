import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

type StatsCardProps = {
  color: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
};

const StatsCard = ({ color, icon: Icon, title, value }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6  bg-gradient-to-br border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 rounded-2xl flex-1 min-w-[240px] max-w-[300px]",
        color
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Icon className="text-white size-6" strokeWidth={2.5} />
        </div>
        <h3 className="text-white text-lg font-bold">{title}</h3>
      </div>
      <div className="mt-auto">
        <p className="text-white text-4xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;