import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useDebounce } from '../../../lib/hooks/useDebounce';
import { useTheme } from '../../../context/ThemeContext';

export const TranslationInput = memo(({
  inputText,
  setInputText,
  direction,
  setDirection,
  onTranslate,
  isLoading
}) => {
  const { isDarkMode } = useTheme();
  const debouncedInputText = useDebounce(inputText, 300);

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setDirection(prev => prev === "toSigma" ? "fromSigma" : "toSigma")}
            className={`relative overflow-hidden ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative px-4 py-2">
              {direction === "toSigma" ? "עברית ← סיגמה" : "סיגמה ← עברית"}
            </span>
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="relative"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Input
          dir="rtl"
          placeholder="הקלד טקסט לתרגום..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={`text-lg px-4 py-3 transition-all shadow-sm ${
            isDarkMode
              ? "bg-gray-800/50 text-white placeholder-gray-400 border-gray-700"
              : "bg-white/80 text-gray-900 placeholder-gray-500 border-gray-200"
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              onTranslate();
            }
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: debouncedInputText ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onTranslate}
          disabled={isLoading || !inputText.trim()}
          className={`w-full py-3 text-lg font-medium transition-all shadow-lg relative overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600"
              : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600"
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            style={{ opacity: 0.1 }}
          />
          <span className="relative">
            {isLoading ? 'מתרגם...' : 'תרגם'}
          </span>
        </Button>
      </motion.div>
    </div>
  );
});

TranslationInput.displayName = 'TranslationInput';