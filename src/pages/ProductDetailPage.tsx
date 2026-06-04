import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, MapPin, Calendar, Users, Sliders, DollarSign, Phone, HelpCircle, Clock, Sparkles, Award, ChevronRight, ShieldCheck, Star, User, LogOut, Map, ClipboardList, Flame, ArrowRight, Heart, Send, MessageCircle, LayoutDashboard, Play, Pause, Sun, CloudRain, Snowflake, ChevronUp, CheckCircle, XCircle, Tag, Thermometer, Droplets, Wind, Shield, CheckCircle2, ChevronDown, HeartPulse, ShieldAlert, PlayCircle, Navigation, Search, Activity, Info } from 'lucide-react';
import { SEASONAL_THEMES_DATA, PROMOTIONS, DESTINATIONS } from '../data';
import { AuthContainer } from '../components/AuthContainer';
import { ProductCard } from '../components/ProductCard';
import { SplitCarousel } from '../components/SplitCarousel';
import { ArchHero } from '../components/ArchHero';
import { SupportTicketSystem } from '../components/SupportTicketSystem';
import { InternalAdminDashboard } from '../components/InternalAdminDashboard';

export const ProductDetailPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  const [showNavDropdown, setShowNavDropdown] = useState(false);

  useEffect(() => {
    if (!selectedDest || !selectedProduct) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveDetailSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    
    const sections = ['overview', 'itinerary', 'inclusions', 'hotels', 'policy'];
    sections.forEach(sec => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [selectedDest, selectedProduct, setActiveDetailSection]);

  return (
    <>
{/* VIEW 4: PRODUCT DETAIL PAGE */}
        {selectedDest && selectedProduct && (
          <div className="space-y-12 animate-fade-in text-left pb-24 relative">
            {/* Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-950/40 p-3 rounded-2xl border border-white/5 relative z-10">
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
              >
                ← Back to {selectedDest.name}
              </button>
              <div className="text-[11px] font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                Package: <span className="text-white font-bold">{selectedProduct.name}</span>
              </div>
            </div>

            {/* HERO SLIDER (Scroll Snap Carousel) */}
            <div className="relative h-[500px] sm:h-[600px] md:h-[700px] xl:h-[75vh] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group flex bg-black">
              <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-full no-scrollbar">
                {selectedProduct.images.map((img, i) => (
                  <div key={i} className="relative min-w-full h-full snap-center overflow-hidden shrink-0">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-10 left-6 right-6 md:left-12 z-10">
                <span className="text-[10px] uppercase font-bold font-mono text-black tracking-widest bg-white/90 px-3 py-1.5 rounded-lg mb-4 inline-block">
                  EXPLORE THE WORLD
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm md:text-lg text-zinc-300 flex items-center gap-2">
                  <MapPin size={16} className={currentTheme.accent} /> {selectedProduct.description.short}
                </p>
              </div>
            </div>



            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
              {/* Left Column (Content) */}
              <div className="lg:col-span-2 space-y-16">
                
                {/* Overview */}
                <section id="overview" className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-white">About this Trip</h3>
                  <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5 relative">
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans line-clamp-3">
                      {selectedProduct.description.full}
                    </p>
                    <button 
                      onClick={() => setShowProductLightbox(true)}
                      className={`font-bold text-sm hover:underline mt-4 flex items-center gap-1 ${currentTheme.accent}`}
                    >
                      Read Full Description <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  {/* Key Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/5 space-y-2">
                      <Calendar className={`w-5 h-5 ${currentTheme.accent}`} />
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Duration</div>
                      <div className="text-sm font-bold text-white">{selectedProduct.keyInformation.duration}</div>
                    </div>
                    <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/5 space-y-2">
                      <MapPin className={`w-5 h-5 ${currentTheme.accent}`} />
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Route</div>
                      <div className="text-sm font-bold text-white truncate">{selectedProduct.keyInformation.locationsRoute}</div>
                    </div>
                    <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/5 space-y-2">
                      <Sun className={`w-5 h-5 ${currentTheme.accent}`} />
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Season</div>
                      <div className="text-sm font-bold text-white">{selectedProduct.keyInformation.bestSeason}</div>
                    </div>
                    <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/5 space-y-2">
                      <Sparkles className={`w-5 h-5 ${currentTheme.accent}`} />
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Type</div>
                      <div className="text-sm font-bold text-white truncate">{selectedProduct.keyInformation.tags.join(', ')}</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-4">
                    <h4 className="text-lg font-bold text-white mb-4">Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProduct.tripHighlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-3 bg-zinc-900/20 p-3 rounded-lg border border-white/5">
                          <Star className={`w-4 h-4 mt-0.5 shrink-0 ${currentTheme.accent}`} />
                          <span className="text-xs text-zinc-300 leading-relaxed">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <hr className="border-white/10" />

                {/* Itinerary Accordion (Collapsible) */}
                <section id="itinerary" className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-white">Itinerary</h3>
                  <div className="space-y-4">
                    {selectedProduct.itinerary.map((day) => {
                      const isOpen = expandedDay === day.day;
                      return (
                        <div key={day.day} className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:bg-zinc-900/50 transition-colors">
                          <button 
                            onClick={() => setExpandedDay(isOpen ? null : day.day)}
                            className="w-full text-left p-5 flex justify-between items-start"
                          >
                            <div>
                              <span className={`text-[10px] font-bold font-mono tracking-widest uppercase mb-1 block ${currentTheme.accent}`}>Day {day.day}</span>
                              <h4 className="text-lg font-bold text-white">{day.title}</h4>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-xs text-amber-500 font-mono flex items-center gap-1">
                                <MapPin size={12} /> {day.location}
                              </span>
                              <ChevronUp size={16} className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                          </button>
                          
                          <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 pb-5">
                              <p className="text-sm text-zinc-400 mb-4">{day.description}</p>
                              {day.details && (
                                <ul className="space-y-1.5">
                                  {(Array.isArray(day.details) ? day.details : [day.details]).map((det, i) => (
                                    <li key={i} className="text-xs text-zinc-500 flex items-start gap-2">
                                      <span className="text-zinc-700 mt-0.5">●</span> {det}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Inclusions */}
                <section id="inclusions" className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-white">Inclusions & Exclusions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6">
                      <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-4"><CheckCircle size={16} /> Included</h4>
                      <ul className="space-y-3">
                        {selectedProduct.inclusionsExclusions.inclusions.map((inc, i) => (
                          <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-emerald-500/50 mt-0.5">✓</span> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6">
                      <h4 className="text-red-400 font-bold flex items-center gap-2 mb-4"><XCircle size={16} /> Excluded</h4>
                      <ul className="space-y-3">
                        {selectedProduct.inclusionsExclusions.exclusions.map((exc, i) => (
                          <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-red-500/50 mt-0.5">✕</span> {exc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column (Sticky Price Box) */}
              <div className="lg:col-span-1">
                {/* Mobile Backdrop for Price Box */}
                {showMobilePriceBox && (
                  <div className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => setShowMobilePriceBox(false)} />
                )}

                <div className={`
                  fixed inset-x-0 bottom-0 z-50 rounded-t-[32px] p-6 pb-24 lg:pb-8 transition-transform duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.7)] max-h-[85vh] overflow-y-auto
                  lg:sticky lg:top-6 lg:inset-auto lg:rounded-[32px] lg:p-8 lg:shadow-2xl lg:translate-y-0 lg:max-h-none lg:overflow-visible
                  bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 lg:from-zinc-900/80 lg:to-zinc-950/80 backdrop-blur-xl border border-white/10 text-left
                  ${showMobilePriceBox ? 'translate-y-0' : 'translate-y-full'} 
                `}>
                  <button onClick={() => setShowMobilePriceBox(false)} className="absolute top-6 right-6 text-zinc-400 lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">✕</button>
                  <h3 className="text-xl font-bold text-white mb-2">Book This Trip</h3>
                  <div className={`w-12 h-1 rounded-full mb-6 ${currentTheme.accentBg}`} />
                  
                  <div className="mb-6">
                    <p className="text-[10px] text-amber-400 uppercase font-mono tracking-widest font-bold mb-1">Starting From</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">${selectedProduct.price.startingFrom}</span>
                      <span className="text-xs text-zinc-500 font-mono">/ {selectedProduct.price.per}</span>
                    </div>
                  </div>

                  {selectedProduct.price.inclusionsSummary && (
                    <div className="mb-6">
                      <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold mb-3">Package Includes</p>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedProduct.price.inclusionsSummary.map((sum, i) => (
                          <div key={i} className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-white/5">
                            <i className={`${sum.icon} ${currentTheme.accent} text-lg`}></i>
                            <span className="text-[9px] text-zinc-400 font-bold leading-tight">{sum.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.price.offers && selectedProduct.price.offers.length > 0 && (
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-6">
                      {selectedProduct.price.offers.map((offer, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                          <Tag className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded mr-2">{offer.code}</span>
                            <span className="text-[11px] text-zinc-300 leading-tight">{offer.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-[10px] text-zinc-500 italic mb-6">
                    {selectedProduct.price.disclaimer}
                  </p>

                  <button
                    onClick={() => {
                      if (!currentUser) setShowAuthModal(true);
                      else setBookingDest(selectedDest);
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-sm text-black shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all ${currentTheme.accentBg}`}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>

            </div>

            {/* MOBILE BOTTOM BAR (TRIGGER) */}
            <div className="lg:hidden fixed bottom-14 sm:bottom-16 left-3 right-3 sm:left-6 sm:right-6 z-40 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[24px] p-3 pl-5 flex justify-between items-center shadow-2xl">
              <div>
                <p className="text-[10px] text-zinc-400">Starting from</p>
                <p className="text-lg font-bold text-white">${selectedProduct.price.startingFrom}</p>
              </div>
              <button 
                onClick={() => setShowMobilePriceBox(true)}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs text-black shadow-lg ${currentTheme.accentBg}`}
              >
                Check Availability
              </button>
            </div>

            {/* DESCRIPTION LIGHTBOX */}
            {showProductLightbox && (
              <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl">
                  <button onClick={() => setShowProductLightbox(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl">✕</button>
                  <h3 className="text-2xl font-serif font-bold text-white mb-6">Trip Details</h3>
                  <div className="text-sm text-zinc-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {selectedProduct.description.full}
                  </div>
                </div>
              </div>
            )}

            {/* FLOATING SECTION NAVIGATOR */}
            <div className={`fixed bottom-[136px] sm:bottom-[150px] lg:bottom-6 right-3 sm:right-6 lg:right-10 z-50 transition-all duration-300 ${showMobilePriceBox ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
              <AnimatePresence>
                {showNavDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full right-0 mb-4 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 w-48 shadow-2xl overflow-hidden"
                  >
                    {[
                      { id: 'overview', label: 'Overview', icon: Info },
                      { id: 'itinerary', label: 'Itinerary', icon: Map },
                      { id: 'inclusions', label: 'Inclusions', icon: CheckCircle2 },
                      { id: 'hotels', label: 'Hotels', icon: MapPin },
                      { id: 'policy', label: 'Policy', icon: ShieldCheck }
                    ].map(sec => {
                      const Icon = sec.icon;
                      const isActive = activeDetailSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setActiveDetailSection(sec.id);
                            setShowNavDropdown(false);
                            const el = document.getElementById(sec.id);
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 100;
                              window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                        >
                          <Icon size={16} className={isActive ? currentTheme.accent : ''} />
                          <span className="text-sm font-semibold">{sec.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowNavDropdown(!showNavDropdown)}
                className={`w-14 h-14 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:scale-105 transition-transform cursor-pointer group`}
              >
                <AnimatePresence mode="wait">
                  {(() => {
                    let ActiveIcon = Info;
                    if (activeDetailSection === 'itinerary') ActiveIcon = Map;
                    if (activeDetailSection === 'inclusions') ActiveIcon = CheckCircle2;
                    if (activeDetailSection === 'hotels') ActiveIcon = MapPin;
                    if (activeDetailSection === 'policy') ActiveIcon = ShieldCheck;
                    return (
                      <motion.div
                        key={activeDetailSection}
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ActiveIcon size={24} className={currentTheme.accent} />
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </button>
            </div>

          </div>
        )}

        
    </>
  );
};
