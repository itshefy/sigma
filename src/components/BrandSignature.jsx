import React from 'react';
import { motion } from 'framer-motion';

export const BrandSignature = () => {
  return (
    <motion.div 
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center gap-4 bg-black/80 backdrop-blur-lg p-4 rounded-2xl border border-yellow-500/20 shadow-xl">
        <motion.div
          className="relative w-12 h-12 sm:w-16 sm:h-16"
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <img
              src="/sigma-profile.jpg" // תחליף עם הנתיב לתמונה שלך
              alt="Sigma Brand"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-blue-500/20 rounded-xl"
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <motion.span
              className="text-2xl sm:text-3xl font-bold text-yellow-500"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Σ
            </motion.span>
            <motion.span
              className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
            >
              שפי
            </motion.span>
          </div>
          <span className="text-xs text-white/60">The Original</span>
        </div>
        
        <motion.div
          className="ml-2 bg-yellow-500 rounded-full p-2"
          whileHover={{ scale: 1.1, rotate: 360 }}
        >
          <svg 
            className="w-4 h-4 text-black" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};