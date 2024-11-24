import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const OriginalBadge = memo(() => {
  const { isDarkMode } = useTheme();

  const badgeVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const shimmerVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "linear",
        repeatDelay: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={badgeVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative px-3 py-1 rounded-full ${
        isDarkMode
          ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10'
          : 'bg-gradient-to-r from-yellow-50 to-yellow-100'
      }`}
    >
      <div className="relative flex items-center gap-1">
        <motion.span
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`text-sm ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
          }`}
        >
          ★
        </motion.span>
        
        <span className={`text-sm font-medium ${
          isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
        }`}>
          המקורי
        </span>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(
            to right,
            ${isDarkMode 
              ? 'rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%'
              : 'rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%'
            }
          )`,
          maskImage: 'linear-gradient(to right, black, black)',
          WebkitMaskImage: 'linear-gradient(to right, black, black)'
        }}
      />

      {/* Border Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -inset-[1px] rounded-full"
        style={{
          background: `linear-gradient(to right, ${
            isDarkMode 
              ? '#F59E0B, #D97706'
              : '#FCD34D, #F59E0B'
          })`,
          opacity: 0.2,
          filter: 'blur(2px)',
          zIndex: -1
        }}
      />
    </motion.div>
  );
});

OriginalBadge.displayName = 'OriginalBadge';

export default OriginalBadge;