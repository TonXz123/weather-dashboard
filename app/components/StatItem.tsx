import React from "react";
import { Info } from "lucide-react";

interface StatItemProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    dotColor?: string;
}

const StatItem = React.memo(({ label, value, icon, dotColor }: StatItemProps) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-60">
                {label} <Info size={10} />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium whitespace-nowrap">
                {dotColor && <span className={`${dotColor} text-[8px] animate-pulse`}>●</span>}
                {value}
                {icon}
            </div>
        </div>
    );
});

StatItem.displayName = "StatItem";

export default StatItem;
