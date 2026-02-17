import React from "react";

interface Props {
    icon: any;
    label: string;
    value: string | number;
    subValue?: string;
    delay?: number;
}

const StatCard = React.memo(({
    icon: Icon,
    label,
    value,
    subValue,
    delay = 0,
}: Props) => {
    return (
        <div
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-start hover:bg-white/20 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center gap-2 text-blue-100 mb-2">
                <Icon size={18} />
                <span className="text-sm font-medium opacity-80">{label}</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">{value}</span>
            {subValue && <span className="text-xs text-blue-200 mt-1">{subValue}</span>}
        </div>
    );
});

StatCard.displayName = "StatCard";

export default StatCard;
