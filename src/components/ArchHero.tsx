import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Wand2 } from 'lucide-react';
import { Destination } from '../types';

interface ArchHeroProps {
  destinations: Destination[];
}

export const ArchHero: React.FC<ArchHeroProps> = ({ destinations }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // We want to duplicate some destinations if we have fewer than 7 to make a perfect arch
  let displayItems = [...destinations];
  while (displayItems.length < 7) {
    displayItems = [...displayItems, ...destinations];
  }
  displayItems = displayItems.slice(0, 7); // Exactly 7 items for symmetry

  // Arch mathematical properties
  const radiusX = isMobile ? 180 : isTablet ? 300 : 450;
  const radiusY = isMobile ? 150 : isTablet ? 250 : 350;
  const cardWidth = isMobile ? 90 : isTablet ? 130 : 170;
  const cardHeight = isMobile ? 90 : isTablet ? 130 : 170;

  return (
    <section className="relative w-full max-w-7xl mx-auto py-24 md:py-32 px-4 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-24" />
      </div>

      {/* --- THE ARCH OF CARDS --- */}
      <div 
        className="relative flex items-end justify-center z-10 w-full"
        style={{ height: isMobile ? 220 : isTablet ? 320 : 420, marginBottom: isMobile ? 20 : 40 }}
      >
        {displayItems.map((dest, i) => {
          // Angle from PI (180deg) to 0, evenly spaced
          const angle = Math.PI - (i / (displayItems.length - 1)) * Math.PI;
          
          // Calculate X and Y on the ellipse perimeter
          const x = Math.cos(angle) * radiusX;
          const y = -Math.sin(angle) * radiusY; // negative because Y goes down in DOM
          
          // Rotate the card to point outwards from the center
          // At PI (left), rotate -90. At 0 (right), rotate 90.
          const rotation = (angle * 180) / Math.PI - 90;

          return (
            <motion.div
              key={`${dest.id}-${i}`}
              className="absolute bottom-0"
              style={{
                width: cardWidth,
                height: cardHeight,
                originX: 0.5,
                originY: 0.5,
                zIndex: 30 - Math.abs(3 - i)
              }}
              initial={{ x: 0, y: 100, rotate: 0, opacity: 0, scale: 0.5 }}
              whileInView={{ x, y, rotate: -rotation, opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', stiffness: 60, damping: 14, delay: i * 0.1 }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <motion.div
                  className="w-full h-full rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 cursor-pointer"
                  whileHover={{ 
                    scale: 1.15, 
                    boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.15)'
                  }}
                  transition={{ duration: 0.15 }} // fast hover speed
                >
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* --- HERO CONTENT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center z-20 max-w-3xl space-y-5 md:space-y-6 px-4 -mt-20 md:-mt-40 relative pointer-events-none"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
          Create Stunning AI Generated Itineraries Instantly
        </h2>
        
        <p className="text-xs md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Turn ideas into precision-crafted visual journeys instantly.
        </p>

        <div className="pointer-events-auto">
          <button className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> Start Generating Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>
      </motion.div>

      {/* --- FEATURE COLUMNS --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20 w-full max-w-5xl text-center px-6"
      >
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg font-serif font-bold text-white">Realistic Results</h3>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-[250px] mx-auto">
            Hyper-realistic previews.
          </p>
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg font-serif font-bold text-white">Fast Generation</h3>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-[250px] mx-auto">
            Build itineraries in seconds.
          </p>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg font-serif font-bold text-white">Diverse Styles</h3>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-[250px] mx-auto">
            Range of aesthetic options.
          </p>
        </div>
      </motion.div>

    </section>
  );
};
