
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { VALENTINE_DAYS } from '../constants';
import { ValentineDay } from '../types';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface HomeProps {
  onStartBuilder: (day: ValentineDay) => void;
  onViewPro: () => void;
}

export const DashboardWelcome: React.FC = () => {
  const bgHearts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 95}%`,
    top: `${Math.random() * 100}%`,
    size: 6 + Math.random() * 14,
    delay: i * 0.5,
    duration: 5 + Math.random() * 7,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
      className="relative mt-40 mb-24 px-10 py-20 max-w-4xl mx-auto text-center overflow-hidden rounded-[4rem] glass-card"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {bgHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-300 select-none opacity-20"
            animate={{ 
              y: [0, -60, 0],
              opacity: [0.05, 0.3, 0.05],
              scale: [1, 1.3, 1],
              rotate: [0, 45, -45, 0]
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut"
            }}
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: heart.size,
            }}
          >
            <Heart className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
            filter: ["drop-shadow(0 0 0px #FFB7C5)", "drop-shadow(0 0 15px rgba(255, 183, 197, 0.6))", "drop-shadow(0 0 0px #FFB7C5)"]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="inline-block"
        >
          <Sparkles className="text-pink-500 w-12 h-12 mx-auto" />
        </motion.div>
        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-pink-500/40 mb-2">The Digital Sanctuary of Love</p>
        <h3 className="text-4xl md:text-5xl font-bold text-gray-800 font-quicksand leading-tight glow-heading">
          Crafting memories that <br />
          <span className="text-gradient">flutter through time.</span>
        </h3>
        <p className="text-xl md:text-2xl font-romantic text-gray-400 pt-4 max-w-2xl mx-auto italic">
          "For the ones who feel too much, and the ones who want to show it all."
        </p>
      </div>
    </motion.div>
  );
};

const Home: React.FC<HomeProps> = ({ onStartBuilder, onViewPro }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, login } = useAuth();

  useEffect(() => {
    if (searchParams.get('login') === 'true' && !user) {
      login().then(() => {
        searchParams.delete('login');
        setSearchParams(searchParams);
      }).catch(() => {
        // Handle login cancellation or error
      });
    }
  }, [searchParams, user, login, setSearchParams]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
      {/* Hero Section */}
      <section className="text-center mb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-pink-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10 shadow-sm"
        >
          <Star className="w-3 h-3 fill-current" />
          Lovia: The Love Architect
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-800 mb-10 leading-[1] tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
        >
          Love, <br />
          <span className="text-gradient font-romantic drop-shadow-sm px-4">reimagined.</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed font-quicksand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          Build a cinematic sanctuary for your feelings. <br className="hidden md:block" />
          Interactive letters, emotional timelines, and magical reveals.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.button 
            onClick={() => onStartBuilder('Valentine’s Day')}
            className="group relative px-12 py-6 button-premium text-white rounded-[2.5rem] font-bold text-2xl active:scale-95 overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
             <motion.div 
              className="absolute inset-0 bg-white/20 translate-x-[-100%]"
              whileHover={{ translateX: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="flex items-center gap-3 relative z-10 transition-transform group-hover:gap-5">
              Start Your Story <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
          
          <motion.button 
            onClick={onViewPro}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 glass-card text-gray-600 rounded-[2.5rem] font-bold text-2xl hover:text-pink-500"
          >
            Explore PRO 👑
          </motion.button>
        </motion.div>
      </section>
      
      {/* Boutique Grid */}
      <section className="max-w-6xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 font-quicksand tracking-tight glow-heading">The Eight Chapters</h2>
            <p className="text-sm font-black text-pink-400 uppercase tracking-[0.4em]">A journey of affection</p>
          </div>
          <div className="h-[1px] flex-1 mx-12 bg-gradient-to-r from-pink-200/40 to-transparent hidden lg:block"></div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Select a mood</span>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {VALENTINE_DAYS.map((day, idx) => (
            <motion.div
              key={day.name}
              variants={item}
              className="glass-card p-10 rounded-[3rem] flex flex-col items-center gap-8 cursor-pointer group relative overflow-hidden"
              onClick={() => onStartBuilder(day.name)}
              whileHover={{ y: -12, scale: 1.02, rotate: 1 }}
            >
              <div 
                className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-pink-500 group-hover:rotate-[15deg] transition-all duration-700 shadow-md relative z-10"
                style={{ backgroundColor: `${day.color}20` }}
              >
                <div className="transform group-hover:scale-125 transition-transform duration-500 filter drop-shadow-md">
                  {day.icon}
                </div>
              </div>
              <div className="text-center z-10">
                <span className="font-bold text-gray-800 text-xl block mb-2 group-hover:text-gradient group-hover:scale-105 transition-all duration-300">{day.name}</span>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] opacity-80 group-hover:text-pink-400 transition-colors">Chapter {idx + 1}</span>
              </div>
              
              {/* Legendary hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-transparent to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-pink-300 rotate-12">
                <Sparkles className="w-6 h-6 fill-current" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
