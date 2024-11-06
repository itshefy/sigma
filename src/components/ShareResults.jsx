
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Share } from 'lucide-react';

export const ShareResults = ({ score, achievements }) => {
  const handleShare = async () => {
    const text = `🎯 הגעתי ל-${score} נקודות במתרגם סקיבידי!\n` +
                `🏆 פתחתי ${achievements.length} הישגים\n` +
                `🌟 נסו גם אתם: https://sigma.translate.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'מתרגם סקיבידי',
          text: text
        });
      } catch (err) {
        console.error('Error sharing:', err);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleShare}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
      >
        <Share size={18} />
        <span>שתף תוצאות</span>
      </Button>
    </motion.div>
  );
};