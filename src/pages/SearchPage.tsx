import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, MapPin, Calendar, Users, Sliders, DollarSign, Phone, HelpCircle, Clock, Sparkles, Award, ChevronRight, ShieldCheck, Star, User, LogOut, Map, ClipboardList, Flame, ArrowRight, Heart, Send, MessageCircle, LayoutDashboard, Play, Pause, Sun, CloudRain, Snowflake, ChevronUp, CheckCircle, XCircle, Tag, Thermometer, Droplets, Wind, Shield, CheckCircle2, ChevronDown, HeartPulse, ShieldAlert, PlayCircle, Navigation, Search, Activity, Info } from 'lucide-react';

import { AuthContainer } from '../components/AuthContainer';
import { ProductCard } from '../components/ProductCard';
import { SplitCarousel } from '../components/SplitCarousel';
import { ArchHero } from '../components/ArchHero';
import { SupportTicketSystem } from '../components/SupportTicketSystem';
import { InternalAdminDashboard } from '../components/InternalAdminDashboard';

export const SearchPage = (props: any) => {
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, filterTheme, setFilterTheme, filterMaxDays, setFilterMaxDays, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations, promotions, seasonalThemes } = props;
  
  useEffect(() => {
    if (activeTab !== 'search' || selectedDest) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (promotions.length || 1));
    }, 3000);
    
    return () => clearInterval(timer);
  }, [activeTab, selectedDest]);

  useEffect(() => {
    if (sliderRef.current) {
      const child = sliderRef.current.children[currentSlide] as HTMLElement;
      if (child) {
        sliderRef.current.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      }
    }
  }, [currentSlide]);

  return (
    <>
{/* VIEW 2: DETAILED DESTINATION CATALOG (Search & Filtering) */}
        {activeTab === 'search' && !selectedDest && (
          <div className="space-y-8 relative">
            
            {/* Promotional Hero Banners (Mobile Swipeable Slider) */}
            <div className="relative w-full rounded-[32px] overflow-hidden group">
              <div 
                ref={sliderRef}
                className="relative w-full flex overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {promotions.map((promo: any, idx: number) => (
                  <div key={idx} className="relative w-full min-w-full h-[320px] md:h-[400px] overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 snap-center bg-black">
                    <img 
                      src={promo.image} 
                      alt={promo.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent pointer-events-none" />
                    
                    <div className="absolute inset-y-0 left-0 p-6 sm:p-8 md:p-16 flex flex-col justify-center max-w-2xl z-10">
                      <span className="text-[10px] sm:text-xs uppercase font-bold font-mono text-black tracking-widest bg-amber-400 px-3 py-1 sm:py-1.5 rounded-lg mb-3 sm:mb-4 inline-block w-max">
                        {promo.tagline || promo.badge}
                      </span>
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-snug sm:leading-tight mb-3 sm:mb-4 max-w-[95%]">
                        {promo.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-zinc-300 mb-5 sm:mb-6 max-w-md line-clamp-2 sm:line-clamp-3">
                        {promo.description}
                      </p>
                      <button 
                        onClick={() => navigate(`/search/${promo.destinationId}`)}
                        className={`w-max px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-black shadow-lg hover:scale-105 active:scale-95 transition-all ${currentTheme.accentBg}`}
                      >
                        Explore Offers
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
                {promotions.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all pointer-events-auto ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/80 w-2'}`}
                  />
                ))}
              </div>
            </div>

            {/* Main Content Layout (Full Width) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2 px-2">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">Curated Havens</h3>
                  <p className="text-xs text-zinc-400 mt-1">Showing {filteredDestinations.length} matching properties</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDestinations.map((dest: any) => (
                  <ProductCard
                    key={dest.id}
                    dest={dest}
                    onClick={() => setSelectedDest(dest)}
                  />
                ))}

                {filteredDestinations.length === 0 && (
                  <div className="col-span-full text-center py-20 bg-zinc-900/10 rounded-3xl border border-white/5">
                    <Compass className="mx-auto text-zinc-700 mb-3" size={40} />
                    <p className="text-base text-zinc-300 font-semibold">No high-end properties matching criteria.</p>
                    <p className="text-sm text-zinc-500 mt-2">Adjust your filters to find more options.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Action Button */}
            <button 
              onClick={() => setShowFilterOverlay(true)}
              className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/20 hover:scale-110 active:scale-95 transition-all group ${currentTheme.accentBg}`}
            >
              <Sliders size={22} className="text-black group-hover:rotate-12 transition-transform" />
              {(filterTheme !== 'all' || filterSeason !== 'all' || priceRange < 5000 || filterMaxDays < 30 || searchQuery !== '') && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#121315]" />
              )}
            </button>

            {/* Sliding Full-Screen Filter Lightbox */}
            <div className={`fixed inset-0 z-[100] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${showFilterOverlay ? 'translate-y-0' : '-translate-y-full'}`}>
              {/* Blurred Background Overlay */}
              <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-3xl" onClick={() => setShowFilterOverlay(false)} />
              
              {/* Filter Content Container */}
              <div className="absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto bg-black/40 border-b border-white/10 shadow-2xl">
                <div className="max-w-6xl mx-auto p-6 md:px-12 md:pb-12 pt-20 md:pt-24">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-serif font-black text-white">Refine Search</h2>
                      <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase mt-2">Interactive Variable Control</p>
                    </div>
                    <button 
                      onClick={() => setShowFilterOverlay(false)}
                      className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:rotate-90 transition-all"
                    >
                      <XCircle size={32} className="text-white" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-12">
                    
                    {/* Destination Search */}
                    <div className="space-y-3 relative group lg:col-span-2">
                      <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2 uppercase tracking-widest"><Search size={14} className="text-zinc-500"/> Destination</label>
                      <input
                        type="text"
                        placeholder="e.g., Japan, Greece..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500/50 transition-colors peer"
                      />
                      <div className="absolute top-full mt-3 left-0 right-0 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all duration-200">
                        <div className="p-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider bg-black/20 border-b border-white/5">Suggested</div>
                        {destinations.slice(0, 5).map((d: any) => (
                          <div 
                            key={d.id}
                            className="px-6 py-4 hover:bg-white/5 cursor-pointer flex items-center gap-4 text-sm text-zinc-300 transition-colors border-b border-white/5 last:border-0"
                            onClick={() => setSearchQuery(d.name)}
                          >
                            <MapPin size={16} className="text-zinc-500"/> 
                            <div>
                              <span className="font-bold text-white block">{d.name}</span>
                              <span className="text-xs text-zinc-500 block">{d.country}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-semibold text-zinc-300 flex items-center gap-2 uppercase tracking-widest"><DollarSign size={14} className="text-zinc-500"/> Max Budget</label>
                        <span className="font-mono text-[10px] text-white font-bold bg-white/5 px-2 py-1 rounded-md border border-white/5">${priceRange}</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="5000"
                        step="100"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer mt-3"
                      />
                    </div>

                    {/* Duration */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-semibold text-zinc-300 flex items-center gap-2 uppercase tracking-widest"><Clock size={14} className="text-zinc-500"/> Max Duration</label>
                        <span className="font-mono text-[10px] text-white font-bold bg-white/5 px-2 py-1 rounded-md border border-white/5">{filterMaxDays} Days</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="30"
                        step="1"
                        value={filterMaxDays}
                        onChange={(e) => setFilterMaxDays(parseInt(e.target.value))}
                        className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer mt-3"
                      />
                    </div>

                    {/* Theme */}
                    <div className="space-y-3 lg:col-span-2">
                      <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2 uppercase tracking-widest"><Activity size={14} className="text-zinc-500"/> Trip Theme</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {['all', 'cultural', 'luxury', 'adventure', 'nature'].map((themeId) => {
                          let Icon = Compass;
                          if (themeId === 'cultural') Icon = Award;
                          if (themeId === 'luxury') Icon = Sparkles;
                          if (themeId === 'adventure') Icon = Navigation;
                          if (themeId === 'nature') Icon = Droplets;

                          return (
                          <button
                            key={themeId}
                            onClick={() => setFilterTheme(themeId)}
                            className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 text-[10px] uppercase font-bold tracking-tight rounded-xl border cursor-pointer transition-all ${
                              filterTheme === themeId
                                ? `${currentTheme.borderActive} bg-white/10 text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]`
                                : 'border-white/5 text-zinc-400 bg-black/20 hover:bg-white/5 hover:text-zinc-200'
                            }`}
                          >
                            <Icon size={18} className={filterTheme === themeId ? currentTheme.text : 'text-zinc-500'} />
                            {themeId}
                          </button>
                        )})}
                      </div>
                    </div>

                    {/* Season */}
                    <div className="space-y-3 lg:col-span-2">
                      <label className="text-xs font-semibold text-zinc-300 flex items-center gap-2 uppercase tracking-widest"><Sun size={14} className="text-zinc-500"/> Season</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {['all', 'spring', 'summer', 'monsoon', 'winter'].map((seasonId) => {
                          let Icon = Map;
                          if (seasonId === 'spring') Icon = Wind;
                          if (seasonId === 'summer') Icon = Sun;
                          if (seasonId === 'monsoon') Icon = CloudRain;
                          if (seasonId === 'winter') Icon = Snowflake;

                          return (
                          <button
                            key={seasonId}
                            onClick={() => setFilterSeason(seasonId)}
                            className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 text-[10px] uppercase font-bold tracking-tight rounded-xl border cursor-pointer transition-all ${
                              filterSeason === seasonId
                                ? `${currentTheme.borderActive} bg-white/10 text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]`
                                : 'border-white/5 text-zinc-400 bg-black/20 hover:bg-white/5 hover:text-zinc-200'
                            }`}
                          >
                            <Icon size={18} className={filterSeason === seasonId ? currentTheme.text : 'text-zinc-500'} />
                            {seasonId}
                          </button>
                        )})}
                      </div>
                    </div>

                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-8">
                    <button 
                      onClick={() => {
                        setFilterTheme('all');
                        setFilterSeason('all');
                        setPriceRange(5000);
                        setFilterMaxDays(30);
                        setSearchQuery('');
                      }}
                      className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
                    >
                      Reset All
                    </button>
                    <button 
                      onClick={() => setShowFilterOverlay(false)}
                      className={`px-8 py-3 rounded-xl font-black text-xs text-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${currentTheme.accentBg}`}
                    >
                      Apply & Show {filteredDestinations.length} Results <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
    </>
  );
};
