
import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.05, color: '#D4145A' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-2.5 glass-card rounded-full text-gray-600 font-bold text-sm tracking-widest uppercase transition-all"
    >
      <User className="w-4 h-4" />
      <span>Login</span>
    </motion.button>
  );
};

export default LoginButton;
