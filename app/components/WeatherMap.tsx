"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Droplets, Thermometer, Wind } from "lucide-react";

// Fix leaflet icon issue in Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
    lat: number;
    lon: number;
    locationName: string;
}

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 7); // ปรับ Zoom ให้เห็นภาพรวมประเทศได้ดีขึ้น
    }, [center, map]);
    return null;
}

export default function WeatherMap({ lat, lon, locationName }: Props) {
    const [activeTab, setActiveTab] = useState("rain");
    const [geoData, setGeoData] = useState<any>(null);
    const position: [number, number] = [lat, lon];

    // ดึงข้อมูลขอบเขตประเทศไทย (GeoJSON)
    useEffect(() => {
        // ใช้ Source จาก GitHub ที่เสถียรสำหรับขอบเขตประเทศไทย
        fetch("https://raw.githubusercontent.com/apisit/thailand.json/master/thailand.json")
            .then((res) => res.json())
            .then((data) => setGeoData(data))
            .catch((err) => console.error("Error loading boundary:", err));
    }, []);

    // การตั้งค่าสีและเส้นขอบ (ตามธงไตรรงค์)
    // 1. ฟังก์ชันสำหรับสร้าง Style ของแต่ละสีในธงชาติ
    const getFlagStyle = (color: string, dashArray: string, offset: number) => ({
        color: color,
        weight: 1,              // ปรับให้เส้นเล็กลงตามคำขอ
        fillColor: "transparent",
        fillOpacity: 0,
        dashArray: dashArray,
        dashOffset: offset.toString(),
    });

    // 2. ส่วนของพื้นหลังไฮไลต์ (แยกออกมาเป็นอีกชั้น)
    const backgroundStyle = {
        fillColor: "#1100ffff", // หรือสีน้ำเงินอ่อนๆ
        fillOpacity: 0.1,
        stroke: false,        // ชั้นนี้ไม่วาดเส้นขอบ
    };

    const thailandBounds: L.LatLngBoundsExpression = [
        [5.612737, 97.34375],
        [20.46387, 105.632324],
    ];

    return (
        <div className="bg-[#1a2b4b]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden text-white shadow-2xl h-full flex flex-col">
            <div className="relative flex-1">

                <MapContainer
                    center={position}
                    zoom={6}
                    minZoom={5}
                    maxBounds={thailandBounds}
                    maxBoundsViscosity={1.0}
                    style={{ height: "100%", width: "100%", background: "#f8f9fa" }}
                >
                    {/* ใช้ TileLayer แบบ Light เพื่อให้เส้นขอบส้มดูเด่นเหมือนในรูป */}
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />

                    {/* วาดเส้นขอบเขตประเทศไทย */}
                    {geoData && (
                        <>
                            {/* ชั้นที่ 1: สีพื้นหลังไฮไลต์ในประเทศ */}
                            <GeoJSON data={geoData} style={backgroundStyle} />

                            {/* เส้นขอบธงไตรรงค์ (แดง-ขาว-น้ำเงิน-ขาว-แดง) */}
                            {/* สัดส่วน 1:1:2:1:1, รวม Cycle = 60 */}

                            {/* ชั้นที่ 2: สีแดง (ล่าง/บนสุด) - แถบ 1 */}
                            <GeoJSON data={geoData} style={getFlagStyle("#A51931", "10, 50", 0)} />

                            {/* ชั้นที่ 3: สีขาว - แถบ 1 */}
                            <GeoJSON data={geoData} style={getFlagStyle("#ffffff", "10, 50", 50)} />

                            {/* ชั้นที่ 4: สีน้ำเงิน (แถบกลางใหญ่) */}
                            <GeoJSON data={geoData} style={getFlagStyle("#1900ffff", "20, 40", 40)} />

                            {/* ชั้นที่ 5: สีขาว - แถบ 2 */}
                            <GeoJSON data={geoData} style={getFlagStyle("#ffffff", "10, 50", 20)} />

                            {/* ชั้นที่ 6: สีแดง - แถบ 2 */}
                            <GeoJSON data={geoData} style={getFlagStyle("#A51931", "10, 50", 10)} />
                        </>
                    )}

                    <Marker position={position} />
                    <ChangeView center={position} />
                </MapContainer>

                <div className="absolute bottom-4 right-4 z-[1000]">
                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs transition-all border border-white/20">
                        ขยายแผนที่
                    </button>
                </div>
            </div>

            <div className="p-4 bg-black/20 text-sm opacity-80 flex items-center justify-between">
                <span>{locationName} - ไม่มีหยาดน้ำฟ้าในขณะนี้</span>
            </div>
        </div>
    );
}