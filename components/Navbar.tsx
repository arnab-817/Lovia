
import React from 'react';
import { motion } from 'motion/react';
import { Heart, Crown } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from './LoginButton';
import UserProfile from './UserProfile';

interface NavbarProps {
  onLogin: () => void;
  onLogout: () => void;
  onPro: () => void;
  onHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, onLogout, onPro, onHome }) => {
  const { user } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-5xl h-20 glass-card z-[100] rounded-[2.5rem] flex items-center justify-between px-8"
    >
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={onHome}
      >
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 button-premium rounded-2xl flex items-center justify-center text-white shadow-lg"
        >
          <Heart className="w-5 h-5 fill-current" />
        </motion.div>
        <span className="font-bold text-2xl text-gray-800 font-quicksand tracking-tighter glow-heading">Lovia</span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <ThemeSwitcher />
        
        {!user?.isPro && (
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPro}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 button-premium text-white rounded-full font-bold text-sm tracking-wide"
          >
            <Crown className="w-4 h-4 fill-white/20" />
            <span>Go PRO</span>
          </motion.button>
        )}
        
        {user ? (
          <UserProfile user={user} onLogout={onLogout} />
        ) : (
          <LoginButton onClick={onLogin} />
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
