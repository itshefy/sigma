import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

export const TranslationOutput = memo(({ outputText }) => {
  const { isDarkMode } = useTheme();

  const words = outputText?.split(' ') || [];
  
  return (
    <AnimatePresence mode="wait">
      {outputText && (
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 1
          }}
          className={`p-4 rounded-lg relative overflow-hidden ${
            isDarkMode
              ? "bg-gray-700/50 text-white"
              : "bg-gray-100/50 text-gray-900"
          }`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <p className="text-lg text-right relative">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className="inline-block mx-1"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

TranslationOutput.displayName = 'TranslationOutput';