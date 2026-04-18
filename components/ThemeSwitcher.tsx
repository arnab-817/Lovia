
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check } from 'lucide-react';
import { useTheme, ThemeType } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes: { id: ThemeType; name: string; color: string }[] = [
    { id: 'romantic', name: 'Default Romantic', color: '#FFB7C5' },
    { id: 'dark', name: 'Dark Romantic', color: '#D4145A' },
    { id: 'pastel', name: 'Soft Pastel', color: '#e2d1c3' },
    { id: 'minimal', name: 'Minimal White', color: '#343a40' },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 glass-card rounded-2xl flex items-center justify-center text-gray-800"
      >
        <Palette className="w-5 h-5 text-gradient" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-[140]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 p-4 glass-card rounded-3xl shadow-premium z-[150] w-64 space-y-2"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 mb-4 px-2">Select Theme</h4>
              <div className="grid gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                      theme === t.id ? 'bg-pink-50/50' : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full border border-white"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="text-xs font-bold text-gray-700">{t.name}</span>
                    </div>
                    {theme === t.id && <Check className="w-3 h-3 text-pink-500" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
