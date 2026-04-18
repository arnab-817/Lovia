import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Download, Heart } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string;
  isPro: boolean;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, pageId, isPro }) => {
  const [copied, setCopied] = useState(false);
  
  // Create a clean permanent URL using Search Params as requested
  const shareUrl = `${window.location.origin}/preview?id=${pageId}`;
  
  // Real working QR API integration
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(shareUrl)}&color=ec4899&format=png`;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Lovia Love Story',
          text: 'Open this to see a special cinematic surprise I created for you. 💝',
          url: shareUrl,
        });
      } catch (e) {
        console.error("Native share cancelled or failed", e);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-3xl" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
          />
          <motion.div 
            className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-12 max-w-lg w-full text-center relative shadow-premium border-2 border-white/50" 
            initial={{ scale: 0.9, y: 40, opacity: 0 }} 
            animate={{ scale: 1, y: 0, opacity: 1 }} 
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
          >
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose} 
              className="absolute top-8 right-8 text-pink-200 hover:text-pink-500 transition-colors"
            >
              <X className="w-8 h-8" />
            </motion.button>
            <div className="space-y-12 flex flex-col items-center">
               <div className="text-left w-full space-y-2">
                  <h3 className="text-4xl font-bold text-gray-800 font-quicksand tracking-tight glow-heading">The Love Passport</h3>
                  <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.5em]">Cinematic Entry Key</p>
               </div>

               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="relative group p-8 glass-card rounded-[4rem] border-2 border-pink-100 shadow-glow"
               >
                  <img src={qrUrl} className="w-64 h-64 rounded-3xl" alt="Love QR" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Heart className="text-pink-500 fill-current w-16 h-16 animate-pulse" />
                  </div>
               </motion.div>

               <div className="w-full space-y-6">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNativeShare} 
                    className="w-full py-6 button-premium text-white rounded-[2.5rem] font-bold text-xl shadow-glow flex items-center justify-center gap-4 group"
                  >
                    <Share2 className="w-6 h-6 transition-transform group-hover:rotate-12" /> 
                    {navigator.share ? 'Send to Partner' : 'Copy Link'}
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="w-full py-4 glass-card text-pink-400 font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 transition-all"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    {copied ? 'Link Captured' : 'Copy Secret URL'}
                  </motion.button>
               </div>

               {isPro && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="flex items-center gap-2 px-8 py-3 bg-yellow-50 text-yellow-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-100 shadow-sm"
                 >
                   <Download size={14} className="animate-bounce" /> Download HQ QR for Printing
                 </motion.div>
               )}

               {!isPro && (
                 <p className="text-[9px] text-pink-300 font-black uppercase tracking-[0.4em] opacity-60">Upgrade to <span className="text-gradient">PRO</span> to customize QR skins</p>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;