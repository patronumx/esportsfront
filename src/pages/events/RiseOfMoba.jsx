import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/events/banner.png';
import mlbbHero from '../../assets/events/HERO.webp';
import hokHero from '../../assets/events/AUGRAN.png';

const RiseOfMoba = () => {
    return (
        <div className="min-h-screen bg-[#0a0510] text-white relative isolate selection:bg-purple-500/30 font-sans">

            {/* Background Image */}
            <div className="fixed inset-0 z-[-1]">
                <img
                    src={banner}
                    alt="Rise of MOBA Banner"
                    className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow ml-2"
                    style={{ animationDuration: '20s' }}
                />
                {/* Gradient Overlay for Purple/Blue Theme */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510]/80 via-[#1a0b2e]/50 to-[#0a0510]"></div>
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center mb-20 relative z-10">
                    {/* Animated Line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8 opacity-50 blur-sm"></div>

                    <h3 className="text-purple-300 font-bold tracking-[0.3em] text-sm md:text-lg uppercase mb-6 drop-shadow-lg font-display">
                        Patronum Esports Presents
                    </h3>

                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase font-display mb-4 leading-none perspective-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-400">
                            RISE OF MOBA
                        </span>
                    </h1>

                    {/* Subtitle Pill */}
                    <div className="relative inline-block mt-8 mb-6 group">
                        <div className="absolute inset-0 bg-purple-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border border-purple-500/30 px-8 py-2 rounded-full transform skew-x-[-10deg]">
                            <span className="block transform skew-x-[10deg] text-lg md:text-xl font-bold text-white tracking-[0.2em] uppercase font-display">
                                South Asian Championship
                            </span>
                        </div>
                    </div>

                    {/* Dates Pill */}
                    <div className="block mt-4">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-yellow-600 blur-lg opacity-20"></div>
                            <div className="relative bg-gradient-to-r from-yellow-900/40 via-yellow-800/40 to-yellow-900/40 border border-yellow-500/30 px-6 py-1.5 rounded-full transform skew-x-[-10deg]">
                                <span className="block transform skew-x-[10deg] text-sm md:text-base font-bold text-yellow-500 tracking-[0.15em] uppercase">
                                    Coming Soon
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">

                    {/* Card 1: Mobile Legends: Bang Bang */}
                    <div className="group relative">
                        {/* Card Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                        <div className="relative bg-[#0f1219]/60 backdrop-blur-xl border border-blue-500/20 rounded-[2rem] overflow-hidden hover:border-blue-400/40 transition-all duration-500 group-hover:transform group-hover:scale-[1.01] shadow-2xl">

                            {/* Image Container with Diagonal Slice */}
                            <div className="h-80 md:h-96 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1219] via-transparent to-transparent z-10"></div>
                                <img
                                    src={mlbbHero}
                                    alt="Mobile Legends: Bang Bang"
                                    className="w-full h-full object-cover md:object-[center_top] transform group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white drop-shadow-lg leading-none mb-2 font-display">
                                        Mobile Legends
                                        <span className="block text-2xl text-blue-400 mt-1 tracking-wide">Bang Bang</span>
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-4 space-y-6">
                                <div className="space-y-4">
                                    {/* Region Badge */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-12 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Target Region</p>
                                            <p className="text-xl text-white font-bold tracking-wide">Pakistan & South Asia</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                        Assemble your squad and dominate the Land of Dawn. Compete against the best teams from Pakistan and South Asia in this ultimate showdown.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Link to="/events/rise-of-moba/mlbb/register" className="block w-full">
                                        <button className="w-full py-4 bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl font-bold uppercase tracking-widest text-white hover:from-blue-600 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform skew-x-[-5deg]">
                                            <span className="block transform skew-x-[5deg]">Register Team</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Card 2: Honor of Kings */}
                    <div className="group relative">
                        {/* Card Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-yellow-600 to-orange-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                        <div className="relative bg-[#1a150b]/60 backdrop-blur-xl border border-yellow-500/20 rounded-[2rem] overflow-hidden hover:border-yellow-400/40 transition-all duration-500 group-hover:transform group-hover:scale-[1.01] shadow-2xl">

                            {/* Image Container */}
                            <div className="h-80 md:h-96 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a150b] via-transparent to-transparent z-10"></div>
                                <img
                                    src={hokHero}
                                    alt="Honor of Kings"
                                    className="w-full h-full object-cover object-[center_top] transform group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                    <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white drop-shadow-lg leading-none mb-2 font-display">
                                        Honor of
                                        <span className="block text-3xl text-yellow-400 mt-1 tracking-wide">Kings</span>
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-4 space-y-6">
                                <div className="space-y-4">
                                    {/* Region Badge */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-12 bg-yellow-500 rounded-full"></div>
                                        <div>
                                            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Target Region</p>
                                            <p className="text-xl text-white font-bold tracking-wide">South Asian Countries</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                        The Kings Rift awaits. Prove your might in the premier Honor of Kings tournament for South Asia.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Link to="/events/rise-of-moba/hok/register" className="block w-full">
                                        <button className="w-full py-4 bg-gradient-to-r from-yellow-700 to-orange-600 rounded-xl font-bold uppercase tracking-widest text-white hover:from-yellow-600 hover:to-orange-500 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transform skew-x-[-5deg]">
                                            <span className="block transform skew-x-[5deg]">Register Team</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Footer / Coming Soon */}
                <div className="text-center mt-24">
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-[0.2em] mb-4">Total Prizepool</p>
                    <h2 className="text-5xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter drop-shadow-2xl animate-pulse-slow">
                        Coming Soon
                    </h2>
                </div>

            </div>
        </div>
    );
};

export default RiseOfMoba;
