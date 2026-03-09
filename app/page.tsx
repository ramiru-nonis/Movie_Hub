import Image from "next/image";
import Link from "next/link";
import { Search, Bell, User, Moon, Play, ArrowRight, Star, StarHalf } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden text-[#1f2937]">
      {/* Background Hero Image */}
      <div className="absolute inset-0 w-full h-full -z-10 bg-black/10">
        {/* We use object-cover to make sure the background fills the entire screen */}
        <Image
          src="/hero-bg.png"
          alt="Mission Impossible Hero"
          fill
          className="object-cover object-top"
          priority
          quality={100}
        />
        {/* Gradient overlays to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-2/3 lg:w-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent h-1/3 bottom-0" />
      </div>

      {/* Navbar Container */}
      <nav className="w-full pt-6 px-4 md:px-10 lg:px-20 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/40 backdrop-blur-md border border-white/50 rounded-full px-8 py-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
          {/* Logo area */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0f172a] rounded-lg flex flex-wrap content-center justify-center relative overflow-hidden transform rotate-45">
              <div className="absolute w-full h-full -rotate-45 flex items-center justify-center">
                <Play className="text-white ml-1" size={20} fill="white" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-[0.95rem] text-[#1e293b]">
            <div className="relative cursor-pointer text-[#0f172a] font-semibold">
              Home
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#3aa3fc] rounded-full blur-[1px]"></div>
            </div>
            <Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Movies</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Series</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Collection</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">FAQ</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6 text-[#334155]">
            <button className="hover:text-black transition-colors"><Search size={20} strokeWidth={2} /></button>
            <button className="relative hover:text-black transition-colors">
              <Bell size={20} strokeWidth={2} />
              <div className="absolute top-0 right-0 w-[8px] h-[8px] bg-pink-500 rounded-full border-2 border-white/50 translate-x-1/2 -translate-y-1/2"></div>
            </button>
            <button className="hover:text-black transition-colors"><User size={20} strokeWidth={2} fill="currentColor" /></button>
            <button className="hover:text-black transition-colors"><Moon size={20} strokeWidth={2} fill="currentColor" /></button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 pt-[15vh] lg:pt-[20vh] relative z-10">

        <div className="max-w-2xl">
          <h1 className="text-[3.5rem] md:text-[4.5rem] font-bold text-[#0f172a] leading-[1.1] tracking-tight mb-2">
            Mission Imposible
          </h1>
          <h2 className="text-2xl font-medium text-[#334155] mb-6">
            Dead Reckoning <span className="text-lg font-normal text-gray-500">(Part One)</span>
          </h2>

          <p className="text-[0.95rem] text-[#475569] font-medium leading-relaxed max-w-xl mb-8">
            With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.
          </p>

          {/* Rating Row */}
          <div className="flex items-center gap-4 mb-10">
            {/* Stars */}
            <div className="flex text-[#fbbf24] gap-1">
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <Star size={18} fill="currentColor" strokeWidth={0} />
              <StarHalf size={18} fill="currentColor" strokeWidth={0} />
            </div>

            {/* IMDb */}
            <div className="bg-[#facc15] text-black text-xs font-bold px-1.5 py-0.5 rounded shadow-sm">
              IMDb
            </div>
            <span className="font-bold text-[#0f172a] text-sm">7.7</span>

            {/* Studio */}
            <span className="font-extrabold tracking-widest text-[#0f172a] ml-2 text-sm">LIONSGATE</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-5">
            <button className="bg-[#3aa3fc] hover:bg-[#2c8ee6] shadow-lg shadow-blue-500/30 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-all active:scale-95 text-sm">
              <Play size={16} fill="white" />
              Whatch Movie
            </button>
            <button className="bg-transparent border border-gray-400 hover:border-gray-800 text-[#0f172a] font-medium px-6 py-3 text-sm rounded-full flex items-center gap-2 transition-all active:scale-95">
              More Info
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* Angle Decoration and Thumbnails at the bottom right */}
      <div className="absolute bottom-0 right-0 w-full h-[500px] pointer-events-none overflow-hidden z-20">
        {/* Angled cut graphic from the design */}
        <div className="absolute right-0 bottom-0 w-[60%] h-[120%] bg-gradient-to-t from-gray-200/90 via-gray-100/50 to-transparent rotate-[35deg] origin-bottom-right translate-x-[20%] translate-y-[10%] backdrop-blur-sm shadow-2xl" />

        {/* Red and Grey sharp lines */}
        <div className="absolute right-0 bottom-[10%] w-[80%] h-[2px] bg-red-600 rotate-[35deg] origin-bottom-right translate-x-[15%] shadow-[0_0_10px_red]" />
        <div className="absolute right-0 bottom-[12%] w-[80%] h-[1px] bg-gray-400 rotate-[35deg] origin-bottom-right translate-x-[15%]" />

        {/* Thumbnails Collection */}
        <div className="absolute bottom-8 md:bottom-12 right-8 md:right-20 flex items-end -space-x-4 pointer-events-auto">
          <div className="w-[120px] h-[80px] md:w-[150px] md:h-[100px] rounded-xl overflow-hidden relative shadow-2xl border border-white/30 transform hover:-translate-y-2 transition-transform z-10 opacity-90 brightness-75 hover:brightness-100">
            <Image src="/thumb1.png" alt="Thumbnail 1" fill className="object-cover" />
          </div>
          <div className="w-[140px] h-[100px] md:w-[180px] md:h-[130px] rounded-xl overflow-hidden relative shadow-2xl border-2 border-white/50 transform hover:-translate-y-2 transition-transform z-20">
            <Image src="/thumb2.png" alt="Thumbnail 2" fill className="object-cover" />
          </div>
          <div className="w-[120px] h-[80px] md:w-[150px] md:h-[100px] rounded-xl overflow-hidden relative shadow-2xl border border-white/30 transform hover:-translate-y-2 transition-transform z-10 opacity-90 brightness-75 hover:brightness-100">
            <Image src="/thumb3.png" alt="Thumbnail 3" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
