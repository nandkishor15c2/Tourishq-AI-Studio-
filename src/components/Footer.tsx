import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-16 pb-24 md:pb-12 overflow-hidden z-20">
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#009e83]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ffbc00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent to-white" />
                <span className="text-lg font-serif font-black tracking-tight text-white group-hover:scale-110 transition-transform">Tq</span>
              </div>
              <span className="text-xl font-serif font-black text-white tracking-widest uppercase">Tourishq</span>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Discover unparalleled bespoke itineraries, hyper-realistic previews, and elite concierge services tailored to your aesthetic.
            </p>

            <div className="pt-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Join the Passport Club</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-[#009e83] transition-colors placeholder:text-zinc-600"
                />
                <button className="bg-[#009e83] text-white px-4 rounded-xl flex items-center justify-center hover:bg-[#00826b] transition-colors shadow-lg shadow-[#009e83]/20">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1 */}
            <div className="space-y-4">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-2">Destinations</h4>
              <ul className="space-y-2.5">
                {['Alpine Escapes', 'Tropical Retreats', 'Desert Safaris', 'Urban Experiences', 'Cultural Tours'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-[#009e83] text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-2">Company</h4>
              <ul className="space-y-2.5">
                {['About Studio', 'Our Story', 'Travel Advisory', 'Careers', 'Press & Media'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-[#ffbc00] text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-2">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-zinc-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-zinc-500" />
                  <span>100 AI Studio Way<br />San Francisco, CA 94107</span>
                </li>
                <li className="flex items-center gap-2.5 text-zinc-400 text-sm">
                  <Phone className="w-4 h-4 shrink-0 text-zinc-500" />
                  <span>+1 (800) 555-0199</span>
                </li>
                <li className="flex items-center gap-2.5 text-zinc-400 text-sm">
                  <Mail className="w-4 h-4 shrink-0 text-zinc-500" />
                  <span>concierge@tourishq.co</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Tourishq AI Studio. All rights reserved. Designed for the discerning traveler.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
