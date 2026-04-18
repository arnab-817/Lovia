
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceAuraProps {
  isActive: boolean;
  isModelSpeaking: boolean;
}

// Visual indicator for voice interactions with the Gemini Live session.
const VoiceAura: React.FC<VoiceAuraProps> = ({ isActive, isModelSpeaking }) => {
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <AnimatePresence>
          {(isActive || isModelSpeaking) && (
            <>
              <motion.div
                key="aura-outer"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-full blur-2xl ${isModelSpeaking ? 'bg-rose-400' : 'bg-pink-300'}`}
              />
              <motion.div
                key="aura-inner"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`relative w-12 h-12 rounded-full border-2 ${isModelSpeaking ? 'border-rose-500' : 'border-pink-400'} flex items-center justify-center bg-white shadow-xl`}
              >
                <div className="flex gap-1 items-center h-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isModelSpeaking ? [4, 16, 4] : [4, 8, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className={`w-1 rounded-full ${isModelSpeaking ? 'bg-rose-500' : 'bg-pink-400'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[10px] font-bold uppercase tracking-[0.4em] text-pink-400/60"
      >
        {isModelSpeaking ? "Boutique Director Speaking" : (isActive ? "Listening to your heart" : "Ready to Create")}
      </motion.p>
    </div>
  );
};

export default VoiceAura;
