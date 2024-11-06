// src/lib/constants/achievements.js

export const RARITY_COLORS = {
  common: "text-gray-600 dark:text-gray-400",
  uncommon: "text-green-600 dark:text-green-400",
  rare: "text-blue-600 dark:text-blue-400",
  epic: "text-purple-600 dark:text-purple-400",
  legendary: "text-yellow-600 dark:text-yellow-400"
};

export const ACHIEVEMENTS = {
  FIRST_TRANSLATION: {
    id: "first_translation",
    title: "צעדים ראשונים",
    description: "ביצעת את התרגום הראשון שלך",
    icon: "🎯",
    points: 50,
    rarity: "common",
    hidden: false
  },
  QUICK_START: {
    id: "quick_start",
    title: "זריז ומהיר",
    description: "ביצעת 4 תרגומים תוך 2 דקות",
    icon: "⚡",
    points: 100,
    rarity: "uncommon",
    hidden: false
  },
  WORD_MASTER: {
    id: "word_master",
    title: "שולט במילים",
    description: "תרגמת 50 מילים ייחודיות",
    icon: "📚",
    points: 200,
    rarity: "rare",
    hidden: false
  },
  TRANSLATION_STREAK: {
    id: "translation_streak",
    title: "רצף מושלם",
    description: "השלמת 10 תרגומים ברצף",
    icon: "🔥",
    points: 150,
    rarity: "uncommon",
    hidden: false
  },
  DICTIONARY_EXPLORER: {
    id: "dictionary_explorer",
    title: "חוקר המילון",
    description: "תרגמת 100 מילים ייחודיות",
    icon: "🗺️",
    points: 300,
    rarity: "epic",
    hidden: true
  },
  TRANSLATION_MASTER: {
    id: "translation_master",
    title: "מאסטר התרגום",
    description: "צברת 1000 נקודות",
    icon: "👑",
    points: 500,
    rarity: "legendary",
    hidden: true
  },
  DAILY_DEDICATION: {
    id: "daily_dedication",
    title: "מסירות יומית",
    description: "ביצעת תרגומים ב-5 ימים שונים",
    icon: "📅",
    points: 250,
    rarity: "rare",
    hidden: false
  },
  SPEED_DEMON: {
    id: "speed_demon",
    title: "מהיר כמו שד",
    description: "ביצעת 10 תרגומים תוך 5 דקות",
    icon: "💨",
    points: 400,
    rarity: "epic",
    hidden: true
  },
  PERFECT_COMBO: {
    id: "perfect_combo",
    title: "קומבו מושלם",
    description: "ביצעת 20 תרגומים ברצף ללא הפסקה",
    icon: "⚡",
    points: 600,
    rarity: "legendary",
    hidden: true
  },
  SHARING_MASTER: {
    id: "sharing_master",
    title: "מלך השיתופים",
    description: "שיתפת את התוצאות שלך 5 פעמים",
    icon: "🌟",
    points: 200,
    rarity: "rare",
    hidden: false
  }
};