
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Camera, Image as ImageIcon, Loader2, Gift as GiftIcon } from 'lucide-react';

interface PremiumGiftProps {
  giftId: string;
  className?: string;
  photoUrl?: string;
  isPro?: boolean;
  onPhotoUpload?: (base64: string) => void;
}

export const HiddenLoveGift: React.FC<PremiumGiftProps> = ({ giftId, className = "", photoUrl, isPro = false, onPhotoUpload }) => {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [internalPhoto, setInternalPhoto] = useState<string | null>(photoUrl || null);

  useEffect(() => {
    const saved = localStorage.getItem('lovia_main_photo');
    if (saved && !photoUrl) {
      setInternalPhoto(saved);
    } else if (photoUrl) {
      setInternalPhoto(photoUrl);
    }
  }, [photoUrl]);

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 900;
          const sourceSize = Math.min(img.width, img.height);
          const targetSize = Math.min(sourceSize, maxSize);
          
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            const xOffset = (img.width - sourceSize) / 2;
            const yOffset = (img.height - sourceSize) / 2;
            ctx.drawImage(img, xOffset, yOffset, sourceSize, sourceSize, 0, 0, targetSize, targetSize);
            
            const base64 = canvas.toDataURL('image/jpeg', 0.85);
            setInternalPhoto(base64);
            localStorage.setItem('lovia_main_photo', base64);
            onPhotoUpload?.(base64);
          }
          setIsProcessing(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Photo processing failed", err);
      setIsProcessing(false);
    }
  };

  const activePhoto = photoUrl || internalPhoto;

  return (
    <div className={`flex flex-col items-center gap-16 ${className}`}>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files?.[0] && processImage(e.target.files[0])} 
        accept="image/*" 
        className="hidden" 
      />

      {/* [ Gift Frame ] - The Decorative Photo Holder */}
      <div className="relative">
        {/* Glow Aura */}
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-[-60px] bg-pink-300/30 blur-[80px] rounded-full -z-10"
        />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          onClick={triggerUpload}
          className="relative w-72 h-72 md:w-80 md:h-80 bg-white/40 backdrop-blur-md p-5 rounded-[4rem] shadow-premium border-2 border-white/80 cursor-pointer overflow-visible group"
        >
           {/* The Frame Interior */}
           <div className="w-full h-full rounded-[3.2rem] bg-white/20 overflow-hidden relative border-4 border-white/50 flex items-center justify-center shadow-inner">
              {activePhoto ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={activePhoto} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Love Memory" 
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-pink-400">
                   {isProcessing ? <Loader2 className="w-10 h-10 animate-spin" /> : <Camera className="w-14 h-14 opacity-60" />}
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500/60">Frame This Moment</p>
                </div>
              )}

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[4px] flex items-center justify-center">
                 <motion.div 
                   initial={{ y: 20 }}
                   whileHover={{ y: 0 }}
                   className="bg-white/95 p-4 rounded-3xl shadow-xl border border-white"
                 >
                    <ImageIcon className="w-8 h-8 text-pink-500" />
                 </motion.div>
              </div>
           </div>

           {/* Decorative Ribbon/Bow on the Frame */}
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <motion.div 
                animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="button-premium w-14 h-14 rounded-full shadow-glow flex items-center justify-center border-4 border-white">
                  <Heart className="w-7 h-7 text-white fill-current" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                   <div className="w-24 h-8 button-premium rounded-full blur-[2px] opacity-80" />
                   <div className="w-8 h-24 button-premium rounded-full blur-[2px] opacity-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </motion.div>
           </div>
        </motion.div>
      </div>

      {/* [ Hidden Gift Box ] - Interactive Reveal Below */}
      <div className="flex flex-col items-center gap-8 w-full relative z-10">
        <div className="text-[10px] font-black uppercase tracking-[1em] text-pink-500/40">Unlock Secret Gift</div>
        
        <AnimatePresence mode="wait">
          {!isGiftOpen ? (
            <motion.div
              key="gift-closed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0, filter: 'blur(30px)' }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsGiftOpen(true)}
              className="group cursor-pointer relative"
            >
               <motion.div 
                 animate={{ scale: [1, 1.05, 1], filter: ["drop-shadow(0 0 0px #FFB7C5)", "drop-shadow(0 0 20px rgba(255,183,197,0.4))", "drop-shadow(0 0 0px #FFB7C5)"] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="w-52 h-52 button-premium rounded-[4rem] shadow-glow flex flex-col items-center justify-center relative overflow-hidden group"
               >
                  <GiftIcon className="w-20 h-20 text-white mb-2 drop-shadow-md" />
                  <p className="text-[11px] font-black text-white/80 uppercase tracking-[0.3em]">Reveal Gift</p>
                  
                  {/* Subtle Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
               </motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute -top-6 -right-6 text-yellow-300 drop-shadow-lg"
               >
                 <Sparkles className="w-10 h-10 fill-current" />
               </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="gift-revealed"
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(40px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ type: "spring", damping: 15 }}
              className="relative w-80 h-80 flex items-center justify-center p-10 glass-card rounded-[5rem] shadow-glow"
            >
               {/* Effect Background */}
               <motion.div 
                 animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 className="absolute inset-0 bg-pink-300 blur-[120px] -z-10"
               />
               
               <div className="relative z-10 scale-125">
                  <PremiumGiftVisuals giftId={giftId} />
               </div>

               <motion.button 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2.5 }}
                 whileHover={{ scale: 1.1, color: '#ec4899' }}
                 onClick={() => setIsGiftOpen(false)}
                 className="absolute bottom-[-50px] text-[10px] font-black text-pink-400 uppercase tracking-[0.5em] transition-all"
               >
                 Back to Box
               </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PremiumGiftVisuals: React.FC<{ giftId: string }> = ({ giftId }) => {
  const animations: Record<string, React.ReactNode> = {
    'rose-petals': [...Array(15)].map((_, i) => (
      <motion.div 
        key={i} 
        className="absolute text-rose-400/40" 
        initial={{ y: -100, opacity: 0, rotate: 0 }} 
        animate={{ 
          y: 300, 
          x: Math.sin(i) * 150, 
          rotate: 360,
          opacity: [0, 1, 1, 0]
        }} 
        transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.1 }} 
        style={{ left: `${Math.random() * 100}%` }}
      >
        <Heart size={20} fill="currentColor" />
      </motion.div>
    )),
    'heart-bloom': (
      <div className="flex items-center justify-center">
         <motion.div 
           animate={{ 
             scale: [1, 2, 1], 
             opacity: [0.2, 0.5, 0.2],
             filter: ["blur(20px)", "blur(50px)", "blur(20px)"]
           }} 
           transition={{ duration: 3, repeat: Infinity }} 
           className="w-48 h-48 bg-pink-500 rounded-full"
         />
         <motion.div
           animate={{ scale: [1, 1.3, 1] }}
           transition={{ duration: 1.5, repeat: Infinity }}
           className="absolute"
         >
           <Heart size={80} className="text-pink-500 fill-pink-500 drop-shadow-2xl" />
         </motion.div>
      </div>
    ),
    'eternal-glow': (
      <div className="relative flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
          className="absolute w-56 h-56 border-2 border-dashed border-pink-300 rounded-full opacity-40" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
          className="absolute w-44 h-44 border-2 border-dashed border-pink-400 rounded-full opacity-30" 
        />
        <Heart size={100} className="text-pink-500 fill-pink-500 drop-shadow-2xl" />
      </div>
    ),
    'soft-glow': (
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-9xl drop-shadow-romantic"
      >
        🍫
      </motion.div>
    )
  };
  return <>{animations[giftId] || animations['eternal-glow']}</>;
};

export default HiddenLoveGift;
