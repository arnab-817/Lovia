
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, LogOut } from 'lucide-react';
import { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  user: UserProfileType;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-3 group cursor-pointer" 
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-800 leading-tight">{user.name}</p>
          <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.2em]">{user.isPro ? 'Pro Member' : 'Free Tier'}</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-pink-100 p-0.5 shadow-sm bg-white">
            <img src={user.avatar} className="w-full h-full rounded-xl object-cover" alt="avatar" />
          </div>
          {user.isPro && (
            <div className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full p-1 shadow-glow border border-white">
              <Crown className="w-2.5 h-2.5 fill-current" />
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <>
            <div className="fixed inset-0 z-[-1]" onClick={() => setShowDropdown(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-48 glass-card rounded-2xl p-2 shadow-premium"
            >
              <button
                onClick={() => {
                  onLogout();
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-bold text-xs uppercase tracking-widest transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
