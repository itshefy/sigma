import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Confetti = memo(({ show, particleCount = 50 }) => {
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{
                opacity: 1,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                backgroundColor: i % 2 === 0 ? "#fbbf24" : "#f59e0b"
              }}
              animate={{
                opacity: 0,
                x: window.innerWidth * Math.random(),
                y: window.innerHeight * Math.random(),
                scale: [1, 0.5],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.02,
                ease: "easeOut"
              }}
              style={{
                boxShadow: `0 0 4px ${isDarkMode ? 'rgba(251, 191, 36, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Confetti.displayName = 'Confetti';

export default Confetti;