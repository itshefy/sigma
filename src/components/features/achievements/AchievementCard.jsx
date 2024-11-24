import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../ui/badge';
import { useTheme } from '../../../context/ThemeContext';

const AchievementCard = memo(({ 
  achievement, 
  isUnlocked, 
  index 
}) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400 }
      }}
      className={`p-4 rounded-lg transition-all relative overflow-hidden ${
        isDarkMode
          ? "bg-gray-700/50"
          : "bg-gray-100/50"
      } ${
        isUnlocked
          ? "border-2 border-yellow-400"
          : achievement.hidden
            ? "opacity-50"
            : ""
      }`}
    >
      {isUnlocked && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
      
      <div className="flex items-center gap-3 relative">
        <motion.span 
          className="text-2xl"
          animate={
            isUnlocked
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {achievement.icon}
        </motion.span>
        
        <div className="flex-1">
          <h3 className={`font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            {achievement.title}
          </h3>
          <p className={`text-sm mt-1 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <motion.span 
              className="text-yellow-500"
              animate={
                isUnlocked
                  ? { scale: [1, 1.1, 1] }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              {achievement.points} נקודות
            </motion.span>
            <Badge 
              variant="outline" 
              className={`text-xs ${
                isDarkMode
                  ? "border-gray-600 text-gray-300"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {achievement.rarity}
            </Badge>
          </div>
        </div>
        
        {isUnlocked && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              rotate: [0, 360]
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="text-xl"
          >
            ✨
          </motion.span>
        )}
      </div>
    </motion.div>
  );
});

AchievementCard.displayName = 'AchievementCard';

export default AchievementCard;