import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Sparkles, Plus, Wand2, Trash2, Camera, Loader2, Clock
} from 'lucide-react';
import { ValentineDay, LovePage } from '../types';
import { getAIPolish } from '../services/geminiService';
import { VALENTINE_DAYS, PREMIUM_GIFTS, TEMPLATES, EFFECTS } from '../constants';
import { HiddenLoveGift } from './PremiumGift';
import UpgradeModal from './UpgradeModal';

interface BuilderProps {
  initialDay: ValentineDay;
  onBack: () => void;
  onPublish: (page: LovePage) => void;
  isPro: boolean;
  onUpgrade: () => void;
}

const Builder: React.FC<BuilderProps> = ({ initialDay, onBack, onPublish, isPro, onUpgrade }) => {
  const [page, setPage] = useState<LovePage>(() => {
    const draft = localStorage.getItem('lovia_draft');
    if (draft) return JSON.parse(draft);
    return {
      id: Math.random().toString(36).substr(2, 9),
      day: initialDay,
      title: '',
      message: '',
      isSecret: false,
      templateId: 't1',
      giftId: VALENTINE_DAYS.find(d => d.name === initialDay)?.giftId || 'eternal-glow',
      themeId: 'romantic',
      messageStyleId: 'handwritten',
      effects: [],
      timeline: [],
      isPublished: false,
      publishedAt: 0,
      lastEdited: Date.now()
    };
  });

  const [isAILoading, setIsAILoading] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [modalFeature, setModalFeature] = useState('');

  useEffect(() => {
    localStorage.setItem('lovia_draft', JSON.stringify(page));
  }, [page]);

  const handleProCheck = (feature: string) => {
    if (!isPro) {
      setModalFeature(feature);
      setIsUpgradeModalOpen(true);
      return false;
    }
    return true;
  };

  const handleDayChange = (dayName: ValentineDay) => {
    const dayData = VALENTINE_DAYS.find(d => d.name === dayName);
    setPage(prev => ({ ...prev, day: dayName, giftId: dayData?.giftId || prev.giftId }));
  };

  const handlePolish = async () => {
    if (!handleProCheck('AI Romantic Polish') || !page.message) return;
    setIsAILoading(true);
    try {
      const res = await getAIPolish(page.message);
      setPage(prev => ({ ...prev, message: res }));
    } catch (e) {
      console.error("AI Polish Error", e);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleMainPhotoUpload = (base64: string) => {
    setPage(prev => ({ ...prev, giftPhotoUrl: base64 }));
  };

  const handleTimelinePhoto = (id: string, base64: string) => {
    const updated = page.timeline.map(t => t.id === id ? { ...t, photoUrl: base64 } : t);
    setPage(prev => ({ ...prev, timeline: updated }));
    // Auto-sync if it's the first photo and main photo is empty
    if (!page.giftPhotoUrl) {
      handleMainPhotoUpload(base64);
    }
  };

  const addMilestone = () => {
    if (!isPro && page.timeline.length >= 3) {
      handleProCheck('Unlimited Timeline Memories');
      return;
    }
    setPage(prev => ({ 
      ...prev, 
      timeline: [...prev.timeline, { 
        id: Math.random().toString(36).substr(2, 9), 
        date: 'Feb 14', 
        title: '', 
        description: '' 
      }] 
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-48 px-6">
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
        onUpgrade={() => { setIsUpgradeModalOpen(false); onUpgrade(); }} 
        featureName={modalFeature}
      />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <div className="flex items-center justify-between">
          <motion.button 
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="p-4 glass-card rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPublish(page)} 
            className="px-10 py-4 button-premium text-white rounded-full font-bold text-lg shadow-romantic"
          >
            Publish Story
          </motion.button>
        </div>

        {/* Main Photo Box - Unified Photo System */}
        <div className="flex flex-col items-center gap-6 py-6">
          <label className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-400 opacity-60">The Visual Heart</label>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HiddenLoveGift 
              giftId={page.giftId || 'eternal-glow'} 
              photoUrl={page.giftPhotoUrl} 
              isPro={isPro}
              onPhotoUpload={handleMainPhotoUpload}
            />
          </motion.div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest opacity-40">Click to reveal • Click photo to change</p>
        </div>

        <div className="glass-card p-10 rounded-[4rem] space-y-12">
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500/50 block ml-4">Choose the Occasion</label>
            <div className="flex flex-wrap gap-3">
              {VALENTINE_DAYS.map(d => (
                <motion.button 
                  key={d.name} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDayChange(d.name)} 
                  className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${page.day === d.name ? 'button-premium text-white' : 'glass-card text-pink-300 hover:text-pink-500'}`}
                >
                  {d.emoji} {d.name}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500/50 block ml-4">Atmospheric Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'romantic', name: 'Romantic' },
                  { id: 'dark', name: 'Dark' },
                  { id: 'pastel', name: 'Pastel' },
                  { id: 'minimal', name: 'Minimal' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (handleProCheck('Premium Custom Themes')) {
                        setPage(p => ({ ...p, themeId: t.id as any }));
                      }
                    }}
                    className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${page.themeId === t.id ? 'bg-pink-500 border-pink-500 text-white' : 'border-pink-100 text-pink-400 hover:border-pink-300'}`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500/50 block ml-4">Message Style</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'clean', name: 'Simple' },
                  { id: 'handwritten', name: 'Handwritten' },
                  { id: 'typewriter', name: 'Typewriter' },
                  { id: 'cinematic', name: 'Cinematic' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (handleProCheck('Advanced Typography Styles')) {
                        setPage(p => ({ ...p, messageStyleId: s.id as any }));
                      }
                    }}
                    className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${page.messageStyleId === s.id ? 'bg-pink-500 border-pink-500 text-white' : 'border-pink-100 text-pink-400 hover:border-pink-300'}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <input 
              value={page.title}
              onChange={e => setPage(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Give your story a title..."
              className="w-full bg-transparent border-b-2 border-pink-100 p-6 text-4xl md:text-5xl font-bold font-quicksand focus:outline-none focus:border-pink-400 transition-all placeholder:text-gray-200 tracking-tight glow-heading"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500/50">Your Emotional Note</label>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePolish} 
                disabled={isAILoading} 
                className="flex items-center gap-2 px-4 py-2 glass-card text-pink-500 font-black text-[10px] uppercase hover:bg-white"
              >
                {isAILoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 fill-pink-100" />} {isAILoading ? 'Polishing...' : 'AI Romantic Polish'}
              </motion.button>
            </div>
            <textarea 
              value={page.message}
              onChange={e => setPage(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Write what your heart feels..."
              className="w-full bg-white/30 rounded-[3rem] p-10 font-romantic text-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-pink-100/50 focus:bg-white/80 transition-all min-h-[350px] resize-none leading-relaxed text-gray-700 shadow-inner"
            />
          </div>
        </div>

        {/* Timeline Refined */}
        <div className="space-y-12">
          <div className="flex items-center justify-between px-6">
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-gray-800 font-quicksand tracking-tight glow-heading">Timeline of Us</h3>
              <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest opacity-60">Sequence of beautiful moments</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addMilestone} 
              className="flex items-center gap-2 px-6 py-3 button-premium text-white rounded-full font-bold text-xs"
            >
              <Plus size={16} /> Add Memory
            </motion.button>
          </div>
          
          <div className="grid gap-10">
            {page.timeline.map((t, i) => (
              <motion.div 
                key={t.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-[3.5rem] flex flex-col md:flex-row gap-8 items-center relative group"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="w-32 h-32 bg-pink-100 rounded-3xl flex items-center justify-center text-pink-300 cursor-pointer overflow-hidden relative shrink-0 shadow-inner"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (re: any) => handleTimelinePhoto(t.id, re.target.result);
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                >
                  {t.photoUrl ? <img src={t.photoUrl} className="w-full h-full object-cover rounded-3xl" /> : <Camera size={32} />}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                </motion.div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex items-center gap-4">
                    <Clock className="w-4 h-4 text-pink-300" />
                    <input 
                      value={t.date} 
                      onChange={e => { const updated = [...page.timeline]; updated[i].date = e.target.value; setPage(p => ({ ...p, timeline: updated })); }} 
                      className="text-xs font-black uppercase tracking-[0.3em] text-pink-400 bg-transparent focus:outline-none w-full" 
                    />
                  </div>
                  <input 
                    value={t.title} 
                    onChange={e => { const updated = [...page.timeline]; updated[i].title = e.target.value; setPage(p => ({ ...p, timeline: updated })); }} 
                    placeholder="Chapter Title" 
                    className="w-full font-bold text-gray-800 bg-transparent focus:outline-none text-2xl tracking-tight" 
                  />
                  <textarea 
                    value={t.description} 
                    onChange={e => { const updated = [...page.timeline]; updated[i].description = e.target.value; setPage(p => ({ ...p, timeline: updated })); }} 
                    placeholder="What happened then?" 
                    className="w-full text-base text-gray-400 bg-transparent focus:outline-none resize-none font-medium leading-relaxed" 
                    rows={2} 
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.2, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPage(prev => ({ ...prev, timeline: prev.timeline.filter(ev => ev.id !== t.id) }))} 
                  className="absolute top-8 right-8 text-pink-100 transition-colors"
                >
                  <Trash2 size={22} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;