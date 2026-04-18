/**
 * Simulated AI service for frontend-only demo mode.
 * Provides poetic re-writes and suggestions using local logic.
 */

export const getAIPolish = async (text: string, mood: string = 'romantic') => {
  // Simulate delay for immersion
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const poeticPrefixes = [
    "In the quiet corners of my soul, ",
    "Beneath the starlit canopy, ",
    "Like a melody that never fades, ",
    "With every heartbeat I find, ",
    "Through the whispers of the wind, "
  ];
  
  const poeticSuffixes = [
    " ...forever yours.",
    " ...a story written in the stars.",
    " ...my infinite sanctuary.",
    " ...today, tomorrow, and always.",
  ];

  const prefix = poeticPrefixes[Math.floor(Math.random() * poeticPrefixes.length)];
  const suffix = poeticSuffixes[Math.floor(Math.random() * poeticSuffixes.length)];

  return `${prefix}${text}${suffix}`;
};

export const getMessageSuggestions = async (mood: string, isPro: boolean) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    "To the one who makes my world spin faster...",
    "Every day with you is a new favorite memory.",
    "I never knew what was missing until I found you."
  ];
};

export const getTitleSuggestions = async (day: string, message: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    "Our Eternal Spark",
    "A Journey of Us",
    "Whispers of the Heart",
    "Infinite Affection"
  ];
};

export const generateMilestoneImage = async (prompt: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const seed = prompt.split(' ').join('-');
  return `https://picsum.photos/seed/${seed}/800/800`;
};
