import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserPlan } from '@/types/map';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isDevMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: '1',
  email: 'pro@example.com',
  plan: 'pro',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDevMode = import.meta.env.DEV;

  useEffect(() => {
    // Simulate checking for a stored token
    const storedUser = localStorage.getItem('marketnav_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Simple mock logic: any email with "pro" gets pro plan, others get free
    const plan: UserPlan = email.includes('pro') ? 'pro' : 'free';
    const newUser: User = { id: Math.random().toString(36).substr(2, 9), email, plan };
    
    setUser(newUser);
    localStorage.setItem('marketnav_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const signup = async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = { id: Math.random().toString(36).substr(2, 9), email, plan: 'free' };
    setUser(newUser);
    localStorage.setItem('marketnav_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('marketnav_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, isDevMode }}>
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
