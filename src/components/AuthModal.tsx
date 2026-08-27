import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Building2, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Award,
  KeyRound,
  FileCheck2,
  MapPin,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DnkLogo } from './DnkLogo';
import { DEMO_EXPORTERS } from '../services/authService';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';
import { DGNK_CENTERS } from '../../server/data';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  initialTab = 'login'
}) => {
  const { login, register, authModalTab, setAuthModalTab } = useAuth();
  const isHindi = language === 'HI' || language === 'MAI';
  const t = translations[language] || translations.EN;

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('exports@varanasihandicrafts.org');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  // Forgot password modal/helper state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Register form state
  const [regData, setRegData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessCategory: 'Handicrafts & Artifacts',
    hasIEC: true,
    iecCode: '',
    hasGST: true,
    gstin: '',
    preferredDGNK: 'New Delhi GPO DGNK (110001)',
    agreeTerms: true
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccessMessage, setRegSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Handle tab switch
  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setAuthModalTab(tab);
    setLoginError('');
    setRegError('');
    setShowForgotPassword(false);
  };

  // Quick fill from demo accounts
  const handleQuickFill = (acc: typeof DEMO_EXPORTERS[0]) => {
    setLoginEmail(acc.email);
    setLoginPassword(acc.password);
    setLoginError('');
  };

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 30, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score: 70, label: 'Medium', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-600' };
  };

  const passwordStrength = getPasswordStrength(regData.password);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccessMessage('');
    setIsSubmitting(true);

    try {
      const user = await login(loginEmail, loginPassword);
      setLoginSuccessMessage(`Welcome back, ${user.contactPerson || user.businessName}! Logged in successfully.`);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccessMessage('');

    if (regData.password !== regData.confirmPassword) {
      setRegError('Passwords do not match. Please re-enter your password.');
      return;
    }

    if (!regData.agreeTerms) {
      setRegError('You must agree to the DGNK postal export regulations and declarations.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await register(regData);
      setRegSuccessMessage(`Account created successfully for ${user.businessName}! Welcome to Dak Ghar Niryat Kendra.`);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setRegError(err.message || 'Registration failed. Please review your information.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Forgot Password
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSuccess(true);
  };

  return (
    <div 
      id="modal-auth-overlay" 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div 
        id="modal-auth-container" 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-200 flex flex-col my-auto max-h-[92vh]"
      >
        {/* Tricolor National Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white px-5 sm:px-6 py-4 flex items-center justify-between relative shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <DnkLogo variant="badge" size="sm" language={language} isHindi={isHindi} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-[#FFC107] text-[#990B20] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  India Post SSO
                </span>
                <span className="text-[10px] text-amber-200 font-bold uppercase tracking-wider hidden sm:inline">
                  CBIC 14/2018 Compliant
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white leading-snug">
                {activeTab === 'login' 
                  ? (isHindi ? 'निर्यातक लॉगिन • डाक घर निर्यात केंद्र' : 'Exporter Login • Dak Ghar Niryat Kendra') 
                  : (isHindi ? 'नया निर्यातक खाता पंजीकरण' : 'New Exporter Registration')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            title="Close / बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-100 p-1.5 flex border-b border-gray-200 shrink-0">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#C8102E] shadow-xs border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{isHindi ? 'साइन इन / लॉगिन (Sign In)' : 'Sign In / Login'}</span>
          </button>
          
          <button
            onClick={() => handleTabChange('register')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-[#C8102E] shadow-xs border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isHindi ? 'नया निर्यातक पंजीकरण (Register)' : 'New Registration'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* ===================== TAB 1: LOGIN ===================== */}
          {activeTab === 'login' && !showForgotPassword && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Success Alert */}
              {loginSuccessMessage && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">{loginSuccessMessage}</span>
                </div>
              )}

              {/* Error Alert */}
              {loginError && (
                <div className="bg-rose-50 border border-rose-300 text-rose-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 animate-in shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-bold">{loginError}</span>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isHindi ? 'ईमेल पता / यूजर आईडी (Email Address)' : 'Official Email Address'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. exports@varanasihandicrafts.org"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    {isHindi ? 'पासवर्ड (Password)' : 'Password'} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[11px] text-[#C8102E] font-bold hover:underline cursor-pointer"
                  >
                    {isHindi ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E] w-4 h-4"
                  />
                  <span className="text-xs text-gray-700 font-medium">
                    {isHindi ? 'मुझे याद रखें (Remember me on this browser)' : 'Remember me on this device'}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#C8102E] hover:bg-[#A60D24] active:scale-[0.99] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isHindi ? 'सत्यापित किया जा रहा है...' : 'Authenticating...'}</span>
                  </span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-amber-300" />
                    <span>{isHindi ? 'डाक घर निर्यात पोर्टल में लॉगिन करें' : 'Sign In to DGNK Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Fill Demo Exporter Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {isHindi ? 'त्वरित डेमो खाता (1-क्लिक टेस्ट लॉगिन)' : 'Quick Fill Demo Account (1-Click Test)'}
                  </span>
                  <span className="text-[10px] text-gray-400">Pass: password123</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {DEMO_EXPORTERS.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleQuickFill(acc)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        loginEmail === acc.email
                          ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400 text-gray-900 shadow-xs'
                          : 'bg-gray-50 hover:bg-gray-100/80 border-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-black truncate">{acc.businessName}</div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                          {acc.hasIEC ? `IEC: ${acc.iecCode}` : 'MSME Artisan'}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center justify-between gap-2 mt-1">
                        <span className="truncate">{acc.contactPerson} • {acc.email}</span>
                        <span className="text-[10px] text-[#C8102E] font-bold shrink-0">
                          {isHindi ? 'ऑटो-फिल करें' : 'Click to Auto-fill'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </form>
          )}

          {/* ===================== FORGOT PASSWORD HELPER ===================== */}
          {activeTab === 'login' && showForgotPassword && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  {isHindi ? 'पासवर्ड रीसेट व सत्यापन' : 'Exporter Password Recovery & OTP'}
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  {isHindi 
                    ? 'अपना पंजीकृत ईमेल पता दर्ज करें। आपको पंजीकृत मोबाइल और ईमेल पर 6-अंकीय OTP प्राप्त होगा।'
                    : 'Enter your registered exporter email address. A secure recovery link and 6-digit OTP will be generated.'}
                </p>
              </div>

              {forgotSuccess ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-900 text-xs space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {isHindi ? 'पासवर्ड रीसेट निर्देश भेजे गए!' : 'Reset Link Generated!'}
                  </div>
                  <p className="text-[11px] text-emerald-800/90">
                    For demonstration purposes, you can immediately sign in using default password <strong className="font-mono bg-emerald-100 px-1 py-0.5 rounded">password123</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="mt-2 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                  >
                    {isHindi ? 'लॉगिन पर वापस जाएं' : 'Back to Login'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isHindi ? 'पंजीकृत ईमेल' : 'Registered Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. exports@varanasihandicrafts.org"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-colors"
                    >
                      {isHindi ? 'रद्द करें' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-black uppercase tracking-wider transition-colors"
                    >
                      {isHindi ? 'OTP भेजें' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ===================== TAB 2: REGISTER ===================== */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Registration Benefits Banner */}
              <div className="p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border border-red-200/70 text-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C8102E] text-white flex items-center justify-center shrink-0 font-bold">
                  <Award className="w-4 h-4 text-[#FFC107]" />
                </div>
                <div>
                  <div className="font-bold text-[#990B20]">
                    {isHindi ? 'DNK पोर्टल पर निःशुल्क पंजीकरण' : 'Instant DGNK Exporter Onboarding'}
                  </div>
                  <div className="text-[11px] text-gray-600">
                    {isHindi 
                      ? '₹5,000 स्वागत फ्रैंकिंग क्रेडिट और तत्काल PBE-III/IV ई-फाइलिंग सुविधा'
                      : 'Includes ₹5,000 initial franking credit & automated PBE customs filing'}
                  </div>
                </div>
              </div>

              {/* Success Alert */}
              {regSuccessMessage && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">{regSuccessMessage}</span>
                </div>
              )}

              {/* Error Alert */}
              {regError && (
                <div className="bg-rose-50 border border-rose-300 text-rose-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 animate-in shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-bold">{regError}</span>
                </div>
              )}

              {/* 1. Basic Identity Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isHindi ? 'संपर्क व्यक्ति का नाम' : 'Contact Person Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regData.contactPerson}
                      onChange={(e) => setRegData({ ...regData, contactPerson: e.target.value })}
                      placeholder="e.g. Devendra Sharma"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isHindi ? 'मोबाइल नंबर' : 'Mobile Number (SMS Alerts)'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      placeholder="+91 98390 12845"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Business Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isHindi ? 'व्यावसायिक प्रतिष्ठान का नाम' : 'Business / Enterprise Name'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regData.businessName}
                      onChange={(e) => setRegData({ ...regData, businessName: e.target.value })}
                      placeholder="e.g. Varanasi Silk & Handicrafts"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isHindi ? 'व्यापार श्रेणी' : 'Business Category'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={regData.businessCategory}
                    onChange={(e) => setRegData({ ...regData, businessCategory: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  >
                    <option value="Handicrafts & Artifacts">Handicrafts & Artifacts (हस्तशिल्प)</option>
                    <option value="Textiles & Apparels">Textiles & Apparels (वस्त्र व परिधान)</option>
                    <option value="Gems & Jewelry">Gems & Jewelry (रत्न व आभूषण)</option>
                    <option value="Spices, Ayurveda & Herbs">Spices, Ayurveda & Herbs (मसाले व आयुर्वेद)</option>
                    <option value="Leather Goods & Footwear">Leather Goods & Footwear (चमड़ा उत्पाद)</option>
                    <option value="Electronics & Engineering">Electronics & Engineering (इंजीनियरिंग)</option>
                    <option value="Tea, Coffee & Agro">Tea, Coffee & Agro (चाय, कॉफी व कृषि)</option>
                    <option value="Other Commercial Products">Other Commercial Goods (अन्य)</option>
                  </select>
                </div>
              </div>

              {/* 3. Email & Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {isHindi ? 'आधिकारिक ईमेल पता' : 'Official Exporter Email'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="e.g. info@mycrafts.in"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isHindi ? 'पासवर्ड' : 'Password'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                      placeholder="Min 6 chars"
                      className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {isHindi ? 'पासवर्ड की पुष्टि' : 'Confirm Password'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regData.confirmPassword}
                      onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>
                </div>
              </div>

              {/* Password strength bar */}
              {regData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold">
                    <span>Password Strength:</span>
                    <span className="text-gray-700">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`} 
                      style={{ width: `${passwordStrength.score}%` }} 
                    />
                  </div>
                </div>
              )}

              {/* 4. Regulatory KYC: IEC & GSTIN */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2.5">
                <div className="text-xs font-black text-gray-700 flex items-center justify-between">
                  <span>{isHindi ? 'निर्यात वैधानिक घोषणा (KYC)' : 'Statutory Export KYC'}</span>
                  <span className="text-[10px] text-gray-500 font-normal">DGFT & CBIC</span>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regData.hasIEC}
                      onChange={(e) => setRegData({ ...regData, hasIEC: e.target.checked })}
                      className="rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E] w-4 h-4"
                    />
                    <span>{isHindi ? 'मेरे पास 10-अंकीय IEC कोड है' : 'I have a 10-digit DGFT IEC Code'}</span>
                  </label>
                </div>

                {regData.hasIEC && (
                  <div className="animate-in fade-in">
                    <input
                      type="text"
                      maxLength={10}
                      value={regData.iecCode}
                      onChange={(e) => setRegData({ ...regData, iecCode: e.target.value.toUpperCase() })}
                      placeholder="e.g. 0518029481 (10 digits)"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono uppercase focus:ring-2 focus:ring-[#C8102E]"
                    />
                  </div>
                )}

                {/* Preferred DGNK Center Selection */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    {isHindi ? 'प्राथमिक डाक घर निर्यात केंद्र (DGNK Counter)' : 'Preferred DGNK Post Office Counter'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={regData.preferredDGNK}
                      onChange={(e) => setRegData({ ...regData, preferredDGNK: e.target.value })}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#C8102E]"
                    >
                      {DGNK_CENTERS.map((c) => (
                        <option key={c.id} value={`${c.name} (${c.pincode})`}>
                          {c.name} ({c.city}, {c.state} - {c.pincode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. Terms & Declarations */}
              <label className="flex items-start gap-2 text-[11px] text-gray-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={regData.agreeTerms}
                  onChange={(e) => setRegData({ ...regData, agreeTerms: e.target.checked })}
                  className="rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E] w-4 h-4 mt-0.5 shrink-0"
                />
                <span>
                  {isHindi
                    ? 'मैं भारतीय डाक निर्यात विनियमों, खतरनाक सामान (ICAO) निषेध और CBIC 14/2018 के नियमों से सहमत हूँ।'
                    : 'I agree to India Post Export SOP, Dangerous Goods (ICAO/UPU) regulations and CBIC Circular 14/2018 terms.'}
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#C8102E] hover:bg-[#A60D24] active:scale-[0.99] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isHindi ? 'खाता बनाया जा रहा है...' : 'Creating Exporter Account...'}</span>
                  </span>
                ) : (
                  <>
                    <FileCheck2 className="w-4 h-4 text-[#FFC107]" />
                    <span>{isHindi ? 'नया निर्यातक खाता बनाएं' : 'Complete Registration & Open Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>256-Bit SSL Encrypted • Govt. of India</span>
          </div>
          <span className="font-bold text-gray-600">MSME Helpline: 1800-266-6868</span>
        </div>

      </div>
    </div>
  );
};
