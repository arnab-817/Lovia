
import React from 'react';
import { 
  Flower, 
  Heart, 
  Cookie, 
  Ghost, 
  HandMetal, 
  Users, 
  Waves, 
  Flame,
  Star,
  Zap,
  Palette,
  Sparkles,
  Camera,
  Music
} from 'lucide-react';
import { ValentineDay } from './types';

export const VALENTINE_DAYS: { name: ValentineDay; icon: React.ReactNode; color: string; emoji: string; giftId: string }[] = [
  { name: 'Rose Day', icon: <Flower className="w-6 h-6" />, color: '#FFE4E1', emoji: '🌹', giftId: 'rose-petals' },
  { name: 'Propose Day', icon: <Heart className="w-6 h-6" />, color: '#FFD1DC', emoji: '💍', giftId: 'heart-bloom' },
  { name: 'Chocolate Day', icon: <Cookie className="w-6 h-6" />, color: '#F5DEB3', emoji: '🍫', giftId: 'soft-glow' },
  { name: 'Teddy Day', icon: <Ghost className="w-6 h-6" />, color: '#E6E6FA', emoji: '🧸', giftId: 'hug-aura' },
  { name: 'Promise Day', icon: <HandMetal className="w-6 h-6" />, color: '#F0FFF0', emoji: '🤝', giftId: 'promise-seal' },
  { name: 'Hug Day', icon: <Users className="w-6 h-6" />, color: '#FFFACD', emoji: '🫂', giftId: 'warm-pulse' },
  { name: 'Kiss Day', icon: <Waves className="w-6 h-6" />, color: '#FDF5E6', emoji: '💋', giftId: 'kiss-trail' },
  { name: 'Valentine’s Day', icon: <Flame className="w-6 h-6" />, color: '#FFB7C5', emoji: '❤️', giftId: 'eternal-glow' },
];

export const PREMIUM_GIFTS = [
  { id: 'rose-petals', name: 'Rose Petals', isPro: false },
  { id: 'heart-bloom', name: 'Heart Bloom', isPro: false },
  { id: 'soft-glow', name: 'Soft Glow', isPro: true },
  { id: 'hug-aura', name: 'Hug Aura', isPro: true },
  { id: 'promise-seal', name: 'Promise Seal', isPro: true },
  { id: 'warm-pulse', name: 'Warm Pulse', isPro: true },
  { id: 'kiss-trail', name: 'Kiss Trail', isPro: true },
  { id: 'eternal-glow', name: 'Eternal Glow', isPro: true },
];

export const TEMPLATES = [
  { id: 't1', name: 'Minimal Blush', isPro: false, desc: 'Simple & Elegant' },
  { id: 't2', name: 'Soft Whispers', isPro: false, desc: 'Gentle Fades' },
  { id: 't3', name: 'Classic Letter', isPro: false, desc: 'Paper Texture' },
  { id: 't4', name: 'Golden Hour', isPro: false, desc: 'Warm Glow' },
  { id: 't5', name: 'Garden Mist', isPro: false, desc: 'Soft Focus' },
  { id: 'p1', name: 'Cosmic Eternity', isPro: true, desc: 'Cinematic Depth' },
  { id: 'p2', name: 'Starlight Glimmer', isPro: true, desc: 'Particle Overlays' },
  { id: 'p3', name: 'Royal Velvet', isPro: true, desc: 'Luxury Spacing' },
  { id: 'p4', name: 'Midnight Neon', isPro: true, desc: 'High Contrast' },
  { id: 'p5', name: 'Vintage Polaroid', isPro: true, desc: 'Nostalgic Motion' },
];

export const EFFECTS = [
  { id: 'e1', name: 'Standard Fade', isPro: false, icon: <Zap className="w-4 h-4" /> },
  { id: 'e2', name: 'Soft Glow', isPro: false, icon: <Sparkles className="w-4 h-4" /> },
  { id: 'e3', name: 'Slide Reveal', isPro: false, icon: <Palette className="w-4 h-4" /> },
  { id: 'p1', name: 'Heart Rain', isPro: true, icon: <Heart className="w-4 h-4" /> },
  { id: 'p2', name: 'Magic Dust', isPro: true, icon: <Star className="w-4 h-4" /> },
  { id: 'p3', name: 'Butterfly Swarm', isPro: true, icon: <Zap className="w-4 h-4" /> },
  { id: 'p4', name: 'Floating Bubbles', isPro: true, icon: <Music className="w-4 h-4" /> },
  { id: 'p5', name: 'Bioluminescence', isPro: true, icon: <Camera className="w-4 h-4" /> },
];
