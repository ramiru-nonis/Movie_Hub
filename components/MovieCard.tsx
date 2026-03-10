import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';

export function MovieCard({ movie }: { movie: Movie }) {
    // Extract just the year from the YYYY-MM-DD string
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

    // Format rating to 1 decimal place
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <Link href={`/movie/${movie.id}`} className="block relative group w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gray-900 cursor-pointer flex-shrink-0">

            {/* Plus Button Top Left (Matching the design) */}
            <div className="absolute top-2 left-2 z-20 bg-black/60 backdrop-blur-md p-1.5 rounded-lg opacity-90 hover:opacity-100 hover:bg-black/80 transition-all border border-white/20">
                <Plus size={18} strokeWidth={2.5} className="text-white" />
            </div>

            <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />

            {/* Gradient overlay that appears on hover to show text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2">
                    {movie.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                    <span>{year}</span>
                    <span className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span> {rating}
                    </span>
                </div>
            </div>
        </Link>
    );
}
