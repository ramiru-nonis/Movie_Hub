import axios from 'axios';

// Get your API key from TMDB and add it to your .env.local file
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    overview: string;
}

export const getTrendingMovies = async (): Promise<Movie[]> => {
    const response = await tmdbClient.get('/trending/movie/day');
    return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    if (!query) return [];
    const response = await tmdbClient.get('/search/movie', {
        params: { query },
    });
    return response.data.results;
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder-movie.png'; // Fallback image if no poster available
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
