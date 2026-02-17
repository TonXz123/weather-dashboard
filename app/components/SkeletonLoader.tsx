import React from "react";

export default function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
            {/* Left Panel: Weather Info Skeleton */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-[400px] flex flex-col justify-between">
                <div>
                    <div className="h-6 w-32 bg-white/10 rounded-full mb-4"></div>
                    <div className="h-4 w-24 bg-white/5 rounded-full mb-8"></div>

                    <div className="flex items-center gap-8 mb-8">
                        <div className="w-24 h-24 bg-white/10 rounded-full"></div>
                        <div>
                            <div className="h-16 w-32 bg-white/10 rounded-xl mb-2"></div>
                            <div className="h-6 w-40 bg-white/5 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-6 border-t border-white/5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-2 w-10 bg-white/5 rounded-full"></div>
                            <div className="h-4 w-full bg-white/10 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Map Skeleton */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl h-[400px] lg:h-auto min-h-[400px]">
                <div className="w-full h-full bg-white/5"></div>
            </div>
        </div>
    );
}
