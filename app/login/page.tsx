import { ArrowLeft, UserRound, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="min-h-screen bg-[#0b0c13] text-white flex items-center justify-center p-6 relative font-sans overflow-hidden">
            {/* Background glow effects (optional subtle touches to match the premium dark UI) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(20,30,60,0.4),transparent_50%)] pointer-events-none" />

            {/* Back button */}
            <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors z-10">
                <ArrowLeft size={28} strokeWidth={1.5} />
            </Link>

            <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 items-center relative z-10 w-[95%]">

                {/* Left Side Form container */}
                <div className="w-full max-w-[380px] flex flex-col mx-auto lg:ml-8 mt-12 lg:mt-0">
                    <h1 className="text-[3.5rem] font-bold mb-8 tracking-tight text-white leading-tight">Welcome</h1>

                    {/* Tabs */}
                    <div className="flex gap-10 mb-10 text-[0.95rem] font-semibold tracking-wide border-b border-transparent">
                        <div className="relative pb-1 border-b-[3px] border-[#3192f1] text-[#f8f8f8]">
                            LOGIN
                            {/* Soft glow for the active tab */}
                            <div className="absolute -bottom-[3px] left-0 w-full h-[3px] bg-[#3192f1] blur-[4px] opacity-70" />
                        </div>
                        <Link href="/register" className="text-gray-400/80 hover:text-white transition-colors pb-1">SIGNUP</Link>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="User"
                                className="w-full bg-transparent border border-gray-600/70 rounded-[14px] px-5 py-[1.1rem] text-[0.85rem] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3192f1] focus:ring-1 focus:ring-[#3192f1]/50 transition-all font-medium pr-12"
                            />
                            <UserRound className="absolute right-5 top-1/2 -translate-y-1/2 text-white" size={16} fill="white" strokeWidth={1} />
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-transparent border border-gray-600/70 rounded-[14px] px-5 py-[1.1rem] text-[0.85rem] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3192f1] focus:ring-1 focus:ring-[#3192f1]/50 transition-all font-medium pr-12"
                            />
                            <EyeOff className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} strokeWidth={2} />
                        </div>

                        <div className="text-center mt-2">
                            <Link href="#" className="text-gray-400 text-[0.85rem] hover:text-white transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                className="bg-[#3aa3fc] hover:bg-[#2c8ee6] active:scale-95 text-white text-[0.95rem] font-medium rounded-[14px] px-[3.5rem] py-[0.7rem] transition-all"
                            >
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side Image */}
                <div className="hidden lg:block w-full h-[88vh] max-h-[900px] relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <Image
                        src="/mystical-bg.png"
                        alt="Mystical blue scene"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                </div>
            </div>
        </div>
    );
}
