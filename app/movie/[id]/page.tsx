import Image from "next/image";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieVideos,
    getImageUrl
} from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import { ReviewSection } from "@/components/ReviewSection";
import { Clock, Calendar, Film, PlayCircle, Star, Users } from "lucide-react";

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
    const movieId = params.id;

    // Fetch TMDB data concurrently
    const [movie, cast, videos] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieVideos(movieId),
    ]);

    const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
    const trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    // Format runtime mathematically
    const formatRuntime = (minutes?: number) => {
        if (!minutes) return "N/A";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    };

    return (
        <div className="min-h-screen bg-[#0b0c13] text-white font-sans selection:bg-[#3aa3fc] selection:text-white">
            <Navbar />

            {/* Hero Backdrop Section */}
            <div className="relative w-full h-[60vh] md:h-[75vh] flex items-end">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={getImageUrl(movie.backdrop_path, "original")}
                        alt={movie.title}
                        fill
                        className="object-cover object-top opacity-60"
                        priority
                    />
                    {/* Gradient overlay pulling it smoothly into the dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c13] via-[#0b0c13]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c13] via-[#0b0c13]/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20 w-full pb-10 flex flex-col md:flex-row gap-8 items-end">
                    {/* Poster */}
                    <div className="w-[160px] md:w-[220px] aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex-shrink-0 border border-white/10 hidden md:block transform translate-y-20">
                        <Image
                            src={getImageUrl(movie.poster_path)}
                            alt={`${movie.title} poster`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Title and Metadata */}
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-xl">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-medium mb-6">
                            <span className="flex items-center gap-1.5"><Calendar size={18} className="text-[#3aa3fc]" /> {movie.release_date}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            <span className="flex items-center gap-1.5"><Clock size={18} className="text-[#3aa3fc]" /> {formatRuntime(movie.runtime)}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            <span className="flex items-center gap-1.5 bg-[#facc15] text-black px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                                TMDB {movie.vote_average.toFixed(1)}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                            {movie.genres?.map(genre => (
                                <span key={genre.id} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-xs font-semibold text-gray-300">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Body */}
            <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-16 md:pt-24 pb-20">
                <div className="grid lg:grid-cols-3 gap-16">

                    {/* Left Column (Synopsis & Cast) */}
                    <div className="lg:col-span-2 flex flex-col gap-12">

                        {/* Synopsis */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Film size={24} className="text-[#3aa3fc]" /> Overview
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                {movie.overview || "No overview available for this movie."}
                            </p>
                        </section>

                        {/* Top Cast */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Users size={24} className="text-[#3aa3fc]" /> Top Cast
                            </h2>
                            <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar">
                                {cast.slice(0, 10).map((actor) => (
                                    <div key={actor.id} className="w-[120px] flex-shrink-0 flex flex-col items-center">
                                        <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative mb-3 border-2 border-white/10">
                                            <Image
                                                src={getImageUrl(actor.profile_path)}
                                                alt={actor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="font-semibold text-sm text-center line-clamp-1">{actor.name}</span>
                                        <span className="text-xs text-gray-500 text-center line-clamp-1">{actor.character}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Trailer & Review Widget) */}
                    <div className="flex flex-col gap-10">
                        {/* Trailer Embed */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <PlayCircle size={20} className="text-[#3aa3fc]" /> Official Trailer
                            </h2>
                            {trailer ? (
                                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${trailer.key}?modestbranding=1&rel=0`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="w-full aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-500">
                                    No trailer available
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Custom Database Review Section injected at the bottom */}
                <ReviewSection movieId={movieId} />
            </main>

            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
}
