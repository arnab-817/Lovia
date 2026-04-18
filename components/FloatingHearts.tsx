
import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const FloatingHearts: React.FC = () => {
  const elements = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 30 + 10,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10,
    type: Math.random() > 0.3 ? 'heart' : 'bokeh',
    color: ['text-pink-100', 'text-pink-200', 'text-rose-100', 'text-white'][Math.floor(Math.random() * 4)],
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute select-none opacity-20 ${el.color}`}
          initial={{ y: '110vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360,
            x: ['0%', Math.random() > 0.5 ? '10%' : '-10%', '0%']
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          style={{
            left: el.left,
          }}
        >
          {el.type === 'heart' ? (
            <svg width={el.size} height={el.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <div 
              style={{ width: el.size, height: el.size }} 
              className="bg-white rounded-full blur-xl opacity-50"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
