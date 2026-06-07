import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, MapPin, Calendar, Users, Sliders, DollarSign, Phone, HelpCircle, Clock, Sparkles, Award, ChevronRight, ChevronLeft, ShieldCheck, Star, User, LogOut, Map, ClipboardList, Flame, ArrowRight, ArrowLeft, Heart, Send, MessageCircle, LayoutDashboard, Play, Pause, Sun, CloudRain, Snowflake, ChevronUp, CheckCircle, XCircle, Tag, Thermometer, Droplets, Wind, Shield, CheckCircle2, ChevronDown, HeartPulse, ShieldAlert, PlayCircle, Navigation, Search, Activity, Info, Bed, Utensils, Car, X, ImageIcon } from 'lucide-react';

import { AuthContainer } from '../components/AuthContainer';
import { ProductCard } from '../components/ProductCard';
import { SplitCarousel } from '../components/SplitCarousel';
import { ArchHero } from '../components/ArchHero';
import { SupportTicketSystem } from '../components/SupportTicketSystem';
import { InternalAdminDashboard } from '../components/InternalAdminDashboard';

export const ProductDetailPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  const [showNavDropdown, setShowNavDropdown] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<'All' | 'Overview' | 'Hotels' | 'Activities'>('All');
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState<number | null>(null);

  const visibleGalleryImages = [
    ...(activeGalleryCategory === 'All' || activeGalleryCategory === 'Overview' 
      ? (selectedProduct?.images || []).map((img: any) => ({ src: img.src, alt: img.alt || 'Overview', label: 'Overview', type: 'prod' })) 
      : []),
    ...(activeGalleryCategory === 'All' || activeGalleryCategory === 'Hotels'
      ? (selectedDest?.hotels || []).map((h: any) => ({ src: h.image, alt: h.name, title: h.name, label: 'Hotel', type: 'hotel' }))
      : []),
    ...(activeGalleryCategory === 'All' || activeGalleryCategory === 'Activities'
      ? (selectedDest?.activities || []).map((a: any) => ({ src: a.image, alt: a.title, title: a.title, label: 'Activity', type: 'activity' }))
      : [])
  ];

  const allGalleryImages = [
    ...(selectedProduct?.images || []).map((img: any) => ({ src: img.src, alt: img.alt || 'Overview' })),
    ...(selectedDest?.hotels || []).map((h: any) => ({ src: h.image, alt: h.name })),
    ...(selectedDest?.activities || []).map((a: any) => ({ src: a.image, alt: a.title }))
  ];

  useEffect(() => {
    if (!allGalleryImages.length) return;
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % allGalleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct, selectedDest]);

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
              
              {/* GALLERY TRIGGER BUTTON */}
              <button 
                onClick={() => setShowGallery(true)}
                className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-xl border border-white/20 text-white transition-all group/gallery"
              >
                <ImageIcon size={16} className="text-zinc-300 group-hover/gallery:text-white" />
                <span className="text-sm font-bold tracking-wide">Gallery</span>
                <div className="bg-white/10 px-2 py-0.5 rounded-md text-[10px] font-mono ml-1">
                  {selectedProduct.images.length + (selectedDest?.hotels?.length || 0) + (selectedDest?.activities?.length || 0)}
                </div>
              </button>              {/* SLIDER TRACK */}
              <div 
                className="flex w-full h-full transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentHeroImage * 100}%)` }}
              >
                {allGalleryImages.map((img: any, i: number) => (
                  <div key={i} className="relative min-w-full h-full shrink-0">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
              
              {/* GRADIENT OVERLAY WITH PROGRESSIVE BLUR */}
              {[2, 4, 8, 12, 16, 24].map((blur, index) => (
                <div 
                  key={index} 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ 
                    backdropFilter: `blur(${blur}px)`, 
                    maskImage: 'linear-gradient(to top, black 0%, transparent 40%)', 
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 40%)' 
                  }} 
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              {/* SLIDER DOTS */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 max-w-[80%] overflow-x-auto no-scrollbar py-2">
                {allGalleryImages.map((_: any, i: number) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentHeroImage(i)}
                    className={`h-1.5 rounded-full shrink-0 transition-all duration-300 ${i === currentHeroImage ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                  />
                ))}
              </div>
              
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
                        <div key={day.day} className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden shadow-lg transition-all">
                          <button 
                            onClick={() => setExpandedDay(isOpen ? null : day.day)}
                            className="w-full text-left relative flex items-stretch group min-h-[96px] sm:min-h-[110px]"
                          >
                            {/* Full width Image Background with single smooth gradient */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                              <img 
                                src={selectedProduct.images[(day.day - 1) % selectedProduct.images.length]?.src || selectedProduct.images[0].src} 
                                alt={day.title} 
                                className="w-full h-full object-cover object-right opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-2xl"
                              />
                              {/* Colorless Blur Gradient (Left to Right) */}
                              {[2, 4, 8, 12, 16, 24].map((blur, index) => (
                                <div
                                  key={index}
                                  className="absolute inset-0 rounded-2xl"
                                  style={{
                                    backdropFilter: `blur(${blur}px)`,
                                    maskImage: 'linear-gradient(to right, black 0%, transparent 50%)',
                                    WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 50%)',
                                  }}
                                />
                              ))}
                              {/* Subtle shadow just for text contrast without mudding the color */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/20 to-transparent" />
                            </div>
                            
                            {/* Content on left */}
                            <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-center w-full h-full">
                               <h4 className="text-[15px] sm:text-lg font-bold text-white mb-3 pr-10">{day.title}</h4>
                               
                               <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                 {/* Orange bordered badge - fully rounded */}
                                 <span className="px-2 sm:px-2.5 py-0.5 rounded-full border border-orange-600/80 text-orange-500 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase bg-[#1a1a1a]/50 backdrop-blur-sm">
                                   DAY {day.day}
                                 </span>
                                 
                                 {/* Green icon badge - fully rounded */}
                                 <span className="px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-600/80 text-emerald-400 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 bg-[#1a1a1a]/50 backdrop-blur-sm">
                                   <MapPin size={10} className="text-emerald-500" /> {day.location}
                                 </span>
                                 
                                 {/* White text */}
                                 {day.details && (
                                   <span className="text-[10px] sm:text-[12px] font-bold text-white tracking-wide">
                                     {(Array.isArray(day.details) ? day.details : [day.details]).length} Activities
                                   </span>
                                 )}
                                 
                                 {/* White text 2 */}
                                 <span className="text-[10px] sm:text-[12px] font-bold text-white tracking-wide">
                                   Guided
                                 </span>
                               </div>
                               
                               <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-5 z-20 bg-black/40 p-1.5 rounded-full backdrop-blur-md">
                                 <ChevronUp size={16} className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
                               </div>
                            </div>
                          </button>
                          
                          <div className={`transition-all duration-500 ease-in-out bg-[#1a1a1a] ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 pb-5 pt-2 border-t border-white/10 relative z-10">
                              <p className="text-sm text-zinc-300 mb-4 leading-relaxed">{day.description}</p>
                              {day.details && (
                                <ul className="space-y-2">
                                  {(Array.isArray(day.details) ? day.details : [day.details]).map((det, i) => (
                                    <li key={i} className="text-[13px] text-zinc-400 flex items-start gap-3">
                                      <span className="text-emerald-500/50 mt-0.5 text-[10px]">♦</span> {det}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {/* --- CATEGORIZED INNER CARDS --- */}
                              <div className="mt-8 space-y-6">
                                
                                {/* CATEGORY 1: LOGISTICS & DINING */}
                                <div>
                                  <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <MapPin size={12} /> Logistics & Dining
                                  </h6>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Hotel Card */}
                                    <div className="relative h-[120px] rounded-xl overflow-hidden group border border-white/10 isolate">
                                      <img src={day.hotel?.photo || selectedProduct.images[0]?.src} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-xl" alt="Accommodation" />
                                      {[2, 4, 8, 12, 16].map((blur, index) => (
                                        <div key={index} className="absolute inset-0 pointer-events-none rounded-xl" style={{ backdropFilter: `blur(${blur}px)`, maskImage: 'linear-gradient(to top, black 0%, transparent 65%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 65%)' }} />
                                      ))}
                                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                        <span className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase mb-1 flex items-center gap-1"><Bed size={10}/> Accommodation</span>
                                        <h5 className="text-sm font-bold text-white leading-tight truncate">{day.hotel?.name || 'Premium Hotel / Ryokan'}</h5>
                                        <div className="flex items-center gap-0.5 mt-1.5">
                                          {[...Array(day.hotel?.rating || 5)].map((_, i) => <Star key={i} size={8} className="text-amber-400 fill-amber-400" />)}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Meals Card */}
                                    <div className="relative h-[120px] rounded-xl overflow-hidden group border border-white/10 isolate">
                                      <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-xl" alt="Dining" />
                                      {[2, 4, 8, 12, 16].map((blur, index) => (
                                        <div key={index} className="absolute inset-0 pointer-events-none rounded-xl" style={{ backdropFilter: `blur(${blur}px)`, maskImage: 'linear-gradient(to top, black 0%, transparent 65%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 65%)' }} />
                                      ))}
                                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                        <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase mb-1 flex items-center gap-1"><Utensils size={10}/> Dining</span>
                                        <h5 className="text-sm font-bold text-white leading-tight truncate">{day.meals?.join(', ') || 'Breakfast & Dinner Included'}</h5>
                                        <span className="text-[9px] text-zinc-400 mt-1.5 font-mono">Curated local cuisine</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* CATEGORY 2: CURATED EXPERIENCES */}
                                <div>
                                  <h6 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Compass size={12} /> Curated Experiences
                                  </h6>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Render actual activityCards or fallback to 2 mocked activities */}
                                    {(day.activityCards || [
                                      { name: day.title, photo: selectedProduct.images[1]?.src || selectedProduct.images[0]?.src, type: 'Highlight' },
                                      { name: 'Local Culture Immersion', photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=400&fit=crop', type: 'Experience' }
                                    ]).map((act, idx) => (
                                      <div key={idx} className="relative h-[120px] rounded-xl overflow-hidden group border border-white/10 isolate">
                                        <img src={act.photo} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-xl" alt="Activity" />
                                        {[2, 4, 8, 12, 16].map((blur, index) => (
                                          <div key={index} className="absolute inset-0 pointer-events-none rounded-xl" style={{ backdropFilter: `blur(${blur}px)`, maskImage: 'linear-gradient(to top, black 0%, transparent 65%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 65%)' }} />
                                        ))}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                          <span className="text-[9px] font-bold tracking-widest text-orange-400 uppercase mb-1 flex items-center gap-1"><Activity size={10}/> {act.type || 'Activity'}</span>
                                          <h5 className="text-sm font-bold text-white leading-tight truncate">{act.name}</h5>
                                          <span className="text-[9px] text-zinc-400 mt-1.5 font-mono">Included in itinerary</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              </div>
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
                  fixed inset-x-0 bottom-0 z-50 rounded-t-[32px] p-5 pb-20 lg:pb-6 transition-transform duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.7)] max-h-[85vh] overflow-y-auto
                  lg:sticky lg:top-6 lg:inset-auto lg:rounded-[24px] lg:p-6 lg:shadow-2xl lg:translate-y-0 lg:max-h-none lg:overflow-visible
                  bg-[#121315] border border-white/10 text-left
                  ${showMobilePriceBox ? 'translate-y-0' : 'translate-y-full'} 
                `}>
                  {/* Subtle Top Glow */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${currentTheme.accentBg} opacity-50 shadow-[0_0_20px_var(--color-accent)]`} />
                  
                  <button onClick={() => setShowMobilePriceBox(false)} className="absolute top-5 right-5 text-zinc-400 lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">✕</button>
                  
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-xl font-bold text-white">Book This Trip</h3>
                    <span className="bg-amber-500/20 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-500/30">
                      <Flame size={10} /> HOT
                    </span>
                  </div>
                  
                  <div className={`w-10 h-1 rounded-full mb-4 ${currentTheme.accentBg}`} />
                  
                  <div className="mb-5 bg-black/40 rounded-xl p-4 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <p className="text-[9px] text-zinc-400 uppercase font-mono tracking-widest font-bold mb-1">Starting From</p>
                    <div className="flex items-baseline gap-1 mb-2.5">
                      <span className="text-3xl font-black text-white group-hover:scale-105 origin-left transition-transform">${selectedProduct.price.startingFrom}</span>
                      <span className="text-[11px] text-zinc-500 font-mono">/ {selectedProduct.price.per}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <ShieldCheck size={10} /> Instant Confirmation
                      </span>
                      <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <Clock size={10} /> Free Cancellation
                      </span>
                    </div>
                  </div>

                  {selectedProduct.price.inclusionsSummary && (
                    <div className="mb-5">
                      <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest font-bold mb-2">Package Highlights</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProduct.price.inclusionsSummary.map((sum: any, i: number) => {
                          const getIcon = (text: string) => {
                            if (text.toLowerCase().includes('stay') || text.toLowerCase().includes('night')) return <Bed size={14} />;
                            if (text.toLowerCase().includes('meal') || text.toLowerCase().includes('dining')) return <Utensils size={14} />;
                            if (text.toLowerCase().includes('transfer') || text.toLowerCase().includes('flight') || text.toLowerCase().includes('transport')) return <Car size={14} />;
                            return <CheckCircle2 size={14} />;
                          };
                          
                          return (
                            <div key={i} className="group bg-white/5 hover:bg-white/10 rounded-lg p-2 flex items-center gap-2 border border-white/5 hover:border-white/20 transition-all cursor-default">
                              <div className={`p-1.5 rounded-md bg-black/50 ${currentTheme.accent} group-hover:scale-110 transition-transform shadow-inner border border-white/5`}>
                                {getIcon(sum.text)}
                              </div>
                              <div className="flex flex-col justify-center">
                                <span className="text-[11px] font-bold text-white leading-tight">{sum.text}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {selectedProduct.price.offers && selectedProduct.price.offers.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl mb-4 relative overflow-hidden group hover:bg-amber-500/15 transition-colors cursor-default">
                      <div className="absolute -top-2 -right-2 p-2 opacity-10 group-hover:opacity-20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                        <Sparkles size={48} className="text-amber-500" />
                      </div>
                      {selectedProduct.price.offers.map((offer: any, i: number) => (
                        <div key={i} className="relative z-10 flex items-start gap-2 mb-2 last:mb-0">
                          <div className="bg-amber-500/20 p-1 rounded border border-amber-500/30">
                            <Tag className="w-3 h-3 text-amber-400 shrink-0" />
                          </div>
                          <div>
                            <span className="inline-block text-[9px] font-bold text-amber-900 bg-amber-400 px-1.5 py-0.5 rounded mb-0.5 shadow-sm uppercase tracking-wider">{offer.code}</span>
                            <p className="text-[10px] text-zinc-300 leading-snug pr-4">{offer.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-[9px] text-zinc-500 italic mb-4 text-center">
                    {selectedProduct.price.disclaimer}
                  </p>

                  <button
                    onClick={() => {
                      if (!currentUser) setShowAuthModal(true);
                      else setBookingDest(selectedDest);
                    }}
                    className={`group relative w-full overflow-hidden py-3 rounded-xl font-bold text-sm text-black shadow-lg cursor-pointer hover:scale-[1.02] active:scale-95 transition-all ${currentTheme.accentBg}`}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 skew-x-12" />
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      Enquire Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* MOBILE BOTTOM BAR (TRIGGER) */}
            <div 
              style={{ bottom: '64px' }}
              className="lg:hidden fixed left-3 right-3 sm:left-6 sm:right-6 z-40 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[24px] p-3 pl-5 flex justify-between items-center shadow-2xl m-0"
            >
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
            <div 
              className={`fixed bottom-36 sm:bottom-40 lg:bottom-6 right-3 sm:right-6 lg:right-10 z-50 transition-all duration-300 m-0 ${showMobilePriceBox ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
            >
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

        {/* CATEGORIZED GALLERY LIGHTBOX */}
        <AnimatePresence>
          {showGallery && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pt-12 sm:pt-16 border-b border-white/10 bg-black/50">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-white font-serif">{selectedProduct?.name} Gallery</h3>
                </div>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 p-6 overflow-x-auto no-scrollbar">
                {['All', 'Overview', 'Hotels', 'Activities'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveGalleryCategory(cat as any)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeGalleryCategory === cat 
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-y-auto p-6 pt-0 no-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {visibleGalleryImages.map((img: any, i: number) => (
                    <div key={`${img.type}-${i}`} onClick={() => setFullScreenImageIndex(i)} className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-white/5 cursor-pointer">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" loading="lazy" />
                      
                      {img.type === 'prod' && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      
                      {(img.type === 'hotel' || img.type === 'activity') && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <h4 className="text-white font-bold text-base leading-tight">{img.title}</h4>
                          <span className={`text-[10px] font-mono mt-1 ${img.type === 'hotel' ? 'text-emerald-400' : 'text-orange-400'}`}>
                            {img.type === 'hotel' ? 'Accommodation' : 'Experience'}
                          </span>
                        </div>
                      )}
                      
                      <div className={`absolute top-3 left-3 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase shadow-lg border ${
                        img.type === 'prod' ? 'bg-black/50 text-white border-white/10' :
                        img.type === 'hotel' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                        'bg-orange-500/20 text-orange-400 border-orange-500/20'
                      }`}>
                        {img.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULL SCREEN IMAGE VIEWER */}
        <AnimatePresence>
          {fullScreenImageIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-3xl cursor-zoom-out"
              onClick={() => setFullScreenImageIndex(null)}
            >
              <button 
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                onClick={(e) => { e.stopPropagation(); setFullScreenImageIndex(null); }}
              >
                <X size={24} />
              </button>
              
              {/* Previous Button */}
              {fullScreenImageIndex > 0 && (
                <button 
                  className="absolute left-4 sm:left-10 p-3 bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-50 border border-white/10 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setFullScreenImageIndex(fullScreenImageIndex - 1); }}
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              
              {/* Next Button */}
              {fullScreenImageIndex < visibleGalleryImages.length - 1 && (
                <button 
                  className="absolute right-4 sm:right-10 p-3 bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-50 border border-white/10 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setFullScreenImageIndex(fullScreenImageIndex + 1); }}
                >
                  <ChevronRight size={32} />
                </button>
              )}

              <img 
                key={visibleGalleryImages[fullScreenImageIndex].src}
                src={visibleGalleryImages[fullScreenImageIndex].src} 
                alt="Full screen view" 
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default transition-all duration-300 animate-fade-in" 
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-mono text-xs z-50">
                {fullScreenImageIndex + 1} / {visibleGalleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };
