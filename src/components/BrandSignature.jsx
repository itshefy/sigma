// src/components/BrandSignature.jsx

import React from 'react';
import { motion } from 'framer-motion';
// תמונת הפרופיל מתיקיית public
import profileImage from '/images/signature-image.png';

export const BrandSignature = () => {
  const glowVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Backdrop Blur and Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm rounded-2xl" />

        {/* Main Container */}
        <motion.div
          className="relative flex items-center gap-4 px-8 py-4 rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Background Effects */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{
              background: 'linear-gradient(90deg, #ffd700, #daa520, #ffd700)',
              filter: 'blur(4px)'
            }}
            variants={glowVariants}
            animate="animate"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-yellow-500/5 dark:from-black/5 dark:to-yellow-500/10 rounded-2xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </motion.div>

          {/* Content */}
          <div className="relative flex items-center gap-4">
            {/* שפי */}
            <motion.span
              className="text-2xl font-semibold"
              style={{
                background: 'linear-gradient(to right, #daa520, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              whileHover={{ scale: 1.1 }}
            >
              שפי
            </motion.span>

            <motion.span
              className="text-xl"
              style={{ 
                color: 'rgba(218,165,32,0.8)',
                textShadow: '0 0 5px rgba(218,165,32,0.3)'
              }}
            >
              =
            </motion.span>

            {/* Animated Sigma */}
            <div className="relative">
              <motion.span
                className="text-2xl font-serif"
                animate={{
                  rotate: [0, 360],
                  y: [-2, 2, -2],
                  scale: [1, 1.1, 1],
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
                style={{ 
                  color: '#daa520',
                  textShadow: '0 0 8px rgba(218,165,32,0.4)'
                }}
              >
                Σ
              </motion.span>

              {/* Underline Effect */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                style={{
                  background: 'linear-gradient(to right, #daa520, #ffd700)'
                }}
              />

              {/* Verification Mark */}
              <motion.span
                className="absolute -right-4 -top-1 text-lg"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
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
              {/* Image Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(45deg, #daa520, #ffd700)',
                  filter: 'blur(3px)'
                }}
              />

              {/* Image */}
              <motion.div className="relative">
                <motion.img
                  src={profileImage}
                  alt="Profile"
                  className="relative w-12 h-12 rounded-full object-cover ring-2 ring-yellow-500/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    filter: 'contrast(1.1) brightness(1.1)'
                  }}
                />
                
                {/* Rotating Border */}
                <motion.div
                  className="absolute -inset-1 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, #ffd700 20%, transparent 40%)',
                    opacity: 0.5
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};