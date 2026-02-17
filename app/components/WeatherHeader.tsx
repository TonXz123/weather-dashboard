import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Home, MapPin } from "lucide-react";
import { provinces, Province } from "../data/provinces";

interface Props {
    locationName: string;
    region: string;
    onSelect: (query?: string) => void;
}

export default function WeatherHeader({ locationName, region, onSelect }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (province: Province) => {
        onSelect(province.name_en);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center gap-2 text-white/90 mb-6 p-2 relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-1 cursor-pointer group hover:bg-white/5 px-2 py-1 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className="text-lg font-medium tracking-wide">
                    {locationName}, {region}
                </h1>
                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                />
            </div>

            <button
                onClick={() => onSelect("Bangkok")}
                className="ml-2 bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                title="กลับไปกรุงเทพฯ"
            >
                <Home size={18} />
            </button>

            {/* Dropdown UI */}
            {isOpen && (
                <div className="absolute top-full left-2 mt-2 w-64 bg-[#1a2b41] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 bg-white/5 border-b border-white/10 flex items-center gap-2 text-xs font-medium text-white/50">
                        <MapPin size={12} />
                        เลือกจังหวัดรวดเร็ว
                    </div>
                    <div className="py-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                        {provinces.map((province) => (
                            <button
                                key={province.id}
                                onClick={() => handleSelect(province)}
                                className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                            >
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-medium">
                                        {province.name_th}
                                    </span>
                                    <span className="text-white/40 text-[10px] uppercase">
                                        {province.name_en}
                                    </span>
                                </div>
                                <span className="text-white/20 text-[10px]">
                                    {province.districts} เขต
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
