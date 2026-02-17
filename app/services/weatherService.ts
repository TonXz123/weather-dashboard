import { WeatherResponse } from "../types/weather";

export const getWeather = async (
    query: string
): Promise<WeatherResponse> => {
    const res = await fetch(
        `/api/weather?query=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error?.message || "ไม่พบข้อมูลเมืองที่คุณค้นหา");
    }

    return data;
};
