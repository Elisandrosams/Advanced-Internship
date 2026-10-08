'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/app/firebase';

type PlanType = 'basic' | 'premium' | 'premium-plus';
type FontSizeStyle = 'base' | 'lg' | 'xl' | 'xxl';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  subscriptionPlan: PlanType;
  fontSize: FontSizeStyle;
  setFontSize: (size: FontSizeStyle) => void;
  logout: () => Promise<void>;
  
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<PlanType>('basic');
  const [fontSize, setFontSize] = useState<FontSizeStyle>('base');
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (currentUser.email === 'guest@summarist.com') {
          setSubscriptionPlan('premium-plus');
        } else {
          setSubscriptionPlan('basic'); 
        }
      } else {
        setSubscriptionPlan('basic');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, subscriptionPlan, fontSize, setFontSize, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
