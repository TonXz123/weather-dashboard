import {
    Droplets,
    Wind,
    ThermometerSun,
    Sun,
    Eye,
    Navigation,
    RefreshCw,
} from "lucide-react";
import { WeatherResponse } from "../types/weather";
import StatCard from "./StatCard";
import { translateWindDir } from "../utils/lang";

interface Props {
    weather: WeatherResponse;
    onRefresh: () => void;
}

export default function WeatherDetails({ weather, onRefresh }: Props) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">รายละเอียด</h3>
                <button
                    onClick={onRefresh}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 transition-all active:rotate-180 duration-500"
                    title="รีเฟรชข้อมูล"
                >
                    <RefreshCw size={18} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 content-start">
                <StatCard
                    icon={Droplets}
                    label="ความชื้น"
                    value={`${weather.current.humidity}%`}
                    subValue={`จุดน้ำค้าง ${weather.current.dewpoint_c}°C`}
                    delay={100}
                />
                <StatCard
                    icon={Wind}
                    label="ลม"
                    value={`${weather.current.wind_kph} กม./ชม.`}
                    subValue={`ทิศทาง ${translateWindDir(weather.current.wind_dir)}`}
                    delay={200}
                />
                <StatCard
                    icon={ThermometerSun}
                    label="ความรู้สึกจริง"
                    value={`${weather.current.feelslike_c}°C`}
                    subValue={`ดัชนีความร้อน ${weather.current.heatindex_c}°C`}
                    delay={300}
                />
                <StatCard
                    icon={Sun}
                    label="ดัชนี UV"
                    value={weather.current.uv}
                    subValue={weather.current.uv > 5 ? "ระดับสูง" : "ระดับต่ำ"}
                    delay={400}
                />
                <StatCard
                    icon={Eye}
                    label="ทัศนวิสัย"
                    value={`${weather.current.vis_km} กม.`}
                    subValue="มองเห็นได้ชัดเจน"
                    delay={500}
                />
                <StatCard
                    icon={Navigation}
                    label="ความกดอากาศ"
                    value={`${weather.current.pressure_mb} mb`}
                    subValue="สภาพอากาศคงที่"
                    delay={600}
                />
            </div>

            {/* Chart Area Placeholder */}
            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between text-white/60 text-xs mb-2">
                    {(() => {
                        const now = new Date(weather.location.localtime);
                        const currentHour = now.getHours();
                        return [0, 2, 4, 6, 8].map((offset) => {
                            const hour = (currentHour + offset) % 24;
                            return <span key={offset}>{`${hour.toString().padStart(2, '0')}:00`}</span>;
                        });
                    })()}
                </div>
                <div className="h-12 flex items-end justify-between gap-1">
                    {[40, 60, 85, 55, 30].map((h, i) => (
                        <div key={i} className="w-full bg-white/20 rounded-t-sm hover:bg-white/40 transition-all" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <p className="text-center text-xs text-white/40 mt-2">พยากรณ์อุณหภูมิล่วงหน้า (Simulated)</p>
            </div>
        </div>
    );
}
