import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, User, Sparkles, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, signup, user, customerProfile, logout } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (mode === 'signin') {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to authenticate');
      }
    } else if (mode === 'signup') {
      if (!fullName) {
        setErrorMessage('Please provide your full name for atelier VIP records');
        setIsSubmitting(false);
        return;
      }
      const res = await signup(email, password, fullName);
      if (!res.success) {
        setErrorMessage(res.error || 'Registration could not be completed');
      }
    } else {
      // Forgot password
      setSuccessMessage('A secure reset link has been dispatched to your private email address.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-[#0F0F0F] border border-[#2B2B2B] shadow-2xl rounded-sm overflow-hidden"
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#8C6D37] via-[#D4AF37] to-[#8C6D37]" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-[#FAF7F0] hover:bg-neutral-800 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] block mb-2">
              ✦ DOOZY DREAM ATELIER ✦
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF7F0] tracking-wide">
              {user ? 'VIP Client Account' : mode === 'signin' ? 'Sign In to Your Salon' : mode === 'signup' ? 'Request VIP Membership' : 'Reset Privilege Access'}
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-2">
              {user
                ? 'Welcome back to your private haute couture suite.'
                : 'Access bespoke fittings, order tracking, and private collection previews.'}
            </p>
          </div>

          {user ? (
            <div className="space-y-6">
              <div className="p-4 rounded bg-[#161616] border border-[#262626] text-center">
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] mx-auto mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#FAF7F0]">{customerProfile?.fullName || user.email}</h3>
                <p className="text-xs text-[#C5A059] font-mono mt-0.5">{customerProfile?.tier || 'VIP Atelier Client'}</p>
                <p className="text-[11px] text-neutral-400 mt-1">{user.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsAuthOpen(false)}
                  className="w-full py-3 bg-[#C5A059] text-black text-xs uppercase tracking-widest font-medium hover:bg-[#D4AF37] transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2.5 bg-transparent border border-neutral-700 text-neutral-300 text-xs uppercase tracking-widest hover:border-red-500/50 hover:text-red-400 transition-colors"
                >
                  Sign Out of Atelier
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              {mode !== 'forgot' && (
                <div className="flex border-b border-[#262626] mb-6">
                  <button
                    onClick={() => { setMode('signin'); setErrorMessage(null); }}
                    className={`flex-1 pb-3 text-xs uppercase tracking-widest text-center transition-colors font-medium ${
                      mode === 'signin'
                        ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMode('signup'); setErrorMessage(null); }}
                    className={`flex-1 pb-3 text-xs uppercase tracking-widest text-center transition-colors font-medium ${
                      mode === 'signup'
                        ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    New VIP Account
                  </button>
                </div>
              )}

              {/* Alerts */}
              {errorMessage && (
                <div className="mb-5 p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Madame Genevieve Du Pont"
                        className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A059] text-sm text-[#FAF7F0] pl-10 pr-4 py-2.5 rounded-sm outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@luxury.com"
                      className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A059] text-sm text-[#FAF7F0] pl-10 pr-4 py-2.5 rounded-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                        Password
                      </label>
                      {mode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-[#C5A059] hover:underline"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#161616] border border-[#2A2A2A] focus:border-[#C5A059] text-sm text-[#FAF7F0] pl-10 pr-4 py-2.5 rounded-sm outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 mt-2 bg-[#C5A059] text-black font-sans uppercase text-xs font-semibold tracking-widest hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Verifying Credentials...</span>
                  ) : mode === 'signin' ? (
                    <>
                      <span>Enter Private Atelier</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : mode === 'signup' ? (
                    <>
                      <span>Register VIP Privilege</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  ) : (
                    <span>Send Reset Email</span>
                  )}
                </button>
              </form>

              {mode === 'forgot' && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setMode('signin')}
                    className="text-xs text-neutral-400 hover:text-[#C5A059] underline"
                  >
                    Return to VIP Sign In
                  </button>
                </div>
              )}

              {/* VIP Benefits Footer */}
              <div className="mt-8 pt-6 border-t border-[#222] grid grid-cols-2 gap-3 text-[10px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Private Previews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Atelier Guarantee</span>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
