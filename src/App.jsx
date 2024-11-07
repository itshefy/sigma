import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { ScrollArea } from './components/ui/scroll-area';
import { Badge } from './components/ui/badge';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/ui/alert-dialog';

// Custom Components
import { BrandSignature } from './components/BrandSignature';
import { InteractiveBackground } from './components/InteractiveBackground';
import { OriginalBadge } from './components/OriginalBadge';
import { ShareResults } from './components/ShareResults';

// Data & Utils
import { SIGMA_DICTIONARY } from './lib/dictionaries/sigma';
import { ACHIEVEMENTS } from './lib/constants/achievements';

// Animation Variants
const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const cardTransition = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }
};

// Example Sentences
const EXAMPLE_SENTENCES = [
  {
    hebrew: "מה המצב אחי, הכל טוב?",
    sigma: "וואס אפ ברו, אול גוד סקיבידי?"
  },
  {
    hebrew: "אתה פשוט מלך אמיתי",
    sigma: "יו סימפלי ריל סיגמה קינג"
  },
  {
    hebrew: "זה היה מטורף לגמרי",
    sigma: "דט וואס סקיבידי קופים"
  },
  {
    hebrew: "אין מצב, אתה גאון",
    sigma: "נו קאפ פור ריל, יו סיגמה בריין"
  }
];

function App() {
  // State Management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [direction, setDirection] = useState('toSigma');
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('score');
    return saved ? parseInt(saved) : 0;
  });
  const [translations, setTranslations] = useState(() => {
    const saved = localStorage.getItem('translations');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('translate');
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  });

// Effects
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('translations', JSON.stringify(translations));
      localStorage.setItem('score', score.toString());
      localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    }, 1000);

    return () => clearInterval(saveInterval);
  }, [translations, score, unlockedAchievements]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Smooth transition for theme change
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && inputText && activeTab === 'translate') {
        handleTranslate();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [inputText, activeTab]);

  // Animation Controls
  const translateControls = {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      },
      exit: { 
        opacity: 0, 
        y: -20,
        transition: { duration: 0.3, ease: "easeIn" }
      }
    }
  };

  // Core Functions
  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const translated = direction === 'toSigma'
      ? inputText.split(' ').map(word => {
          const lowercaseWord = word.toLowerCase();
          const translation = SIGMA_DICTIONARY[lowercaseWord];
          // Add glow effect for translated words
          return translation ? `✨${translation}✨` : word;
        }).join(' ')
      : inputText.split(' ').map(word => {
          const regular = Object.entries(SIGMA_DICTIONARY)
            .find(([_, sigma]) => sigma.toLowerCase() === word.toLowerCase().replace(/✨/g, ''));
          return regular ? regular[0] : word;
        }).join(' ');

    // Animate output appearance
    setOutputText('');
    setTimeout(() => {
      setOutputText(translated);
    }, 100);
    
    const newTranslation = {
      id: Date.now(),
      input: inputText,
      output: translated,
      timestamp: new Date().toISOString(),
      direction
    };

    // Smooth list update
    setTranslations(prev => {
      const updated = [newTranslation, ...prev].slice(0, 100);
      localStorage.setItem('translations', JSON.stringify(updated));
      return updated;
    });

    // Score animation
    setScore(prev => {
      const newScore = prev + 10;
      localStorage.setItem('score', newScore);
      // Add floating score animation
      const scoreElement = document.createElement('div');
      scoreElement.className = 'floating-score';
      scoreElement.textContent = '+10';
      document.body.appendChild(scoreElement);
      setTimeout(() => scoreElement.remove(), 1000);
      return newScore;
    });

    checkAchievements(newTranslation);
  };

  const clearHistory = () => {
    // Animate list removal
    const listElement = document.querySelector('.history-list');
    if (listElement) {
      listElement.style.transform = 'scale(0.95)';
      listElement.style.opacity = '0';
    }
    
    setTimeout(() => {
      setTranslations([]);
      localStorage.setItem('translations', JSON.stringify([]));
    }, 300);
  };

  const checkAchievements = (newTranslation) => {
    const achievementsToUnlock = [];

    // First Translation
    if (translations.length === 0) {
      achievementsToUnlock.push(ACHIEVEMENTS.FIRST_TRANSLATION);
    }

    // Quick Start - Improved timing check
    const recentTranslations = translations
      .filter(t => Date.now() - new Date(t.timestamp).getTime() < 120000)
      .length;
    
    if (recentTranslations >= 4) {
      achievementsToUnlock.push(ACHIEVEMENTS.QUICK_START);
    }

    // Word Master Progress - Enhanced unique words tracking
    const uniqueWords = new Set(
      translations
        .concat(newTranslation)
        .map(t => t.output.split(' '))
        .flat()
        .map(word => word.toLowerCase().replace(/✨/g, ''))
    );

    if (uniqueWords.size >= 50 && !unlockedAchievements.includes('word_master')) {
      achievementsToUnlock.push(ACHIEVEMENTS.WORD_MASTER);
    }

    // Daily Dedication - Improved date tracking
    const uniqueDays = new Set(
      translations
        .concat(newTranslation)
        .map(t => new Date(t.timestamp).toDateString())
    ).size;

    if (uniqueDays >= 5 && !unlockedAchievements.includes('daily_dedication')) {
      achievementsToUnlock.push(ACHIEVEMENTS.DAILY_DEDICATION);
    }

    // Achievement Processing with Animation Queue
    let delayOffset = 0;
    achievementsToUnlock.forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id)) {
        setTimeout(() => {
          unlockAchievement(achievement);
        }, delayOffset);
        delayOffset += 1500; // Stagger achievements
      }
    });
  };

  const unlockAchievement = (achievement) => {
    if (!unlockedAchievements.includes(achievement.id)) {
      setUnlockedAchievements(prev => {
        const updated = [...prev, achievement.id];
        localStorage.setItem('unlockedAchievements', JSON.stringify(updated));
        return updated;
      });

      setCurrentAchievement(achievement);
      setShowConfetti(true);

      // Enhanced achievement notification
      setTimeout(() => {
        setCurrentAchievement(null);
        setTimeout(() => {
          setShowConfetti(false);
        }, 500);
      }, 3000);
    }
  };

