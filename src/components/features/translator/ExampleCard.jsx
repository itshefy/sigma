import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

export const ExampleCard = memo(({ example, index }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-3 rounded-lg ${
        isDarkMode
          ? "bg-gray-800/50 hover:bg-gray-800/70"
          : "bg-white/50 hover:bg-white/70"
      }`}
    >
      <p className="text-right mb-2 text-lg">{example.hebrew}</p>
      <p className={`text-right ${
        isDarkMode ? "text-yellow-400" : "text-yellow-600"
      }`}>{example.sigma}</p>
    </motion.div>
  );
});

ExampleCard.displayName = 'ExampleCard';