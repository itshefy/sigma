import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';

const ShareResults = memo(({ score, achievements }) => {
  const { isDarkMode } = useTheme();
  const [isSharing, setIsSharing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const generateShareText = () => {
    const unlockedCount = achievements.length;
    const totalAchievements = 10; // או כמה שיש בפועל
    
    return `
🏆 הישגים במתרגם סיגמה:
✨ ניקוד: ${score}
🎯 הישגים שנפתחו: ${unlockedCount}/${totalAchievements}

בואו לנסות גם:
https://sigma-translator.com
    `.trim();
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = generateShareText();

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'מתרגם סיגמה - התוצאות שלי',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={handleShare}
        disabled={isSharing}
        className={`relative overflow-hidden ${
          isDarkMode
            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        } font-medium px-4 py-2 rounded-lg`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="relative flex items-center gap-2">
          <span>{isSharing ? 'שיתוף...' : showCopied ? 'הועתק!' : 'שתף תוצאות'}</span>
          <motion.span
            animate={{
              rotate: isSharing ? 360 : 0
            }}
            transition={{
              duration: 1,
              repeat: isSharing ? Infinity : 0,
              ease: "linear"
            }}
          >
            {isSharing ? '⌛' : '📤'}
          </motion.span>
        </div>
      </Button>

      {showCopied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute mt-2 px-3 py-1 rounded text-sm ${
            isDarkMode
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          הטקסט הועתק ללוח!
        </motion.div>
      )}
    </motion.div>
  );
});

ShareResults.displayName = 'ShareResults';

export default ShareResults;