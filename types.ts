
export type ValentineDay = 
  | 'Rose Day'
  | 'Propose Day'
  | 'Chocolate Day'
  | 'Teddy Day'
  | 'Promise Day'
  | 'Hug Day'
  | 'Kiss Day'
  | 'Valentine’s Day';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string; 
}

export interface LovePage {
  id: string;
  userId?: string;
  day: ValentineDay;
  title: string;
  message: string;
  isSecret: boolean;
  templateId: string;
  giftId?: string;
  giftPhotoUrl?: string;
  themeId?: 'romantic' | 'dark' | 'pastel' | 'minimal';
  messageStyleId?: 'clean' | 'handwritten' | 'typewriter' | 'cinematic';
  effects: string[];
  timeline: TimelineEvent[];
  isPublished: boolean;
  publishedAt?: number;
  lastEdited?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
  proExpiry?: number;
}

export type MoodType = 'cute' | 'romantic' | 'emotional' | 'deep';

export interface AIResponseSuggestion {
  text: string;
  mood: MoodType;
}
