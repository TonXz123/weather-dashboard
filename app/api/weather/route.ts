import { NextResponse } from 'next/server';
import { provinces } from '../../data/provinces';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    // 1. Input Validation
    if (!query || query.length < 2 || query.length > 100) {
        return NextResponse.json(
            { error: { message: "ชื่อเมืองต้องมีความยาวระหว่าง 2-100 ตัวอักษร" } },
            { status: 400 }
        );
    }

    // 2. Search Restriction (Only provinces in provinces.ts)
    const isValidProvince = provinces.some(p =>
        p.name_en.toLowerCase() === query.toLowerCase() ||
        p.name_th === query
    );

    if (!isValidProvince) {
        return NextResponse.json(
            { error: { message: "ไม่พบข้อมูล: สามารถค้นหาได้เฉพาะ 77 จังหวัดในประเทศไทยเท่านั้น" } },
            { status: 404 }
        );
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}&aqi=no&lang=th`;

    try {
        // 3. Caching (15 minutes)
        const res = await fetch(url, { next: { revalidate: 900 } });
        const data = await res.json();

        const headers = {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        };

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status, headers });
        }

        return NextResponse.json(data, { headers });
    } catch (error) {
        console.error("Weather API Error:", error);
        return NextResponse.json(
            { error: { message: "ไม่สามารถติดต่อเซิร์ฟเวอร์สภาพอากาศได้ในขณะนี้" } },
            { status: 500, headers: { 'X-Content-Type-Options': 'nosniff' } }
        );
    }
}