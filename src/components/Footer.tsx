import React, { useRef, useEffect } from 'react';

export const Footer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let reverseInterval: any;

    const handleEnded = () => {
      // Force manual scrub rewind for cross-browser ping-pong
      clearInterval(reverseInterval);
      reverseInterval = setInterval(() => {
        if (video.currentTime <= 0.1) {
          clearInterval(reverseInterval);
          video.play();
        } else {
          video.currentTime = Math.max(0, video.currentTime - 0.05);
        }
      }, 30);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearInterval(reverseInterval);
    };
  }, []);

  return (
    <footer className="relative pt-12 pb-16 z-20 mt-24 text-white">
      {/* Smooth fade into above section */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />

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
        
        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 relative z-20">
          
          {/* Left: Hook & Newsletter */}
          <div className="lg:col-span-7 space-y-10 mt-12">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
              Ready for the <br />
              <span className="italic font-light text-[#009e83]">extraordinary?</span>
            </h2>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
              Join our exclusive list to receive curated itineraries, private estate accesses, and invitations to world-class events.
            </p>
            
            {/* Glassmorphic Input */}
            <div className="relative max-w-md mt-8 group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-full py-4 pl-6 pr-32 text-white placeholder-zinc-500 focus:outline-none focus:border-[#009e83]/50 transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#009e83] hover:bg-[#007a65] text-white px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group-hover:pr-4">
                Join
                <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">→</span>
              </button>
            </div>
          </div>

          {/* Right: Minimal Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pl-12 lg:mt-12">
            <div className="space-y-6">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-widest opacity-50">Explore</h4>
              <ul className="space-y-4">
                {['Destinations', 'Private Aviation', 'Yacht Charters', 'Concierge', 'Experiences'].map((link) => (
                  <li key={link} className="group cursor-pointer flex items-center">
                    <span className="text-zinc-300 group-hover:text-white transition-colors">{link}</span>
                    <span className="text-[#009e83] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">→</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-white text-[10px] font-bold uppercase tracking-widest opacity-50">Studio</h4>
              <ul className="space-y-4">
                {['About Us', 'Journal', 'Careers', 'Contact', 'Press'].map((link) => (
                  <li key={link} className="group cursor-pointer flex items-center">
                    <span className="text-zinc-300 group-hover:text-white transition-colors">{link}</span>
                    <span className="text-[#009e83] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 pb-4 relative z-20">
          <div className="flex items-center gap-6 text-[9px] uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="text-zinc-500 text-[9px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Tourishq AI Studio
          </p>
        </div>

      </div>

      {/* Oversized Background Typography */}
      <div className="absolute bottom-[-3%] left-0 w-full text-center pointer-events-none z-0 overflow-hidden flex justify-center">
        <h1 className="text-[16vw] font-serif font-black text-white leading-none tracking-tighter opacity-[0.03] select-none uppercase whitespace-nowrap">
          Tourishq
        </h1>
      </div>
    </footer>
  );
};
