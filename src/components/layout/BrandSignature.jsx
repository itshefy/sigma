import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '../../context/ThemeContext';
import profileImage from '/images/signature-image.png';

const BrandSignature = memo(() => {
  const { isDarkMode } = useTheme();

  const sigmaVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.05, 1]
    },
    transition: {
      rotate: {
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      },
      scale: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shineVariants = {
    animate: {
      x: ['-100%', '200%']
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 2
    }
  };

  return (
    <motion.div 
      className="fixed bottom-4 left-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-[2px] px-4 py-3 rounded-xl shadow-md">
        <div className="relative flex items-center gap-4">
          {/* Sigma Symbol */}
          <motion.span
            className="text-2xl font-serif text-[#daa520]"
            animate={sigmaVariants.animate}
            transition={sigmaVariants.transition}
          >
            Σ
          </motion.span>

          <div className="relative">
            {/* Text */}
            <span
              className="text-2xl font-semibold"
              style={{
                background: 'linear-gradient(to right, #daa520, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              שפי
            </span>
            
            {/* Animated Underline */}
            <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#daa520] to-[#ffd700]">
              <motion.div
                className="absolute top-0 left-0 h-full w-1/2"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.3), transparent)',
                }}
                animate={shineVariants.animate}
                transition={shineVariants.transition}
              />
            </div>
            
            {/* Verification Mark */}
            <motion.span
              className="absolute -right-4 -top-1 text-lg text-[#4CAF50]"
              animate={{
                scale: [1, 1.1, 1],
                y: [-1, 1, -1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1
              }}
            >
              ✓
            </motion.span>
          </div>

          {/* Profile Image */}
          <div className="relative ml-3">
            <motion.div
              className="absolute -inset-1 rounded-full opacity-20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: 'conic-gradient(from 0deg, transparent, #ffd700, transparent)',
              }}
            />
            
            <LazyLoadImage
              src={profileImage}
              alt="Profile"
              width={48}
              height={48}
              className="relative rounded-full object-cover ring-1 ring-yellow-500/20"
              effect="opacity"
              placeholder={
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
              }
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

BrandSignature.displayName = 'BrandSignature';

export default BrandSignature;  