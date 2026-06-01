import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Compass, 
  Headphones, 
  Luggage, 
  ShieldCheck, 
  Info, 
  User, 
  Sparkles,
  Sun,
  CloudRain,
  Snowflake,
  LogOut,
  ChevronUp
} from 'lucide-react';
import { Destination } from '../types';

const DEFAULT_SPRING = {
  stiffness: 400,
  damping: 25,
  mass: 0.4,
};

interface BlurGlassHeaderProps {
  currentTheme: {
    id: string;
    label: string;
    colorClass: string;
    accent: string;
    accentBg: string;
  };
  season: 'spring' | 'summer' | 'monsoon' | 'winter';
  setSeason: (season: 'spring' | 'summer' | 'monsoon' | 'winter') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSelectedDest: (dest: Destination | null) => void;
  currentUser: any;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const getTabIcon = (label: string) => {
  switch (label) {
    case 'Home':
      return <Home className="w-5 h-5" />;
    case 'Destinations':
      return <Compass className="w-5 h-5" />;
    case 'Concierge':
      return <Headphones className="w-5 h-5" />;
    case 'My Escapes':
      return <Luggage className="w-5 h-5" />;
    case 'Control Center':
      return <ShieldCheck className="w-5 h-5" />;
    case 'About':
      return <Info className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

const DockItem = ({
  item,
  index,
  mouseX,
  onHover,
  onClick,
  isActive,
  iconSize = 44,
  magnification = 1.4,
  distance = 70,
  activeColor = 'text-amber-400',
}: {
  item: { label: string; id: string };
  index: number;
  mouseX: any;
  onHover: (index: number | null) => void;
  onClick: () => void;
  isActive: boolean;
  iconSize?: number;
  magnification?: number;
  distance?: number;
  activeColor?: string;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Measure distance from cursor to center of this element in desktop view
  const distanceFromMouse = useTransform(mouseX, (val: number) => {
    const el = wrapperRef.current;
    if (!el || val === Infinity) return distance * 10;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  // Calculate scaling factor
  const scalingFactor = useTransform(distanceFromMouse, (d: number) => {
    return (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;
  });

  const widthRaw = useTransform(scalingFactor, (s: number) => iconSize * s);
  const heightRaw = useTransform(scalingFactor, (s: number) => iconSize * s);

  const width = useSpring(widthRaw, DEFAULT_SPRING);
  const height = useSpring(heightRaw, DEFAULT_SPRING);

  return (
    <motion.div
      ref={wrapperRef}
      className="relative flex items-center justify-center cursor-pointer select-none"
      onClick={onClick}
      style={{ width: iconSize, height: iconSize }}
    >
      <motion.div
        style={{ width, height }}
        className="absolute flex items-center justify-center rounded-2xl"
      >
        <motion.div
          className={`absolute rounded-2xl ${isActive ? 'bg-white/10 border border-white/20 shadow-md' : 'bg-transparent hover:bg-white/5'}`}
          initial={false}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        <div
          onMouseEnter={() => { setIsHovered(true); onHover(index); }}
          onMouseLeave={() => { setIsHovered(false); onHover(null); }}
          className={`relative z-10 flex items-center justify-center transition-colors duration-200 ${
            isActive ? activeColor : 'text-zinc-400 hover:text-white'
          }`}
        >
          {getTabIcon(item.label)}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const BlurGlassHeader: React.FC<BlurGlassHeaderProps> = ({
  currentTheme,
  season,
  setSeason,
  activeTab,
  setActiveTab,
  setSelectedDest,
  currentUser,
  onLoginClick,
  onLogoutClick,
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const mouseX = useMotionValue(Infinity);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipBottomOffset, setTooltipBottomOffset] = useState(0);

  const dockRef = useRef<HTMLDivElement>(null);

  // List of standard items
  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'Concierge', id: 'support' },
    { label: 'My Escapes', id: 'dashboard' },
    { label: 'About', id: 'about' },
  ];

  // Insert administrative control center if logged-in user is admin
  if (currentUser?.email?.toLowerCase() === 'admin@tourishq.co') {
    menuItems.splice(4, 0, { label: 'Control Center', id: 'admin' });
  }

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
    if (index !== null && dockRef.current) {
      const dockEl = dockRef.current;
      const items = dockEl.querySelectorAll('[data-dock-item]');
      if (items[index]) {
        const itemRect = items[index].getBoundingClientRect();
        const dockRect = dockEl.getBoundingClientRect();
        setTooltipX(itemRect.left - dockRect.left + itemRect.width / 2);
        setTooltipBottomOffset(dockRect.bottom - itemRect.top + 10);
      }
    }
  }, []);

  const getSeasonIcon = (s: string) => {
    switch (s) {
      case 'spring':
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />;
      case 'summer':
        return <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-spin-slow" />;
      case 'monsoon':
        return <CloudRain className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 text-cyan-400" />;
      case 'winter':
        return <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 text-sky-400" />;
      default:
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    }
  };

  const getActiveTabColor = () => {
    switch (season) {
      case 'spring':
        return 'text-pink-400';
      case 'summer':
        return 'text-[#FF4D00]';
      case 'monsoon':
        return 'text-teal-450 text-cyan-400';
      case 'winter':
        return 'text-blue-400 text-sky-450';
      default:
        return 'text-amber-400';
    }
  };

  // Dynamically set properties to fit exactly in narrow viewports
  const activeIconSize = isMobile ? 36 : isTablet ? 40 : 44;
  const activeMagnification = isMobile ? 1.15 : isTablet ? 1.25 : 1.35;
  const activeDistance = isMobile ? 40 : isTablet ? 50 : 60;

  return (
    <>
      <motion.div
        ref={dockRef}
        className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 lg:left-1/2 lg:-translate-x-1/2 lg:bottom-6 lg:w-auto flex items-center justify-between lg:justify-center px-3 sm:px-5 py-2 bg-black/75 backdrop-blur-3xl border border-white/10 rounded-[24px] lg:rounded-[32px] z-50 lg:min-w-0 lg:max-w-fit shadow-2xl transform"
        style={{ gap: isMobile ? 6 : 12 }}
        onMouseMove={(e) => {
          if (window.innerWidth >= 1024) {
            mouseX.set(e.clientX);
          }
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setHoveredIndex(null);
        }}
      >
        
        {/* BRAND SIGNATURE & LOGO DESIGN - Hidden on mobile to fit elements */}
        {!isMobile && (
          <div 
            onClick={() => { setActiveTab('home'); setSelectedDest(null); }}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none border-r border-white/10 pr-2.5 sm:pr-3.5 py-1.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center shadow-inner relative overflow-hidden group">
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent to-white`} />
              <span className="text-xs font-serif font-black tracking-tight text-white group-hover:scale-110 transition-transform">Tq</span>
            </div>
            <span className="hidden sm:block leading-none tracking-wider text-xs font-serif uppercase text-white font-black hover:text-zinc-200 transition-colors select-none">
              Tourishq
            </span>
          </div>
        )}

        {/* FLOATING DOCK NAV ITEMS */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {menuItems.map((item, i) => {
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} data-dock-item>
                <DockItem
                  item={item}
                  index={i}
                  mouseX={mouseX}
                  onHover={handleHover}
                  isActive={isActive}
                  activeColor={getActiveTabColor()}
                  iconSize={activeIconSize}
                  magnification={activeMagnification}
                  distance={activeDistance}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedDest(null);
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* DIVIDER */}
        <div className="h-6 w-[1px] bg-white/10 self-center hidden sm:block" />

        {/* DOCK UTILITIES: SEASON SWITCHER & PROFILE TRIGGER */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-l border-white/10 sm:border-l-0 pl-1.5 sm:pl-0">
          
          {/* POPULAR IMMERSIVE SEASON SWITCHER POPUP BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
              className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all text-white relative group cursor-pointer"
              type="button"
              title="Transform Atmospheric Vibe"
            >
              {getSeasonIcon(season)}
              <ChevronUp className={`w-3 h-3 text-zinc-400 ml-0.5 sm:ml-1 transition-transform duration-300 ${showSeasonDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Floatover Seasonal select panel */}
            <AnimatePresence>
              {showSeasonDropdown && (
                <>
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowSeasonDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                    className="absolute bottom-full right-0 mb-3.5 bg-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl z-50 w-44 space-y-1.5"
                  >
                    <div className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase pb-1 px-1 border-b border-white/5 font-semibold">
                      Transform Mood
                    </div>

                    {[
                      { id: 'spring', label: '🌸 Warm Spring', col: 'hover:bg-pink-500/10 hover:text-pink-400' },
                      { id: 'summer', label: '☀️ Clear Summer', col: 'hover:bg-amber-500/10 hover:text-amber-400' },
                      { id: 'monsoon', label: '🌧️ Misty Monsoon', col: 'hover:bg-teal-500/10 hover:text-teal-400' },
                      { id: 'winter', label: '❄️ Snowy Winter', col: 'hover:bg-blue-500/10 hover:text-blue-400' },
                    ].map((sOption) => (
                      <button
                        key={sOption.id}
                        onClick={() => {
                          setSeason(sOption.id as any);
                          setShowSeasonDropdown(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-200 flex items-center justify-between ${
                          season === sOption.id 
                            ? 'bg-white/10 text-white border border-white/10' 
                            : 'text-zinc-400 border border-transparent ' + sOption.col
                        }`}
                      >
                        <span>{sOption.label}</span>
                        {season === sOption.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE POPULAR AUTHENTIC CONNECTIONS BUTTON */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <div 
                onClick={() => setActiveTab('dashboard')} 
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer relative group flex items-center justify-center bg-white/5 hover:bg-white/10"
                title={`${currentUser.name}'s Escapes`}
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] sm:text-[11px] font-bold font-mono text-white">{currentUser.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <button
                type="button"
                onClick={onLogoutClick}
                className="hidden sm:flex p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/15 hover:border-red-500/20 text-zinc-400 hover:text-red-400 cursor-pointer active:scale-95 transition-all"
                title="Disconnect Passport Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-extrabold rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer select-none border border-transparent active:scale-95 duration-100 shrink-0 shadow-lg"
              type="button"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Connect</span>
            </button>
          )}

        </div>

        {/* DOCK TOOLTIP */}
        <AnimatePresence>
          {hoveredIndex !== null && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.94 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="pointer-events-none absolute flex flex-col items-center z-50"
              style={{
                left: tooltipX,
                bottom: tooltipBottomOffset,
                x: '-50%',
              }}
            >
              <span className="rounded-lg bg-zinc-950/95 text-zinc-200 border border-white/10 px-2.5 py-1.5 text-[10.5px] font-bold font-mono tracking-wide uppercase shadow-lg shadow-black/80 whitespace-nowrap">
                {menuItems[hoveredIndex].label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </>
  );
};
