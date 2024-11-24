import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '../../ui/scroll-area';
import { useTheme } from '../../../context/ThemeContext';

const HistoryList = memo(({ translations, className = "" }) => {
  const { isDarkMode } = useTheme();

  const HistoryItem = memo(({ item, index }) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg transition-all ${
        isDarkMode
          ? "bg-gray-700/50 hover:bg-gray-700/70 shadow-lg shadow-black/5"
          : "bg-white/50 hover:bg-white/70 shadow-lg shadow-gray-200/50"
      }`}
    >
      <p className={`text-base font-medium ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}>{item.input}</p>
      <p className={`mt-2 text-sm ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}>{item.output}</p>
      <p className={`mt-2 text-xs ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      }`}>
        {new Date(item.timestamp).toLocaleString('he-IL')}
      </p>
    </motion.div>
  ));

  HistoryItem.displayName = 'HistoryItem';

  if (!translations.length) {
    return (
      <motion.div 
        className="h-full flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg 
            className={`w-16 h-16 mb-4 ${
              isDarkMode ? "text-gray-600" : "text-gray-400"
            }`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
        </motion.div>
        <p className={`text-lg font-medium ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          אין היסטוריית תרגומים עדיין
        </p>
        <p className={`mt-2 text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          התחל לתרגם כדי לראות את ההיסטוריה שלך
        </p>
      </motion.div>
    );
  }

  return (
    <ScrollArea className={`h-full pr-4 ${className}`}>
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence initial={false}>
          {translations.map((item, index) => (
            <HistoryItem key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </ScrollArea>
  );
});

HistoryList.displayName = 'HistoryList';

export default HistoryList;