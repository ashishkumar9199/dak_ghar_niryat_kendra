import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, RegisterFormData, ExporterProfile } from '../types';
import { 
  loginUser, 
  registerUser, 
  getStoredCurrentUser, 
  saveCurrentUser, 
  initializeUserDatabase,
  convertUserToExporterProfile
} from '../services/authService';

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: 'login' | 'register') => void;
  login: (email: string, password: string) => Promise<UserAccount>;
  register: (data: RegisterFormData) => Promise<UserAccount>;
  logout: () => void;
  updateUserWallet: (newBalance: number) => void;
  updateUserProfile: (profile: Partial<ExporterProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    initializeUserDatabase();
    const stored = getStoredCurrentUser();
    if (stored) {
      setCurrentUser(stored);
    } else {
      // Auto-set the primary Varanasi demo user as initial state so the app works seamlessly out of the box
      const initial = getStoredCurrentUser();
      if (initial) {
        setCurrentUser(initial);
      }
    }
    setIsLoading(false);
  }, []);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, pass: string): Promise<UserAccount> => {
    setIsLoading(true);
    try {
      const user = await loginUser(email, pass);
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<UserAccount> => {
    setIsLoading(true);
    try {
      const user = await registerUser(data);
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    saveCurrentUser(null);
    setCurrentUser(null);
  };

  const updateUserWallet = (newBalance: number) => {
    if (!currentUser) return;
    const updated = { ...currentUser, walletBalance: newBalance };
    setCurrentUser(updated);
    saveCurrentUser(updated);
  };

  const updateUserProfile = (prof: Partial<ExporterProfile>) => {
    if (!currentUser) return;
    const updated: UserAccount = {
      ...currentUser,
      businessName: prof.businessName ?? currentUser.businessName,
      contactPerson: prof.contactPerson ?? currentUser.contactPerson,
      email: prof.email ?? currentUser.email,
      phone: prof.phone ?? currentUser.phone,
      businessCategory: prof.businessCategory ?? currentUser.businessCategory,
      hasIEC: prof.hasIEC ?? currentUser.hasIEC,
      iecCode: prof.iecCode ?? currentUser.iecCode,
      hasGST: prof.hasGST ?? currentUser.hasGST,
      gstin: prof.gstin ?? currentUser.gstin,
      hasLUT: prof.hasLUT ?? currentUser.hasLUT,
      lutNumber: prof.lutNumber ?? currentUser.lutNumber,
      preferredDGNK: prof.preferredDGNK ?? currentUser.preferredDGNK,
      address: prof.address ?? currentUser.address,
      city: prof.city ?? currentUser.city,
      state: prof.state ?? currentUser.state,
      pincode: prof.pincode ?? currentUser.pincode,
      walletBalance: prof.walletBalance ?? currentUser.walletBalance
    };
    setCurrentUser(updated);
    saveCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab,
        login,
        register,
        logout,
        updateUserWallet,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
