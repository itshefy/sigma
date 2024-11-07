
import React from 'react';
import { motion } from 'framer-motion';

export const OriginalBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="relative"
    >
      <motion.div
        className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="text-sm font-medium text-yellow-600 dark:text-yellow-400"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          המקורי
        </motion.span>
      </motion.div>
    </motion.div>
  );
};