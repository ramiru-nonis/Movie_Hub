"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/lib/tmdb";
import { MovieCard } from "./MovieCard";
import { ChevronRight } from "lucide-react";

export function TrendingMovies() {
    const { data: movies, isLoading, error } = useQuery({
        queryKey: ["trendingMovies"],
        queryFn: getTrendingMovies,
    });

    if (isLoading) {
        return (
            <div className="w-full mt-24 mb-16 animate-pulse">
                <div className="h-8 w-32 bg-gray-200/20 rounded-md mb-6 ml-4 md:ml-10 lg:ml-20"></div>
                <div className="flex gap-4 overflow-hidden px-4 md:px-10 lg:px-20">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[160px] md:w-[200px] lg:w-[220px] aspect-[2/3] bg-gray-200/20 rounded-2xl flex-shrink-0"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !movies) {
        return (
            <div className="w-full mt-24 mb-16 px-4 md:px-10 lg:px-20">
                <p className="text-red-400 font-medium">Failed to load trending movies.</p>
            </div>
        );
    }

    return (
        <div className="w-full mt-32 mb-16 flex flex-col pt-12">
            {/* Title */}
            <div className="px-4 md:px-10 lg:px-20 mb-6 flex justify-between items-end">
                <h2 className="text-[2rem] font-bold text-[#0f172a] tracking-tight">Trends</h2>
                <button className="flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors mb-2 pr-4">
                    View all <ChevronRight size={16} className="ml-1" />
                </button>
            </div>

            {/* Horizontal Scrollable Carousel */}
            <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
                <div className="flex gap-4 px-4 md:px-10 lg:px-20 min-w-max">
                    {movies.slice(0, 10).map((movie) => (
                        <div key={movie.id} className="w-[160px] md:w-[200px] lg:w-[220px]">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
        </div>
    );
}