return (
    <motion.div 
      className={`min-h-screen ${isDarkMode ? "dark" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InteractiveBackground />
      
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-yellow-50/30 to-white dark:from-gray-900 dark:via-yellow-900/5 dark:to-gray-900 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <motion.header 
          className="relative flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3">
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500">
                מתרגם סקיבידי
              </span>
            </motion.h1>
            <OriginalBadge />
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(prev => !prev)}
              className={`p-2 rounded-full transition-all shadow-lg ${
                isDarkMode 
                  ? 'bg-yellow-400 hover:bg-yellow-500' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? (
                  <svg 
                    className="w-5 h-5 text-gray-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg 
                    className="w-5 h-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge 
                className={`px-3 py-1.5 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                } shadow-lg`}
              >
                <motion.span 
                  className="mr-1.5"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⭐
                </motion.span>
                <motion.span
                  key={score}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {score}
                </motion.span>
              </Badge>
            </motion.div>
          </div>
        </motion.header>

{/* Main Content */}
        <motion.main
          variants={pageTransition}
          initial="hidden"
          animate="visible"
        >
          <Card 
            className={`relative overflow-hidden backdrop-blur-sm ${
              isDarkMode
                ? "bg-gray-800/30 border-gray-700 shadow-xl shadow-black/10"
                : "bg-white/70 border-gray-200 shadow-xl shadow-yellow-500/5"
            }`}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent"
              animate={{
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative p-6">
              <Tabs 
                defaultValue="translate" 
                value={activeTab} 
                onValueChange={setActiveTab} 
                dir="rtl"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-transparent p-1 mb-6 gap-2">
                  {['translate', 'history', 'achievements'].map((tab) => (
                    <TabsTrigger 
                      key={tab}
                      value={tab}
                      className={`rounded-lg px-4 py-2.5 text-base font-medium transition-all relative overflow-hidden ${
                        activeTab === tab
                          ? isDarkMode
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900"
                            : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                          : isDarkMode
                            ? "text-gray-300 hover:bg-gray-700/30"
                            : "text-gray-600 hover:bg-gray-100/50"
                      }`}
                    >
                      <motion.span
                        initial={false}
                        animate={{
                          y: activeTab === tab ? 0 : 20,
                          opacity: activeTab === tab ? 1 : 0.7
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {tab === 'translate' && 'תרגום'}
                        {tab === 'history' && 'היסטוריה'}
                        {tab === 'achievements' && 'הישגים'}
                      </motion.span>
                      
                      {activeTab === tab && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                          layoutId="activeTab"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="translate" className="space-y-6">
                  {/* Direction Button - Right Aligned */}
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
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <span className="relative px-4">
                          {direction === "toSigma" ? "עברית ← סיגמה" : "סיגמה ← עברית"}
                        </span>
                      </Button>
                    </motion.div>
                  </div>

{/* Input Field */}
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
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: inputText ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Translate Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleTranslate}
                      className={`w-full py-3 text-lg font-medium transition-all shadow-lg relative overflow-hidden ${
                        isDarkMode
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600"
                          : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600"
                      }`}
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
                      <span className="relative">תרגם</span>
                    </Button>
                  </motion.div>

                  {/* Output Area */}
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
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <p className="text-lg text-right relative">
                          {outputText.split(' ').map((word, index) => (
                            <motion.span
                              key={index}
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

                  {/* Examples Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`mt-8 p-4 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700/30"
                        : "bg-gray-100/30"
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-4 text-right">
                      דוגמאות לתרגום
                    </h3>
                    <div className="space-y-4">
                      {EXAMPLE_SENTENCES.map((example, index) => (
                        <motion.div
                          key={index}
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
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

{/* History Tab */}
                <TabsContent value="history" className="h-[400px]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-lg font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      היסטוריית תרגומים
                    </h2>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="destructive"
                            className={`${
                              isDarkMode
                                ? "bg-red-900/80 hover:bg-red-800"
                                : "bg-red-500/90 hover:bg-red-600"
                            } text-white shadow-lg`}
                          >
                            <motion.span
                              initial={{ opacity: 0.8 }}
                              whileHover={{ opacity: 1 }}
                            >
                              נקה היסטוריה
                            </motion.span>
                          </Button>
                        </motion.div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className={
                        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                      }>
                        <AlertDialogHeader>
                          <AlertDialogTitle className={
                            isDarkMode ? "text-white" : "text-gray-900"
                          }>
                            האם למחוק את כל ההיסטוריה?
                          </AlertDialogTitle>
                          <AlertDialogDescription className={
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }>
                            פעולה זו תמחק את כל היסטוריית התרגומים שלך. לא ניתן לבטל פעולה זו.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className={
                            isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : ""
                          }>ביטול</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={clearHistory}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            מחק היסטוריה
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <ScrollArea className="h-full pr-4">
                    {translations.length > 0 ? (
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {translations.map((item, index) => (
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
                        ))}
                      </motion.div>
                    ) : (
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
                    )}
                  </ScrollArea>
                </TabsContent>

{/* Achievements Tab */}
                <TabsContent value="achievements" className="h-[400px]">
                  <ScrollArea className="h-full pr-4">
                    <div className="flex justify-end mb-4">
                      <ShareResults 
                        score={score}
                        achievements={unlockedAchievements}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.values(ACHIEVEMENTS)
                        .filter(achievement => !achievement.hidden || unlockedAchievements.includes(achievement.id))
                        .map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
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
                              unlockedAchievements.includes(achievement.id)
                                ? "border-2 border-yellow-400"
                                : achievement.hidden
                                  ? "opacity-50"
                                  : ""
                            }`}
                          >
                            {/* Achievement Background Animation */}
                            {unlockedAchievements.includes(achievement.id) && (
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
                                  unlockedAchievements.includes(achievement.id)
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
                                      unlockedAchievements.includes(achievement.id)
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
                              
                              {unlockedAchievements.includes(achievement.id) && (
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
                        ))}
                        
                        {unlockedAchievements.length < Object.keys(ACHIEVEMENTS).length && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={`p-4 rounded-lg text-center ${
                              isDarkMode
                                ? "bg-gray-700/50 text-gray-300"
                                : "bg-gray-100/50 text-gray-600"
                            }`}
                          >
                            <motion.p
                              animate={{
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity
                              }}
                            >
                              יש עוד הישגים נסתרים! המשך לתרגם כדי לגלות אותם
                            </motion.p>
                          </motion.div>
                        )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </motion.main>

        {/* BrandSignature */}
        <BrandSignature />

{/* Achievement Notification */}
        <AnimatePresence>
          {currentAchievement && (
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
                    {currentAchievement.icon}
                  </motion.span>
                </motion.div>

                <div>
                  <motion.h3 
                    className="font-bold text-gray-900"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentAchievement.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentAchievement.description}
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
                      +{currentAchievement.points} נקודות
                    </motion.span>
                    <Badge className="bg-yellow-600/20 text-gray-900">
                      {currentAchievement.rarity}
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
          )}
        </AnimatePresence>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50"
            >
              {Array.from({ length: 50 }).map((_, i) => (
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
                    boxShadow: "0 0 4px rgba(251, 191, 36, 0.3)"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;