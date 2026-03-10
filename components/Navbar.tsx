import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export default function Navbar() {
    return (
        <nav className="w-full pt-6 px-4 md:px-10 lg:px-20 z-50 fixed top-0 left-0 right-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 shadow-lg">
                {/* Back Link to Home */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} strokeWidth={2} />
                    </Link>
                    <span className="text-white font-bold tracking-tight text-lg">Movie Hub</span>
                </div>

                {/* Right Nav */}
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 rounded-full">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </nav>
    );
}
