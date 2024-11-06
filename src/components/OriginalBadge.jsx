import React from 'react';
import { motion } from 'framer-motion';

export const OriginalBadge = () => {
  return (
    <motion.div
      className="absolute -top-2 -right-2 z-10"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm" />
        <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-xs font-bold text-black px-3 py-1 rounded-full border-2 border-white shadow-lg">
          המקורי
        </div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle, rgba(250,204,21,0.2) 0%, transparent 50%)',
              'radial-gradient(circle, rgba(250,204,21,0.2) 100%, transparent 100%)',
              'radial-gradient(circle, rgba(250,204,21,0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};