import React from "react";

const Footer = React.memo(() => {
    return (
        <footer className="w-full max-w-7xl mx-auto px-4 py-8 mt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 text-[11px] text-white/30">
                    <span className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-green-500/40" />
                        ข้อมูลสด (Live)
                    </span>
                    <span className="w-[1px] h-3 bg-white/10" />
                    <span className="font-light">WeatherAPI.com</span>
                    <span className="w-[1px] h-3 bg-white/10" />
                    <span className="font-medium tracking-tight text-white/20">เน้นพื้นที่ประเทศไทย</span>
                </div>
            </div>
        </footer>
    );
});

export default Footer;