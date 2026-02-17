import { Search } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { provinces, Province } from "../data/provinces";

interface Props {
    value: string;
    onChange: (v: string) => void;
    onSubmit: (query?: string) => void;
    loading: boolean;
}

export default function SearchBar({
    value,
    onChange,
    onSubmit,
    loading,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredProvinces = useMemo(() =>
        provinces.filter(p =>
            p.name_th.includes(value) ||
            p.name_en.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10),
        [value]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
        setIsOpen(false);
    };

    const handleSelect = (province: Province) => {
        onChange(province.name_en);
        setIsOpen(false);
        onSubmit(province.name_en);
    };

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

    return (
        <div className="relative group w-full" ref={dropdownRef}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ค้นหาชื่อจังหวัด..."
                    className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-white placeholder-blue-200 outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm disabled:opacity-50"
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    disabled={loading}
                />
                <Search className="absolute left-3.5 top-2.5 text-blue-200" size={18} />
            </form>

            {/* Dropdown UI */}
            {isOpen && value.length > 0 && filteredProvinces.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2 max-h-[300px] overflow-y-auto">
                        {filteredProvinces.map((province) => (
                            <button
                                key={province.id}
                                onClick={() => handleSelect(province)}
                                className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group/item"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-slate-700 font-bold text-[15px] group-hover/item:text-blue-600 transition-colors">
                                        {province.name_th}
                                    </span>
                                    <span className="text-slate-400 text-[11px] uppercase tracking-wider">
                                        {province.name_en}
                                    </span>
                                </div>
                                <span className="text-slate-400 text-xs font-medium">
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
