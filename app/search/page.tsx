"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { searchMovies } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";
import Navbar from "@/components/Navbar";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const { data: movies, isLoading, error } = useQuery({
        queryKey: ["searchMovies", query],
        queryFn: () => searchMovies(query),
        enabled: !!query, // Only fetch if there is a query
    });

    return (
        <div className="min-h-screen bg-[#0b0c13] text-white pt-32 pb-20 font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                <h1 className="text-3xl font-bold mb-2">
                    {query ? `Search Results for "${query}"` : "Search Movies"}
                </h1>

                {query && (
                    <p className="text-gray-400 mb-10">
                        {movies ? `Found ${movies.length} results` : "Searching..."}
                    </p>
                )}

                {!query && (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
                        <p className="text-lg">Enter a movie title in the search bar above to begin.</p>
                    </div>
                )}

                {isLoading && query && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10 animate-pulse">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="w-full aspect-[2/3] bg-gray-800 rounded-2xl"></div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-200">
                        Failed to search movies. Please try again.
                    </div>
                )}

                {movies && movies.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center h-[40vh] text-gray-400">
                        <p className="text-xl font-medium">No movies found matching "{query}"</p>
                        <p className="mt-2 text-sm">Try using different keywords or checking for typos.</p>
                    </div>
                )}

                {movies && movies.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
