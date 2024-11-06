export const ACHIEVEMENTS = {
  // הישגי התחלה
  FIRST_TRANSLATION: {
    id: "first_translation",
    title: "סקיבידי רוקי",
    description: "התרגום הראשון שלך!",
    icon: "🎯",
    points: 50,
    rarity: "common",
    hidden: false
  },
  QUICK_START: {
    id: "quick_start",
    title: "זינוק מהיר",
    description: "5 תרגומים ב-2 דקות",
    icon: "⚡",
    points: 100,
    rarity: "uncommon",
    hidden: false
  },
  
  // הישגי התמדה
  DAILY_GRIND: {
    id: "daily_grind",
    title: "סיגמה יומי",
    description: "7 ימים רצופים של תרגום",
    icon: "📅",
    points: 200,
    rarity: "rare",
    hidden: false
  },
  SIGMA_LIFESTYLE: {
    id: "sigma_lifestyle",
    title: "אורח חיים סיגמה",
    description: "30 ימים רצופים של תרגום",
    icon: "🌟",
    points: 500,
    rarity: "epic",
    hidden: false
  },
  
  // הישגי מומחיות
  WORD_MASTER: {
    id: "word_master",
    title: "שליט המילים",
    description: "השתמש ב-50 מילים שונות",
    icon: "📚",
    points: 300,
    rarity: "rare",
    hidden: true
  },
  SIGMA_SCHOLAR: {
    id: "sigma_scholar",
    title: "מלומד סיגמה",
    description: "השתמש בכל המילים במילון",
    icon: "🎓",
    points: 1000,
    rarity: "legendary",
    hidden: true
  },
  
  // הישגי זמן
  NIGHT_SIGMA: {
    id: "night_sigma",
    title: "סיגמה לילי",
    description: "תרגם ב-3 לפנות בוקר",
    icon: "🌙",
    points: 150,
    rarity: "rare",
    hidden: true
  },
  EARLY_GRIND: {
    id: "early_grind",
    title: "משכים קום",
    description: "תרגם ב-5 בבוקר",
    icon: "🌅",
    points: 150,
    rarity: "rare",
    hidden: true
  },
  
  // הישגי נפח
  TRANSLATION_MACHINE: {
    id: "translation_machine",
    title: "מכונת תרגום",
    description: "500 תרגומים בסך הכל",
    icon: "⚙️",
    points: 400,
    rarity: "epic",
    hidden: true
  },
  SIGMA_LEGEND: {
    id: "sigma_legend",
    title: "אגדת סיגמה",
    description: "1000 תרגומים בסך הכל",
    icon: "👑",
    points: 1000,
    rarity: "legendary",
    hidden: true
  },
  
  // הישגים מיוחדים
  COMBO_MASTER: {
    id: "combo_master",
    title: "מלך הקומבו",
    description: "10 תרגומים מושלמים ברצף",
    icon: "🎯",
    points: 250,
    rarity: "epic",
    hidden: true
  },
  SPEED_DEMON: {
    id: "speed_demon",
    title: "מהיר כמו סיגמה",
    description: "20 תרגומים בדקה",
    icon: "⚡",
    points: 500,
    rarity: "legendary",
    hidden: true
  },
  
  // הישגים סודיים
  EASTER_EGG: {
    id: "easter_egg",
    title: "סוד סיגמה",
    description: "מצאת משהו מיוחד...",
    icon: "🥚",
    points: 1000,
    rarity: "mythic",
    hidden: true
  }
};

// קטגוריות נדירות
export const RARITY_COLORS = {
  common: "text-gray-500",
  uncommon: "text-green-500",
  rare: "text-blue-500",
  epic: "text-purple-500",
  legendary: "text-yellow-500",
  mythic: "text-red-500"
};