
export type EmotionType = 'cute' | 'romantic' | 'emotional' | 'deep' | 'playful' | 'intense';
export type IntensityType = 'low' | 'medium' | 'high';

interface Analysis {
  mood: EmotionType;
  intensity: IntensityType;
}

const analysisCache = new Map<string, Analysis>();

export function analyzeEmotion(text: string): Analysis {
  if (!text) return { mood: 'romantic', intensity: 'medium' };
  
  // Basic Cache
  const cacheKey = text.trim();
  if (analysisCache.has(cacheKey)) return analysisCache.get(cacheKey)!;

  const t = text.toLowerCase();
  
  const keywords: Record<EmotionType, string[]> = {
    cute: ['sweet', 'cute', 'puppy', 'bunny', 'aww', 'lovely', 'smile', 'giggle', 'tiny', 'little', 'bubble'],
    romantic: ['love', 'heart', 'forever', 'always', 'beautiful', 'kiss', 'rose', 'marry', 'soul', 'darling'],
    emotional: ['miss', 'cry', 'tear', 'sad', 'feel', 'touch', 'pain', 'heart', 'broken', 'breath'],
    deep: ['eternity', 'universe', 'infinite', 'existence', 'destiny', 'fate', 'soulmate', 'galaxy', 'void'],
    playful: ['fun', 'laugh', 'joke', 'tease', 'silly', 'game', 'play', 'wink', 'crazy', 'mischief'],
    intense: ['fire', 'burn', 'wild', 'passion', 'need', 'crave', 'thirst', 'intense', 'wildly', 'crush']
  };

  const counts: Record<EmotionType, number> = {
    cute: 0, romantic: 0, emotional: 0, deep: 0, playful: 0, intense: 0
  };

  Object.entries(keywords).forEach(([mood, words]) => {
    words.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = t.match(regex);
      if (matches) counts[mood as EmotionType] += matches.length;
    });
  });

  // Find dominant mood - deterministic selection
  const mood = (Object.keys(counts) as EmotionType[]).sort((a, b) => {
    if (counts[b] !== counts[a]) return counts[b] - counts[a];
    return a.localeCompare(b); // Deterministic tie-breaker
  })[0];
  
  const exclamationCount = (text.match(/!/g) || []).length;
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  
  let intensity: IntensityType = 'medium';
  if (exclamationCount > 3 || counts[mood] > 5) intensity = 'high';
  else if (wordCount < 10 && exclamationCount === 0) intensity = 'low';

  const result = { mood, intensity };
  analysisCache.set(cacheKey, result);
  return result;
}
