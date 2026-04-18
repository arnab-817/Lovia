
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Check, X, Sparkles, Heart, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName?: string;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade, featureName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative bg-white/90 backdrop-blur-3xl rounded-[4rem] p-10 md:p-14 max-w-lg w-full shadow-premium overflow-hidden border-2 border-white/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Crown className="w-48 h-48" />
            </div>

            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose} 
              className="absolute top-8 right-8 text-pink-200 hover:text-pink-500 transition-colors"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <div className="space-y-10">
              <div className="flex flex-col items-center text-center gap-6">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-20 h-20 glass-card rounded-3xl flex items-center justify-center text-pink-500 shadow-glow"
                >
                  <Crown className="w-10 h-10 filter drop-shadow-sm" />
                </motion.div>
                <div className="space-y-3">
                  <h3 className="text-4xl font-bold text-gray-800 font-quicksand leading-tight tracking-tight glow-heading">Unlock the <span className="text-gradient">Premium</span> Experience</h3>
                  {featureName && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-pink-500 font-black text-[10px] uppercase tracking-[0.3em] bg-pink-50/50 px-4 py-1.5 rounded-full inline-block"
                    >
                      “Imagine {featureName} in high-definition 💗”
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {[
                  "Unlimited Chapters & Photos",
                  "AI Romantic Writing Assistant",
                  "Cinematic 4K Visual Effects",
                  "Premium Gift Animations",
                  "Interactive Love Passports",
                  "No Creation Limits"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-gray-600 group"
                  >
                    <div className="w-6 h-6 glass-card rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-xs tracking-tight">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 relative">
                <motion.button 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onUpgrade}
                  className="w-full py-6 button-premium text-white rounded-[2.5rem] font-bold text-xl shadow-glow flex items-center justify-center gap-4 relative overflow-hidden group"
                >
                  <Zap className="w-6 h-6 fill-current" />
                  Upgrade for ₹53 Lifetime
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.button>
                <p className="text-center text-[10px] text-pink-300 font-black uppercase tracking-[0.4em] mt-6 opacity-60">One-time payment • No subscriptions</p>
              </div>

              <div className="text-center border-t border-pink-50 pt-8">
                <p className="text-xs text-gray-400 font-medium italic opacity-60">"1,200+ creators have already chosen Lovia PRO"</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
