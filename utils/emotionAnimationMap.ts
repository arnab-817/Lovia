
import { ValentineDay } from '../types';
import { EmotionType } from './emotionAnalyzer';
import { ANIMATIONS } from '../assets/animations';

export function getAnimationData(day: ValentineDay, mood: EmotionType): any {
  // Day priority logic
  switch (day) {
    case 'Rose Day': return ANIMATIONS.rose;
    case 'Chocolate Day': return ANIMATIONS.chocolate;
    case 'Teddy Day': return ANIMATIONS.teddy;
    case 'Hug Day': return ANIMATIONS.hug;
    case 'Kiss Day': return ANIMATIONS.kiss;
    case 'Propose Day': return ANIMATIONS.propose;
    case 'Valentine’s Day': return ANIMATIONS.valentine;
    default: break;
  }

  // Emotion priority logic
  switch (mood) {
    case 'cute': return ANIMATIONS.cute;
    case 'deep': return ANIMATIONS.deep;
    case 'playful': return ANIMATIONS.playful;
    case 'intense': return ANIMATIONS.intense;
    case 'romantic': return ANIMATIONS.heart;
    case 'emotional': return ANIMATIONS.heart;
    default: return ANIMATIONS.heart;
  }
}
