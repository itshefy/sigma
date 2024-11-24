import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../../ui/badge';
import { useTheme } from '../../../context/ThemeContext';

const AchievementNotification = memo(({ achievement, onClose }) => {
  const { isDarkMode } = useTheme();

  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-2xl z-30 ${
          isDarkMode
            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
            : "bg-gradient-to-r from-yellow-500 to-yellow-600"
        }`}
      >
        <div className="flex items-center gap-3 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20
            }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: 3
              }}
            >
              {achievement.icon}
            </motion.span>
          </motion.div>

          <div>
            <motion.h3 
              className="font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {achievement.title}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {achievement.description}
            </motion.p>
            <motion.div 
              className="flex items-center gap-2 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span 
                className="text-sm font-medium text-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                +{achievement.points} נקודות
              </motion.span>
              <Badge className="bg-yellow-600/20 text-gray-900">
                {achievement.rarity}
              </Badge>
            </motion.div>
          </div>

          {/* Sparkles Effect */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 1, scale: 0 }}
              animate={{
                opacity: [1, 0],
                scale: [0, 1.5],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

AchievementNotification.displayName = 'AchievementNotification';

export default AchievementNotification;