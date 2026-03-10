"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery("");
            setIsExpanded(false);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className={`flex items-center transition-all duration-300 ${isExpanded ? "w-48 md:w-64 bg-white/20 px-3 py-1 rounded-full ring-1 ring-white/40" : "w-8"
                }`}
        >
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:text-black transition-colors"
            >
                <SearchIcon size={20} className={isExpanded ? "text-black" : "text-[#334155] hover:text-black"} strokeWidth={2} />
            </button>

            {isExpanded && (
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="bg-transparent border-none outline-none text-sm text-[#0f172a] placeholder-gray-500 ml-2 w-full font-medium"
                    autoFocus
                />
            )}
        </form>
    );
}
