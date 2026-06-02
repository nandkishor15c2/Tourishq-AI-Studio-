import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#021612] pt-12 pb-16 z-20 mt-32">
      {/* Landscape Silhouette (bleeds upward) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none" 
        className="absolute bottom-full left-0 w-full h-[120px] md:h-[280px] pointer-events-none" 
        style={{ transform: 'translateY(2px)' }}
      >
        <path fill="#021612" fillOpacity="0.4" d="M0,320 L0,200 L50,210 L150,120 L250,180 L320,140 L450,240 L500,220 L600,130 L680,150 L800,50 L950,180 L1050,160 L1200,280 L1250,250 L1350,100 L1440,200 L1440,320 Z"></path>
        <path fill="#021612" fillOpacity="0.6" d="M0,320 L0,240 L80,220 L180,150 L280,200 L350,170 L480,260 L540,240 L650,160 L750,190 L880,90 L1020,220 L1120,190 L1280,300 L1320,280 L1440,150 L1440,320 Z"></path>
        <path fill="#021612" d="M0,320 L0,280 L120,250 L220,190 L320,240 L380,210 L520,290 L580,260 L700,190 L800,230 L920,140 L1060,260 L1180,230 L1320,320 L1380,300 L1440,240 L1440,320 Z"></path>
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border-b border-[#009e83]/10 pb-12">
          
          {/* Column 1 */}
          <div className="md:pr-10 md:border-r md:border-[#009e83]/20 space-y-4">
            <h4 className="text-[#009e83] text-xs font-bold uppercase tracking-widest mb-6">Destinations</h4>
            <ul className="space-y-3">
              {['Alpine Escapes', 'Tropical Retreats', 'Desert Safaris', 'Urban Experiences', 'Cultural Tours', 'Seasonal Specials'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="md:px-10 md:border-r md:border-[#009e83]/20 space-y-4">
            <h4 className="text-[#009e83] text-xs font-bold uppercase tracking-widest mb-6">Concierge</h4>
            <ul className="space-y-3">
              {['Bespoke Planning', 'Flight Arrangements', 'Luxury Stays', 'Private Guides', 'Event Access', 'Travel Insurance'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="md:px-10 md:border-r md:border-[#009e83]/20 space-y-4">
            <h4 className="text-[#009e83] text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Studio', 'Our Story', 'Journal & Press', 'Careers', 'Sustainability', 'Partners'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className="md:pl-10 space-y-4">
            <h4 className="text-[#009e83] text-xs font-bold uppercase tracking-widest mb-6">Resources</h4>
            <ul className="space-y-3">
              {['Support Center', 'Travel Advisories', 'Client Portal', 'Gift Cards', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-400 hover:text-white text-[10px] uppercase tracking-widest transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-6 h-6 rounded-md bg-[#009e83]/20 flex items-center justify-center">
              <span className="text-[9px] font-serif font-black text-[#009e83]">Tq</span>
            </div>
            <span className="text-xs font-serif font-black text-[#009e83] tracking-widest uppercase">Tourishq</span>
          </div>

          <p className="text-[#009e83]/60 text-[9px] uppercase tracking-widest text-center">
            &copy; {new Date().getFullYear()} Tourishq AI Studio. A luxury travel service provider.
          </p>

          <div className="flex items-center gap-4 text-[#009e83]/60 text-[9px] uppercase tracking-widest">
            <a href="#" className="hover:text-[#009e83] transition-colors">Global Site</a>
            <span>|</span>
            <a href="#" className="hover:text-[#009e83] transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
