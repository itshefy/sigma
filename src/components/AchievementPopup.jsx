// src/components/AchievementPopup.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../components/ui/badge';

export const AchievementPopup = ({ achievement }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-xl shadow-2xl"
    >
      <div className="flex items-center gap-3">
        <motion.span 
          className="text-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          {achievement.icon}
        </motion.span>
        <div>
          <h3 className="font-bold">{achievement.title}</h3>
          <p className="text-sm opacity-90">{achievement.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <motion.span 
              className="text-xs"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, repeat: 3 }}
            >
              +{achievement.points}
            </motion.span>
            <span className="text-xs opacity-75">נקודות</span>
            <Badge variant="outline" className="text-xs">
              {achievement.rarity}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
};