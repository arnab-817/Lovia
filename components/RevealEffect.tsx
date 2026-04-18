
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export const HeartBurst: React.FC<{ x: number; y: number; onComplete: () => void }> = ({ x, y, onComplete }) => {
  const particles = Array.from({ length: 12 });

  return (
    <div className="fixed pointer-events-none z-[9999]" style={{ left: x, top: y }}>
      {particles.map((_, i) => {
        const angle = (i * 360) / particles.length;
        const distance = 80 + Math.random() * 40;
        const rad = (angle * Math.PI) / 180;
        const targetX = Math.cos(rad) * distance;
        const targetY = Math.sin(rad) * distance;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ 
              x: targetX, 
              y: targetY, 
              opacity: 0, 
              scale: 1,
              rotate: angle
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-pink-500"
            onAnimationComplete={i === 0 ? onComplete : undefined}
          >
            <Heart size={20} fill="currentColor" />
          </motion.div>
        );
      })}
    </div>
  );
};

interface RevealContainerProps {
  children: React.ReactNode;
  hint?: string;
}

export const RevealContainer: React.FC<RevealContainerProps> = ({ children, hint = "Tap to reveal secret" }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleReveal = (e: React.MouseEvent) => {
    if (!isRevealed) {
      setIsRevealed(true);
      const newBurst = { id: Date.now(), x: e.clientX, y: e.clientY };
      setBursts(prev => [...prev, newBurst]);
    }
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.button
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReveal}
            className="w-full p-12 glass-card rounded-[3rem] border-2 border-dashed border-pink-200 flex flex-col items-center justify-center gap-4 group"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 fill-current animate-pulse" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-pink-400">{hint}</span>
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bursts.map(burst => (
          <HeartBurst
            key={burst.id}
            x={burst.x}
            y={burst.y}
            onComplete={() => setBursts(prev => prev.filter(b => b.id !== burst.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
