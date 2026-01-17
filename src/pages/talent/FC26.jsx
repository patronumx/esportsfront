import React from 'react';
import { motion } from 'framer-motion';
import Hyperspeed from '../../components/Hyperspeed';
import { FaFutbol } from 'react-icons/fa';

const FC26 = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden flex items-center justify-center">
            <div className="fixed inset-0 z-0 opacity-40">
                <Hyperspeed />
            </div>

            <div className="relative z-10 mx-4 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center max-w-5xl"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="flex justify-center mb-12 relative"
                    >
                        <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full"></div>
                        <FaFutbol className="text-8xl md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-green-600 drop-shadow-[0_0_35px_rgba(16,185,129,0.6)]" />
                    </motion.div>

                    <h1 className="text-5xl md:text-9xl font-black italic uppercase mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-sm pr-4 whitespace-nowrap">
                        Coming Soon
                    </h1>

                    <div className="h-2 w-48 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-12 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>

                    <p className="text-zinc-300 text-3xl md:text-5xl uppercase tracking-[0.2em] font-black leading-relaxed text-shadow-lg mb-6">
                        The Pitch is being <span className="text-emerald-500">Prepared</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default FC26;
