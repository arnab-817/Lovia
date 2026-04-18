import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Share2, ArrowLeft, Sparkles, Home } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LovePage } from '../types';
import { VALENTINE_DAYS } from '../constants';
import { HiddenLoveGift } from './PremiumGift';
import ShareModal from './ShareModal';
import MessageRenderer from './MessageRenderer';
import { RevealContainer, HeartBurst } from './RevealEffect';

interface PreviewProps {
  page?: LovePage;
  onBack?: () => void;
  isPro: boolean;
}

const Preview: React.FC<PreviewProps> = ({ page: initialPage, onBack, isPro }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageId = searchParams.get('id');
  
  const [page, setPage] = useState<LovePage | null>(initialPage || null);
  const [loading, setLoading] = useState(!initialPage);
  const [showContent, setShowContent] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!page && pageId) {
      // Simulate loading from DB/LocalStorage
      const savedProjects = JSON.parse(localStorage.getItem('lovia_projects') || '[]');
      const found = savedProjects.find((p: LovePage) => p.id === pageId);
      if (found) {
        setPage(found);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [pageId, page]);

  // Handle heart burst on click
  const handlePageClick = (e: React.MouseEvent) => {
    const newBurst = { id: Date.now(), x: e.clientX, y: e.clientY };
    setBursts(prev => [...prev, newBurst]);
  };

  const lines = useMemo(() => page?.message.split('\n').filter(l => l.trim() !== '') || [], [page?.message]);
  const currentDayInfo = VALENTINE_DAYS.find(d => d.name === page?.day);

  useEffect(() => {
    if (showContent && lines.length > 0) {
      const interval = setInterval(() => {
        setRevealedLines(prev => {
          if (prev < lines.length) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 1200);
          return prev;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showContent, lines]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-premium-gradient">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <Heart className="w-20 h-20 text-pink-300 fill-current filter drop-shadow-xl" />
        </motion.div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-premium-gradient p-8 text-center space-y-8">
        <div className="w-24 h-24 glass-card rounded-[2.5rem] flex items-center justify-center text-pink-300 mb-4 shadow-xl">
          <Sparkles size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-quicksand glow-heading">This Story is a Secret...</h1>
        <p className="text-gray-400 max-w-xs mx-auto font-medium">We couldn't find this specific Valentine's story. It might have been deleted or the link is incorrect.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-10 py-4 button-premium text-white rounded-full font-bold flex items-center gap-2"
        >
          <Home size={20} /> Return Home
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      onClick={handlePageClick}
      className={`min-h-screen relative flex flex-col items-center p-8 md:p-12 text-center bg-premium-gradient overflow-x-hidden ${page.themeId ? `theme-${page.themeId}` : ''}`}
    >
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
      {/* Parallax Background Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.12]">
        {[...Array(25)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute text-pink-400" 
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, rotate: 0 }} 
            animate={{ y: '-10vh', rotate: 360, x: [`${Math.random() * 100}vw`, `${Math.random() * 90}vw`] }} 
            transition={{ duration: 40 + i, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
          >
            <Heart fill="currentColor" size={15 + Math.random() * 60} />
          </motion.div>
        ))}
      </div>

      <div className="fixed top-8 right-8 z-[110] flex gap-4">
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack || (() => navigate('/'))} 
          className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-pink-500" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsShareOpen(true)} 
          className="px-8 h-14 button-premium text-white rounded-2xl font-bold flex items-center gap-3"
        >
          <Share2 className="w-5 h-5" /> <span className="text-xs uppercase tracking-[0.2em] font-black">Share Story</span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div key="intro" className="my-auto flex flex-col items-center gap-12" exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}>
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 10, -10, 0],
                filter: ["drop-shadow(0 0 0px #FFB7C5)", "drop-shadow(0 0 40px rgba(255, 183, 197, 0.4))", "drop-shadow(0 0 0px #FFB7C5)"]
              }} 
              transition={{ duration: 4, repeat: Infinity }} 
              className="w-64 h-64 glass-card rounded-[5rem] flex items-center justify-center text-pink-500 shadow-glow"
            >
              <Heart className="w-28 h-28 fill-current animate-pulse opacity-80" />
            </motion.div>
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.8em] text-pink-500/40">Personal Premiere</p>
               <h1 className="text-6xl md:text-9xl font-bold font-quicksand leading-none tracking-tighter text-gray-800 glow-heading">A Story Just <br /> For You.</h1>
            </div>
            <motion.button 
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContent(true)} 
              className="px-24 py-8 button-premium text-white rounded-full font-bold text-3xl shadow-glow relative overflow-hidden group"
            >
              <motion.div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Open My Heart
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="content" className="max-w-4xl w-full py-48 relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <header className="mb-48 space-y-8">
               <motion.div 
                 initial={{ scale: 0, rotate: -30 }} 
                 animate={{ scale: 1.5, rotate: 0 }} 
                 transition={{ type: "spring", damping: 10 }}
                 className="text-8xl mb-12 inline-block filter drop-shadow-lg"
               >
                {currentDayInfo?.emoji}
               </motion.div>
               <h2 className="text-7xl md:text-[12rem] font-bold font-quicksand leading-none tracking-tighter text-gray-800 glow-heading">{page.title}</h2>
               <div className="h-1.5 w-32 button-premium mx-auto mt-12 rounded-full opacity-40" />
             </header>

             <article className="space-y-48 px-6 mb-80">
                <div className="max-w-3xl mx-auto">
                  {page.messageStyleId === 'cinematic' ? (
                     <MessageRenderer 
                        message={page.message} 
                        styleId={page.messageStyleId} 
                        className="text-5xl md:text-9xl font-romantic leading-[1.2] text-gray-800" 
                      />
                  ) : page.isSecret ? (
                    <RevealContainer hint="Tap to read my heart">
                      <MessageRenderer 
                        message={page.message} 
                        styleId={page.messageStyleId} 
                        className="text-5xl md:text-9xl font-romantic leading-[1.2] text-gray-800" 
                      />
                    </RevealContainer>
                  ) : (
                    <div className="space-y-48">
                      {lines.slice(0, revealedLines).map((line, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }} 
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            filter: 'blur(0px)',
                          }} 
                          transition={{ duration: 2 }}
                        >
                          <MessageRenderer 
                            message={line} 
                            styleId={page.messageStyleId} 
                            className="text-5xl md:text-9xl font-romantic leading-[1.2] text-gray-800 drop-shadow-sm" 
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
             </article>

             {isFinished && (
               <motion.div initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }} className="space-y-80 pb-64">
                  <div className="flex flex-col items-center gap-16">
                     <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
                       <Sparkles className="w-16 h-16 text-pink-300 opacity-60" />
                     </motion.div>
                     <div className="text-[10px] font-black uppercase tracking-[1em] text-pink-400 opacity-60">The Visual Essence</div>
                     <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                        <HiddenLoveGift 
                          giftId={page.giftId || 'eternal-glow'} 
                          photoUrl={(page as any).giftPhotoUrl} 
                          isPro={isPro}
                        />
                     </motion.div>
                  </div>

                  {page.timeline.length > 0 && (
                    <div className="space-y-64">
                      <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500/50">Our Chronicle</p>
                        <h3 className="text-5xl md:text-8xl font-bold font-quicksand text-gray-800 glow-heading">The Chapters of Us</h3>
                        <div className="w-24 h-1.5 button-premium mx-auto rounded-full opacity-20" />
                      </div>
                      <div className="space-y-64 px-4">
                        {page.timeline.map((event, idx) => (
                           <motion.div 
                            key={event.id} 
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col items-center gap-20`}
                          >
                            <div className="w-full max-w-2xl rounded-[5rem] overflow-hidden shadow-premium border-[16px] border-white aspect-square bg-white relative group">
                              {event.photoUrl ? (
                                <motion.img 
                                  src={event.photoUrl} 
                                  className="w-full h-full object-cover" 
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 10 }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-pink-50">
                                  <Heart size={120} fill="currentColor" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-40" />
                            </div>
                            <div className="max-w-2xl space-y-8">
                                <div className="flex items-center justify-center gap-4">
                                  <div className="h-[1px] w-8 bg-pink-200" />
                                  <span className="text-[10px] font-black text-pink-500 tracking-[0.6em] uppercase">{event.date}</span>
                                  <div className="h-[1px] w-8 bg-pink-200" />
                                </div>
                                <h4 className="text-6xl md:text-9xl font-bold font-quicksand text-gray-800 tracking-tighter opacity-90">{event.title}</h4>
                                <MessageRenderer 
                                  message={event.description} 
                                  styleId={page.messageStyleId}
                                  className="text-4xl md:text-6xl font-romantic text-gray-400 italic leading-snug"
                                />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <footer className="flex flex-col items-center gap-20 py-48">
                     <motion.div 
                      animate={{ scale: [1, 1.4, 1], filter: ["blur(0px)", "blur(4px)", "blur(0px)"] }} 
                      transition={{ duration: 3, repeat: Infinity }}
                     >
                       <Heart className="w-24 h-24 text-pink-500 fill-current opacity-80" />
                     </motion.div>
                     <p className="text-7xl md:text-[12rem] font-romantic text-gray-800 glow-heading tracking-tight">Always & Forever.</p>
                     <div className="text-[10px] font-black uppercase tracking-[1.5em] opacity-10 mt-32 text-gray-500">Lovia Digital Experience</div>
                  </footer>
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        pageId={page.id} 
        isPro={isPro} 
      />
    </motion.div>
  );
};

export default Preview;