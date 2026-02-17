import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { Wind, Droplets, Eye, Navigation, MessageCircle, Info } from "lucide-react";
import { WeatherResponse } from "../types/weather";
import { translateCondition } from "../utils/lang";
import StatItem from "./StatItem";

interface Props {
    weather: WeatherResponse;
}

export default function MainWeatherCard({ weather }: Props) {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        // Set initial time immediately on mount
        setCurrentTime(new Date());

        // Update every minute since seconds are not displayed
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const weatherCondition = useMemo(() => translateCondition(weather.current.condition.text), [weather.current.condition.text]);

    return (
        <div className="bg-gradient-to-br from-[#1a2b4b]/90 to-[#1a2b4b]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl animate-fade-in relative overflow-hidden h-full group hover:shadow-blue-500/10 transition-all duration-500">
            {/* Current Weather Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-semibold opacity-90">สภาพอากาศปัจจุบัน</h2>
                    <p className="text-sm opacity-60">
                        {currentTime ? currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                    </p>
                </div>
            </div>

            {/* Temp and Condition */}
            <div className="flex items-center gap-8 mb-8">
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                    <Image
                        src={`https:${weather.current.condition.icon}`}
                        alt={weather.current.condition.text}
                        width={96}
                        height={96}
                        className="object-contain filter drop-shadow-lg"
                    />
                </div>
                <div>
                    <div className="flex items-baseline gap-1">
                        <h1 className="text-7xl font-bold tracking-tighter group-hover:text-blue-200 transition-colors">
                            {Math.round(weather.current.temp_c)}
                        </h1>
                        <span className="text-4xl font-light">°C</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-medium">{weatherCondition}</span>
                        <span className="text-sm opacity-60 italic">รู้สึกเหมือน {Math.round(weather.current.feelslike_c)}°</span>
                    </div>
                </div>
            </div>

            <p className="text-lg mb-8 opacity-90">
                สภาวะอากาศโดยทั่วไปคือ{weatherCondition.toLowerCase()} อุณหภูมิต่ำสุดประมาณ {Math.round(weather.current.temp_c - 5)}°
            </p>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-6 border-t border-white/5">
                <StatItem
                    label="คุณภาพอากาศ"
                    value={weather.current.uv > 5 ? "แย่" : "67"}
                    dotColor="text-yellow-400"
                />
                <StatItem
                    label="ลม"
                    value={`${weather.current.wind_kph} กม./ชม.`}
                    icon={<Navigation size={12} className="rotate-45" />}
                />
                <StatItem
                    label="ความชื้น"
                    value={`${weather.current.humidity}%`}
                />
                <StatItem
                    label="ทัศนวิสัย"
                    value={`${weather.current.vis_km} กิโลเมตร`}
                />
                <StatItem
                    label="ความกดอากาศ"
                    value={`${weather.current.pressure_mb} มิลลิบาร์`}
                />
                <StatItem
                    label="จุดน้ำค้าง"
                    value={`${weather.current.dewpoint_c}°`}
                />
            </div>
        </div>
    );
}
