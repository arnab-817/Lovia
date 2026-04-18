
import React, { useMemo } from 'react';
import Lottie from 'lottie-react';
import { analyzeEmotion } from '../utils/emotionAnalyzer';
import { getAnimationData } from '../utils/emotionAnimationMap';
import { ValentineDay } from '../types';

interface EmotionAnimationProps {
  day: ValentineDay;
  message: string;
  isPro: boolean;
  className?: string;
}

const EmotionAnimation: React.FC<EmotionAnimationProps> = ({ day, message, isPro, className }) => {
  const analysis = useMemo(() => analyzeEmotion(message), [message]);
  const animationData = useMemo(() => getAnimationData(day, analysis.mood), [day, analysis.mood]);

  if (!animationData) {
    return (
      <div className={`animation-wrapper ${className} flex items-center justify-center opacity-20`}>
        <span className="text-4xl">❤️</span>
      </div>
    );
  }

  return (
    <div className={`animation-wrapper ${className}`}>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EmotionAnimation;
