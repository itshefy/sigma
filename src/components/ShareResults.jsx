// src/components/ShareResults.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share } from 'lucide-react';
import { Button } from './ui/button';

export const ShareResults = ({ score, achievements }) => {
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const shareText = `🎯 הגעתי ל-${score} נקודות במתרגם סקיבידי!\n` +
                   `🏆 פתחתי ${achievements.length} הישגים\n` +
                   `✨ בואו להיות סיגמה: https://sigma.translator.com`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'מתרגם סקיבידי - התוצאות שלי',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 2000);
      } catch (clipboardErr) {
        console.error('Failed to copy:', clipboardErr);
      }
    }
  };

  const buttonVariants = {
    rest: { 
      scale: 1,
      backgroundColor: "rgb(245, 158, 11)",
      boxShadow: "0 4px 6px -1px rgba(245, 158, 11, 0.2)"
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgb(234, 88, 12)",
      boxShadow: "0 10px 15px -3px rgba(245, 158, 11, 0.3)"
    },
    tap: { 
      scale: 0.95,
      backgroundColor: "rgb(217, 119, 6)"
    }
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 15 },
    tap: { rotate: -15 }
  };

  const trophyVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 1
        }
      }
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          onClick={handleShare}
          variants={buttonVariants}
          className="flex items-center gap-3 px-6 py-3 rounded-xl text-white font-medium relative overflow-hidden"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Button Content */}
          <motion.div className="relative flex items-center gap-3">
            <motion.div variants={iconVariants}>
              <Share className="w-5 h-5" />
            </motion.div>
            <span>שתף תוצאות</span>
            <motion.span
              variants={trophyVariants}
              className="text-xl"
            >
              🏆
            </motion.span>
          </motion.div>
        </Button>
      </motion.div>

      {/* Copied Toast */}
      <AnimatePresence>
        {showCopiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg shadow-xl"
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15
                }}
              >
                ✨
              </motion.span>
              <span>הטקסט הועתק ללוח!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Display */}
      <motion.div
        className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      >
        {score}
      </motion.div>
    </div>
  );
};