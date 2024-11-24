// שיפור לוגיקת התרגום
export const translateText = (text, dictionary, direction) => {
  if (!text) return '';
  
  if (direction === 'toSigma') {
    // נסה קודם לתרגם משפטים שלמים
    const fullText = text.trim().toLowerCase();
    if (dictionary[fullText]) {
      return `✨${dictionary[fullText]}✨`;
    }

    // חיפוש ביטויים של שתי מילים
    const twoWordPhrases = findTwoWordPhrases(text, dictionary);
    if (twoWordPhrases.length > 0) {
      let translatedText = text.toLowerCase();
      twoWordPhrases.forEach(({ phrase, translation }) => {
        translatedText = translatedText.replace(phrase, `✨${translation}✨`);
      });
      return translatedText;
    }

    // תרגום מילה-מילה אם לא נמצאו ביטויים
    return text.split(' ').map(word => {
      const lowercaseWord = word.toLowerCase().trim();
      const translation = dictionary[lowercaseWord];
      return translation ? `✨${translation}✨` : word;
    }).join(' ');
  } else {
    // תרגום מסיגמה לעברית
    return text.split(' ').map(word => {
      const cleanWord = word.toLowerCase().replace(/✨/g, '').trim();
      const hebrewWord = Object.entries(dictionary).find(
        ([_, sigma]) => sigma.toLowerCase() === cleanWord
      );
      return hebrewWord ? hebrewWord[0] : word;
    }).join(' ');
  }
};

// פונקציית עזר למציאת ביטויים של שתי מילים
const findTwoWordPhrases = (text, dictionary) => {
  const words = text.toLowerCase().split(' ');
  const phrases = [];
  
  for (let i = 0; i < words.length - 1; i++) {
    const twoWords = `${words[i]} ${words[i + 1]}`;
    if (dictionary[twoWords]) {
      phrases.push({
        phrase: twoWords,
        translation: dictionary[twoWords]
      });
    }
  }
  
  return phrases;
};

const handleTranslate = () => {
  if (!inputText.trim()) return;

  const translated = direction === 'toSigma'
    ? translateToSigma(inputText)
    : translateFromSigma(inputText);

  setOutputText('');
  setTimeout(() => setOutputText(translated), 100);
  
  const newTranslation = {
    id: Date.now(),
    input: inputText,
    output: translated,
    timestamp: new Date().toISOString(),
    direction
  };

  updateTranslationHistory(newTranslation);
  updateScore();
  checkAchievements(newTranslation);
};

// פונקציה חדשה לתרגום לסיגמה
const translateToSigma = (text) => {
  // נרמל את הטקסט
  const normalizedText = text.trim().toLowerCase();
  
  // בדוק קודם משפטים שלמים
  if (SIGMA_DICTIONARY[normalizedText]) {
    return `✨${SIGMA_DICTIONARY[normalizedText]}✨`;
  }

  // מצא את המשפט הכי ארוך שמתאים
  const phrases = Object.keys(SIGMA_DICTIONARY)
    .filter(key => key.includes(' ')) // רק משפטים עם רווחים
    .sort((a, b) => b.length - a.length); // מסדר מהארוך לקצר

  for (const phrase of phrases) {
    if (normalizedText.includes(phrase)) {
      return normalizedText.replace(
        phrase, 
        `✨${SIGMA_DICTIONARY[phrase]}✨`
      );
    }
  }

  // אם לא נמצא משפט, תרגם מילה-מילה
  return text.split(' ').map(word => {
    const normalizedWord = word.toLowerCase().trim();
    const translation = SIGMA_DICTIONARY[normalizedWord];
    return translation ? `✨${translation}✨` : word;
  }).join(' ');
};

// פונקציה חדשה לתרגום מסיגמה
const translateFromSigma = (text) => {
  const words = text.split(' ');
  return words.map(word => {
    const cleanWord = word.toLowerCase().replace(/✨/g, '').trim();
    const hebrewEntry = Object.entries(SIGMA_DICTIONARY)
      .find(([_, sigma]) => {
        const normalizedSigma = sigma.toLowerCase().trim();
        return normalizedSigma === cleanWord;
      });
    return hebrewEntry ? hebrewEntry[0] : word;
  }).join(' ');
};