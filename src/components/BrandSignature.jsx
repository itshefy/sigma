// src/components/BrandSignature.jsx

import React from 'react';
import { motion } from 'framer-motion';

export const BrandSignature = () => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center gap-4 px-8 py-4">
        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(90deg, #ffd700, #daa520, #ffd700)',
            opacity: 0.2,
            filter: 'blur(4px)'
          }}
        />
        
        {/* Background Shimmer */}
        <motion.div
          className="absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-xl overflow-hidden"
        >
          <motion.div
            className="w-[500%] h-full absolute"
            animate={{
              x: ['-50%', '0%', '-50%']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.1), transparent)',
            }}
          />
        </motion.div>

        {/* Content Container */}
        <div className="relative flex items-center gap-4 px-4">
          {/* Animated Sigma */}
          <motion.span
            className="text-2xl font-serif"
            animate={{
              rotate: [0, 360],
              y: [-2, 2, -2],
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{ color: '#daa520' }}
          >
            Σ
          </motion.span>

          <motion.span
            className="text-xl font-serif"
            style={{ color: 'rgba(218,165,32,0.8)' }}
          >
            =
          </motion.span>

          <div className="relative">
            <motion.span
              className="text-2xl font-semibold"
              style={{
                background: 'linear-gradient(to right, #daa520, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              שפי
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-[2px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              style={{
                background: 'linear-gradient(to right, #daa520, #ffd700)',
              }}
            />
            
            {/* Dynamic V Check Mark */}
            <motion.span
              className="absolute -right-4 -top-1 text-lg"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
                y: [-1, 1, -1]
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                color: '#4CAF50',
                textShadow: '0 0 5px rgba(76,175,80,0.3)',
                transformOrigin: 'center bottom'
              }}
            >
              ✓
            </motion.span>
          </div>

          {/* Profile Image */}
          <motion.div
            className="relative ml-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'linear-gradient(45deg, #daa520, #ffd700)',
                   opacity: 0.3,
                   filter: 'blur(3px)'
                 }} />
            <motion.img
              src="/src/assets/signature-image.png"
              alt="Profile"
              className="relative w-12 h-12 rounded-full object-cover ring-2 ring-yellow-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                filter: 'contrast(1.1) brightness(1.1)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};