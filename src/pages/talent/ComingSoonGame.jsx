import React from 'react';
import { motion } from 'framer-motion';
import Hyperspeed from '../../components/Hyperspeed';
import { FaRocket } from 'react-icons/fa';

const ComingSoonGame = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden flex items-center justify-center">
             <div className="fixed inset-0 z-0 opacity-40">
                <Hyperspeed />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center p-8 border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl max-w-2xl mx-4"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex justify-center mb-6"
                >
                    <FaRocket className="text-6xl text-purple-500" />
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-4 tracking-tighter">
                    Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Soon</span>
                </h1>
                
                <p className="text-zinc-400 text-lg uppercase tracking-widest font-bold">
                    Roster Reveal In Progress
                </p>
                <div className="mt-8">
                     <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default ComingSoonGame;
