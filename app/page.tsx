"use client";
import React, { useEffect, useState } from "react";
import { useWeather } from "./hooks/useWeather";
import WeatherHeader from "./components/WeatherHeader";
import MainWeatherCard from "./components/MainWeatherCard";
import SearchBar from "./components/SearchBar";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import SkeletonLoader from "./components/SkeletonLoader";

const WeatherMap = dynamic(() => import("./components/WeatherMap"), {
  ssr: false,
});

export default function App() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Load saved location on mount
  useEffect(() => {
    const saved = localStorage.getItem('last_city') || "Bangkok";
    setQuery(saved);
    setSearchQuery(saved);
    setMounted(true);
  }, []);

  const { weather, status, error, fetchWeather } = useWeather(searchQuery);

  const handleSearch = (val?: string) => {
    const target = val || query;
    if (!target) return;
    setSearchQuery(target);
    localStorage.setItem('last_city', target);
  };

  if (!mounted) return <div className="min-h-screen bg-[#06162d]" />;

  return (
    <div className="min-h-screen w-full bg-[#06162d] p-4 md:p-8 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Header with Search Integration */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          {weather && (
            <WeatherHeader
              locationName={weather.location.name}
              region={weather.location.region}
              onSelect={handleSearch}
            />
          )}
          <div className="w-full md:w-64">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              loading={status === "loading"}
            />
          </div>
        </div>

        {/* Error State */}
        {status === "error" && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-2xl mb-6 flex justify-between items-center animate-fade-in">
            <p>{error || "ไม่พบข้อมูลเมืองที่คุณค้นหา"}</p>
            <button onClick={() => handleSearch("Bangkok")} className="underline text-sm">กลับไปกรุงเทพฯ</button>
          </div>
        )}

        {/* Loading State or Data */}
        {status === "loading" ? (
          <SkeletonLoader />
        ) : weather && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {/* Left Panel: Weather Info */}
            <div className="h-full">
              <MainWeatherCard weather={weather} />
            </div>

            {/* Right Panel: Map */}
            <div className="h-[400px] lg:h-auto min-h-[400px]">
              <WeatherMap
                lat={weather.location.lat}
                lon={weather.location.lon}
                locationName={weather.location.name}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
