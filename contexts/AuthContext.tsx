
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check from localStorage for demo mode
    const savedUser = localStorage.getItem('lovia_demo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async () => {
    setLoading(true);
    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const demoUser: UserProfile = {
      id: 'demo-' + Math.random().toString(36).substr(2, 9),
      name: 'Lovely Creator',
      email: 'demo@lovia.app',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=romantic',
      isPro: false
    };

    setUser(demoUser);
    localStorage.setItem('lovia_demo_user', JSON.stringify(demoUser));
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('lovia_demo_user');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
