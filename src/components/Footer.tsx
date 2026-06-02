import React, { useRef, useEffect } from 'react';

export const Footer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let reverseInterval: any;

    const handleEnded = () => {
      video.pause();
      
      video.playbackRate = -1;
      
      // Fallback if browser ignores negative playback rate
      if (video.playbackRate >= 0) {
        clearInterval(reverseInterval);
        reverseInterval = setInterval(() => {
          if (video.currentTime <= 0.1) {
            clearInterval(reverseInterval);
            video.play();
          } else {
            // Manual scrub rewind
            video.currentTime -= 0.05; 
          }
        }, 30);
      } else {
        video.play();
      }
    };

    const handleTimeUpdate = () => {
      if (video.playbackRate < 0 && video.currentTime <= 0.1) {
        video.playbackRate = 1;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      clearInterval(reverseInterval);
    };
  }, []);

  return (
    <footer className="relative pt-12 pb-16 z-20 mt-24 text-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/footer-bg.mp4" type="video/mp4" />
        </video>
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      </div>

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
