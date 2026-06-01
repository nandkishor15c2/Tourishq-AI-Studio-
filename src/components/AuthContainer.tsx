/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Lock, Sparkles, Check, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { User } from '../types';

interface AuthContainerProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
  seasonTheme: string;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ onLogin, onCancel, seasonTheme }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const getAccentBg = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'bg-teal-500 hover:bg-teal-400';
      case 'spring': return 'bg-pink-500 hover:bg-pink-400';
      case 'winter': return 'bg-blue-600 hover:bg-blue-500';
      case 'summer':
      default: return 'bg-accent hover:bg-accent-hover';
    }
  };

  const getAccentText = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'text-teal-400';
      case 'spring': return 'text-pink-400';
      case 'winter': return 'text-blue-400';
      case 'summer':
      default: return 'text-accent';
    }
  };

  const getAccentBorder = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'border-teal-500/50';
      case 'spring': return 'border-pink-500/50';
      case 'winter': return 'border-blue-600/50';
      case 'summer':
      default: return 'border-accent/50';
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Advance to simulated pin or code verification OTP
      setStep(2);
    } else {
      // Completed, log user in!
      const finalUser: User = {
        id: `usr_${Date.now()}`,
        name: fullName || (isRegistering ? 'Tourishq Member' : 'Kishor Shekhawat'),
        email: email || 'kishor@tourishq.co',
        phone: phone || '+91 9876543210',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop', // Beautiful placeholder
        role: email.toLowerCase().includes('admin') ? 'admin' : 'customer'
      };
      onLogin(finalUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-full max-w-md bg-stone-950/90 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Glow ambient background sphere */}
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-white/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-2">Secure Gateway</span>
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            Enter <span className={getAccentText()}>Tourishq</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Unlock tailored itineraries, luxury checkout states & live dispatch trackers.
          </p>
        </div>

        {/* Login Method Tab selectors */}
        {step === 1 && (
          <div className="flex bg-zinc-900 rounded-xl p-1 border border-white/5 mb-6 text-xs">
            <button
              type="button"
              onClick={() => { setMethod('email'); setIsRegistering(false); }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                method === 'email' ? `${getAccentBg()} text-black shadow` : 'text-zinc-400 hover:text-white'
              }`}
            >
              Email Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMethod('phone'); setIsRegistering(false); }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                method === 'phone' ? `${getAccentBg()} text-black shadow` : 'text-zinc-400 hover:text-white'
              }`}
            >
              Phone SMS Code
            </button>
          </div>
        )}

        <form onSubmit={handleNextStep} className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {/* Email flow */}
                {method === 'email' ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400">Email Address (Type "admin@tourishq.co" for Admin mode)</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-zinc-500" size={16} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g., kishor@tourishq.co"
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-zinc-500" size={16} />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  // Phone SMS Code flow
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 text-zinc-500" size={16} />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., +91 98765 43210"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>
                )}

                {/* Optional Registration fields */}
                {isRegistering && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-400 font-mono">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Nand Kishor Shekhawat"
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                )}

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                  >
                    {isRegistering ? 'Already have an account? Log In' : 'Create a fresh account instead'}
                  </button>
                </div>
              </motion.div>
            ) : (
              // Step 2: Verification code
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="p-3 bg-white/5 rounded-xl text-center text-xs text-zinc-300 leading-relaxed font-mono">
                  A simulated OTP security code was dispatched. Enter any numeric or character combination to bypass.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Security Verification PIN</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="e.g., 202605"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-center text-white text-lg font-bold font-mono focus:outline-none tracking-widest"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl font-bold text-black text-xs flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-lg hover:brightness-110 transition-transform active:scale-98 ${getAccentBg()}`}
          >
            {step === 1 ? 'Verify Credentials' : 'Authorize Escrow Entrance'}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-xs text-zinc-500">
          <button
            type="button"
            onClick={onCancel}
            className="hover:text-white transition-colors"
          >
            Escape Guest Access
          </button>
          <span>128-bit SSL Secured</span>
        </div>
      </motion.div>
    </div>
  );
};
