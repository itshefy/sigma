import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { ScrollArea } from './components/ui/scroll-area';
import { Badge } from './components/ui/badge';

// Custom Components
import { BrandSignature } from './components/BrandSignature';
import { InteractiveBackground } from './components/InteractiveBackground';
import { OriginalBadge } from './components/OriginalBadge';

// Data & Utils
import { SIGMA_DICTIONARY } from './lib/dictionaries/sigma';
import { ACHIEVEMENTS, RARITY_COLORS } from './lib/constants/achievements';
import { useMediaQuery } from './hooks/useMediaQuery';

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
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
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

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Theme Effect
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Enter Key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && inputText && activeTab === 'translate') {
        handleTranslate();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [inputText, activeTab]);

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const translated = direction === 'toSigma'
      ? inputText.split(' ').map(word => SIGMA_DICTIONARY[word.toLowerCase()] || word).join(' ')
      : inputText.split(' ').map(word => {
          const regular = Object.entries(SIGMA_DICTIONARY)
            .find(([_, sigma]) => sigma.toLowerCase() === word.toLowerCase());
          return regular ? regular[0] : word;
        }).join(' ');

    setOutputText(translated);
    
    const newTranslation = {
      id: Date.now(),
      input: inputText,
      output: translated,
      timestamp: new Date().toISOString(),
      direction
    };

    setTranslations(prev => {
      const updated = [newTranslation, ...prev].slice(0, 100);
      localStorage.setItem('translations', JSON.stringify(updated));
      return updated;
    });

    // Update Score
    setScore(prev => {
      const newScore = prev + 10;
      localStorage.setItem('score', newScore);
      return newScore;
    });

    // Update Streak
    setStreak(prev => {
      const newStreak = prev + 1;
      localStorage.setItem('streak', newStreak);
      return newStreak;
    });

    checkAchievements(newTranslation);
  };

  const checkAchievements = (newTranslation) => {
    const achievementsToUnlock = [];

    // First Translation
    if (translations.length === 0) {
      achievementsToUnlock.push(ACHIEVEMENTS.FIRST_TRANSLATION);
    }

    // Quick Start
    const recentTranslations = translations
      .filter(t => Date.now() - new Date(t.timestamp).getTime() < 120000)
      .length;
    
    if (recentTranslations >= 4) {
      achievementsToUnlock.push(ACHIEVEMENTS.QUICK_START);
    }

    // Word Master Progress
    const uniqueWords = new Set(translations.map(t => t.output.split(' ')).flat());
    if (uniqueWords.size >= 50 && !unlockedAchievements.includes('word_master')) {
      achievementsToUnlock.push(ACHIEVEMENTS.WORD_MASTER);
    }

    achievementsToUnlock.forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id)) {
        unlockAchievement(achievement);
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

      setTimeout(() => {
        setCurrentAchievement(null);
        setShowConfetti(false);
      }, 3000);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <InteractiveBackground />

      <div className="relative container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="relative flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              מתרגם סקיבידי
            </h1>
            <OriginalBadge />
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(prev => !prev)}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-400 hover:bg-yellow-500' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
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
            </motion.button>

            <div className="flex items-center gap-2">
              <Badge className={`px-3 py-1.5 ${
                isDarkMode
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-yellow-500 text-white"
              }`}>
                <motion.span 
                  className="mr-1.5"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.span>
                <span>{score}</span>
              </Badge>

              <Badge variant="outline" className={`px-3 py-1.5 ${
                isDarkMode
                  ? "border-yellow-400 text-yellow-400"
                  : "border-yellow-500 text-yellow-500"
              }`}>
                <motion.span 
                  className="mr-1.5"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔥
                </motion.span>
                <span>{streak}</span>
              </Badge>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Card className={`relative overflow-hidden ${
            isDarkMode
              ? "bg-gray-800/80 border-gray-700"
              : "bg-white/80 border-gray-200"
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent" />
            
            <div className="relative p-6">
              <Tabs 
                defaultValue="translate" 
                value={activeTab} 
                onValueChange={setActiveTab} 
                dir="rtl"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-transparent p-1 mb-6">
                  <TabsTrigger 
                    value="translate"
                    className={`rounded-lg px-4 py-2.5 text-base font-medium transition-all ${
                      activeTab === "translate"
                        ? isDarkMode
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-yellow-500 text-white"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700/50"
                          : "text-gray-600 hover:bg-gray-100/50"
                    }`}
                  >
                    תרגום
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history"
                    className={`rounded-lg px-4 py-2.5 text-base font-medium transition-all ${
                      activeTab === "history"
                        ? isDarkMode
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-yellow-500 text-white"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700/50"
                          : "text-gray-600 hover:bg-gray-100/50"
                    }`}
                  >
                    היסטוריה
                  </TabsTrigger>
                  <TabsTrigger 
                    value="achievements"
                    className={`rounded-lg px-4 py-2.5 text-base font-medium transition-all ${
                      activeTab === "achievements"
                        ? isDarkMode
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-yellow-500 text-white"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700/50"
                          : "text-gray-600 hover:bg-gray-100/50"
                    }`}
                  >
                    הישגים
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="translate" className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setDirection(prev => prev === "toSigma" ? "fromSigma" : "toSigma")}
                      className={`w-32 transition-all ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      <span className="relative">
                        {direction === "toSigma" ? "עברית ← סיגמה" : "סיגמה ← עברית"}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </Button>
                  </div>

                  <div className="relative">
                    <Input
                      dir="rtl"
                      placeholder="הקלד טקסט לתרגום..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className={`text-lg px-4 py-3 transition-all ${
                        isDarkMode
                          ? "bg-gray-700/50 text-white placeholder-gray-400"
                          : "bg-white/50 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: inputText ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <Button
                    onClick={handleTranslate}
                    className={`w-full py-3 text-lg font-medium transition-all ${
                      isDarkMode
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    <span className="relative">תרגם</span>
                  </Button>

                  <AnimatePresence mode="wait">
                    {outputText && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-lg ${
                          isDarkMode
                            ? "bg-gray-700/50 text-white"
                            : "bg-gray-100/50 text-gray-900"
                        }`}
                      >
                        <p className="text-lg text-right">{outputText}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="history" className="h-[400px]">
                  <ScrollArea className="h-full pr-4">
                    {translations.length > 0 ? (
                      <div className="space-y-4">
                        {translations.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg transition-all ${
                              isDarkMode
                                ? "bg-gray-700/50 hover:bg-gray-700"
                                : "bg-gray-100/50 hover:bg-gray-100"
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
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center">
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
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="achievements" className="h-[400px]">
                  <ScrollArea className="h-full pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.values(ACHIEVEMENTS)
                        .filter(achievement => !achievement.hidden || unlockedAchievements.includes(achievement.id))
                        .map((achievement) => (
                          <motion.div
                            key={achievement.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-lg transition-all ${
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
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{achievement.icon}</span>
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
                                  <span className={RARITY_COLORS[achievement.rarity]}>
                                    {achievement.points} נקודות
                                  </span>
                                  <Badge variant="outline" className={`text-xs ${
                                    isDarkMode
                                      ? "border-gray-600 text-gray-300"
                                      : "border-gray-300 text-gray-600"
                                  }`}>
                                    {achievement.rarity}
                                  </Badge>
                                </div>
                              </div>
                              {unlockedAchievements.includes(achievement.id) && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
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
                            className={`p-4 rounded-lg text-center ${
                              isDarkMode
                                ? "bg-gray-700/50 text-gray-300"
                                : "bg-gray-100/50 text-gray-600"
                            }`}
                          >
                            <p>יש עוד הישגים נסתרים! המשך לתרגם כדי לגלות אותם</p>
                          </motion.div>
                        )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </main>

        <BrandSignature />

        <AnimatePresence>
          {currentAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg ${
                isDarkMode
                  ? "bg-yellow-400"
                  : "bg-yellow-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentAchievement.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {currentAchievement.title}
                  </h3>
                  <p className="text-sm text-gray-800">
                    {currentAchievement.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium text-gray-900">
                      +{currentAchievement.points} נקודות
                    </span>
                    <Badge className="bg-yellow-600/20 text-gray-900">
                      {currentAchievement.rarity}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-500 rounded-full"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2
                }}
                animate={{
                  x: window.innerWidth * Math.random(),
                  y: window.innerHeight * Math.random(),
                  opacity: 0
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.02
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
          