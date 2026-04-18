import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Crown, Sparkles, Star, Gift, Palette, Rocket, Zap, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Home, { DashboardWelcome } from './components/Home';
import Builder from './components/Builder';
import Preview from './components/Preview';
import FloatingHearts from './components/FloatingHearts';
import { UserProfile, LovePage, ValentineDay } from './types';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-premium-gradient">
      <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/?login=true" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout, loading } = useAuth();
  const [currentDay, setCurrentDay] = useState<ValentineDay>('Valentine’s Day');
  const [projects, setProjects] = useState<LovePage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lovia_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const handlePro = () => {
    // This could be updated to save to Firestore later
    navigate('/pro');
  };

  const startBuilder = (day: ValentineDay) => {
    setCurrentDay(day);
    navigate('/builder');
  };

  const handlePublish = (page: LovePage) => {
    const newPage = { ...page, isPublished: true, publishedAt: Date.now(), userId: user?.id };
    const all = [newPage, ...projects.filter(p => p.id !== page.id)];
    setProjects(all);
    localStorage.setItem('lovia_projects', JSON.stringify(all));
    navigate(`/preview?id=${newPage.id}`);
  };

  const proFeatures = [
    { icon: <Palette className="w-5 h-5" />, title: "Premium Templates", desc: "Unlock 10 cinematic designs" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Cinematic Reveal", desc: "Butterfly swarms & magical dust" },
    { icon: <Gift className="w-5 h-5" />, title: "Full GIF Library", desc: "Access 100+ exclusive emotional GIFs" },
    { icon: <Star className="w-5 h-5" />, title: "AI Poetic Assistant", desc: "Deep lyrical help for your letters" },
    { icon: <Rocket className="w-5 h-5" />, title: "Unlimited Photos", desc: "Tell your full story without limits" },
    { icon: <Zap className="w-5 h-5" />, title: "Voice Guide", desc: "Talk to Lovia to build your page" }
  ];

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-premium-gradient">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Heart className="w-16 h-16 text-pink-500 fill-current" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-gradient">
      <FloatingHearts />
      
      <Navbar 
        onLogin={login} 
        onLogout={logout}
        onPro={handlePro} 
        onHome={() => navigate('/')} 
      />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Home onStartBuilder={startBuilder} onViewPro={() => navigate('/pro')} />
                {projects.length > 0 && (
                  <section className="px-6 max-w-6xl mx-auto pb-12 relative z-10">
                    <div className="flex items-center justify-between mb-8 px-4">
                      <h3 className="text-2xl font-bold text-gray-800 font-quicksand glow-heading">Your Creations</h3>
                      <div className="h-[1px] flex-1 mx-6 bg-pink-200/30" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {projects.map(p => (
                        <motion.div 
                          key={p.id} 
                          whileHover={{ y: -8, scale: 1.02, rotate: 1 }}
                          whileTap={{ scale: 0.98 }}
                          className="glass-card p-8 rounded-[3rem] cursor-pointer group flex items-center justify-between"
                          onClick={() => navigate(`/preview?id=${p.id}`)}
                        >
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 shadow-sm transition-transform group-hover:scale-110">
                               <Heart className="w-6 h-6 fill-current" />
                             </div>
                             <div>
                               <h4 className="font-bold text-gray-800 line-clamp-1">{p.title || 'Untitled'}</h4>
                               <span className="text-[10px] uppercase font-black text-pink-400 tracking-[0.2em]">{p.day}</span>
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
                <DashboardWelcome />
              </motion.div>
            } />

            <Route path="/builder" element={
              <ProtectedRoute>
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Builder 
                    initialDay={currentDay} 
                    onBack={() => navigate('/')} 
                    onPublish={handlePublish}
                    isPro={user?.isPro || false}
                    onUpgrade={() => navigate('/pro')}
                  />
                </motion.div>
              </ProtectedRoute>
            } />

            <Route path="/preview" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Preview 
                  isPro={user?.isPro || false} 
                  onBack={() => navigate('/')}
                />
              </motion.div>
            } />

            <Route path="/pro" element={
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="pt-44 pb-32 px-6 max-w-6xl mx-auto text-center">
                 <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100/50 text-pink-600 font-bold text-xs uppercase tracking-widest mb-6">✨ Founders Edition</div>
                 <h1 className="text-6xl md:text-9xl font-bold text-gray-800 mb-6 font-quicksand tracking-tighter glow-heading">Lovia <span className="text-gradient">PRO</span></h1>
                 <p className="text-xl text-gray-500 mb-20 max-w-2xl mx-auto font-medium">Capture your feelings with cinematic precision.</p>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      {proFeatures.map((f, i) => (
                        <div key={i} className="glass-card p-8 rounded-[2.5rem]">
                          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500 mb-4 shadow-sm">{f.icon}</div>
                          <h4 className="font-bold text-gray-800 mb-1">{f.title}</h4>
                          <p className="text-sm text-gray-400 font-semibold">{f.desc}</p>
                        </div>
                      ))}
                   </div>
                   <div className="glass-card rounded-[4rem] p-12 md:p-20 flex flex-col items-center bg-white/70">
                      <div className="mb-10 text-center">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-7xl font-bold text-gray-800 tracking-tighter">₹53</span>
                          <span className="text-2xl text-pink-200 line-through">₹499</span>
                        </div>
                        <p className="text-[10px] font-black text-pink-500 mt-4 uppercase tracking-[0.3em]">Lifetime Access • One Time</p>
                      </div>
                      <button className="w-full py-6 button-premium text-white rounded-[2rem] font-bold text-2xl">
                        {user?.isPro ? 'Creator Active' : 'Upgrade Now'}
                      </button>
                      <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-60">Immediate Activation • No Hidden Fees</p>
                   </div>
                 </div>
                 <button onClick={() => navigate('/')} className="mt-20 text-gray-300 font-bold hover:text-pink-400 uppercase tracking-widest text-xs transition-colors">Maybe Later</button>
              </motion.div>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;