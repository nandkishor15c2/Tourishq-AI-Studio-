import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SeasonType } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, MapPin, Calendar, Users, Sliders, DollarSign, Phone, HelpCircle, Clock, Sparkles, Award, ChevronRight, ShieldCheck, Star, User, LogOut, Map, ClipboardList, Flame, ArrowRight, Heart, Send, MessageCircle, LayoutDashboard, Play, Pause, Sun, CloudRain, Snowflake, ChevronUp, CheckCircle, XCircle, Tag, Thermometer, Droplets, Wind, Shield, CheckCircle2, ChevronDown, HeartPulse, ShieldAlert, PlayCircle, Navigation, Search, Activity, Info } from 'lucide-react';

import { AuthContainer } from '../components/AuthContainer';
import { ProductCard } from '../components/ProductCard';
import { DestinationCard } from '../components/DestinationCard';
import { SplitCarousel } from '../components/SplitCarousel';
import { ArchHero } from '../components/ArchHero';
import { SupportTicketSystem } from '../components/SupportTicketSystem';
import { InternalAdminDashboard } from '../components/InternalAdminDashboard';

export const HomePage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations, promotions, seasonalThemes } = props;


  return (
    <>
{/* VIEW 1: HOME LANDING PAGE */}
        {activeTab === 'home' && !selectedDest && (() => {
          const activePromo = promotions[activePromoIndex] || promotions[0];
          const promoDest = destinations.find((d: any) => d.id === activePromo?.destinationId);
          const seasonalMatches = destinations.filter((d: any) => d.seasonRecommendation === season);
          const sortedDests = [...destinations].sort((a, b) => b.rating - a.rating);

          return (
            <div className="space-y-16">
              
              {/* --- ADVANCED PROMOTIONAL HERO WITH THEMES (STACK MODE) --- */}
              <div className="relative w-full h-[645px] sm:h-[605px] md:h-[585px] lg:h-[565px] pb-12">
                {promotions.map((promoItem: any, idx: number) => {
                  const promoTheme = seasonalThemes.find((t: any) => t.id === promoItem.season) || seasonalThemes[0];
                  const promoDest = destinations.find((d: any) => d.id === promoItem.destinationId);
                  const currentIndex = activePromoIndex;
                  const relativeIndex = (idx - currentIndex + promotions.length) % promotions.length;
                  const isTop = relativeIndex === 0;

                  const getStackStyles = (relIndex: number) => {
                    switch (relIndex) {
                      case 0:
                        return {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          x: 0,
                          rotate: 0,
                          zIndex: 10,
                        };
                      case 1:
                        return {
                          opacity: 0.85,
                          scale: 0.96,
                          y: 16,
                          x: 0,
                          rotate: -1,
                          zIndex: 9,
                        };
                      case 2:
                        return {
                          opacity: 0.60,
                          scale: 0.92,
                          y: 32,
                          x: 0,
                          rotate: 1,
                          zIndex: 8,
                        };
                      default:
                        return {
                          opacity: 0,
                          scale: 0.88,
                          y: 48,
                          x: 350, // beautiful slow swipe out
                          rotate: 15,
                          zIndex: 5,
                        };
                    }
                  };

                  return (
                    <motion.div
                      key={promoItem.season}
                      style={{ pointerEvents: isTop ? 'auto' : 'none', willChange: 'transform, opacity' }}
                      animate={getStackStyles(relativeIndex)}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 top-0 h-[600px] sm:h-[560px] md:h-[540px] lg:h-[520px] rounded-[32px] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl flex items-center"
                    >
                      {/* Immersive background image with smooth lightened overlay */}
                      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden rounded-[32px] bg-black">
                        {/* Base Sharp Image */}
                        <img
                          src={promoItem.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-70 md:opacity-80 md:saturate-125 scale-100"
                        />
                        {/* High-Performance Blurred Masked Image Overlay */}
                        <img
                          src={promoItem.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-70 md:opacity-80 md:saturate-125 scale-100 blur-xl md:blur-2xl"
                          style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)' }} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                      </div>

                      <div className="w-full p-5 sm:p-6 md:p-12 relative z-10 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center text-left">
                          {/* Left Side: Editorial Typography & Copy */}
                          <div className="col-span-1 md:col-span-7 space-y-4 md:space-y-6">
                            <div className="space-y-2 md:space-y-3">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest font-black uppercase rounded-lg bg-white/5 border border-white/10 ${promoTheme.colorClass}`}>
                                <Sparkles size={11} /> {promoItem.badge}
                              </span>
                              <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-serif font-black text-white leading-tight">
                                {promoItem.title}
                              </h1>
                              <p className="text-sm sm:text-base md:text-[10px] lg:text-[11px] xl:text-xs font-semibold text-zinc-300 font-edu">
                                {promoItem.tagline.toLowerCase().replace(/\b([a-z])/g, (match) => match.toUpperCase())}
                              </p>
                            </div>

                            <p className="text-[11px] sm:text-xs md:text-[10px] lg:text-[11px] xl:text-xs text-zinc-300 leading-relaxed font-sans max-w-xl line-clamp-3 sm:line-clamp-none">
                              {promoItem.description}
                            </p>

                            {/* Promo Actions */}
                            <div className="flex flex-wrap items-center gap-3 pt-1 md:pt-2">
                              <button
                                onClick={() => promoDest && setSelectedDest(promoDest)}
                                className="py-2.5 px-5 sm:py-3 sm:px-6 text-[10px] sm:text-xs font-bold rounded-xl text-black shadow cursor-pointer transition-transform active:scale-95 transition-all"
                                style={{ backgroundColor: promoItem.season === 'spring' ? '#F472B6' : promoItem.season === 'summer' ? '#009e83' : promoItem.season === 'monsoon' ? '#2DD4BF' : '#ffbc00' }}
                              >
                                Claim Complimentary Upgrades
                              </button>
                              <button
                                onClick={() => navigate('/destinations')}
                                className="py-2.5 px-5 sm:py-3 sm:px-6 text-[10px] sm:text-xs text-white hover:text-zinc-300 font-bold tracking-wide rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                              >
                                Browse Other Passports
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* --- NEW GLOBAL DESTINATIONS CAROUSEL --- */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}>
                <SplitCarousel
                  id="global-destinations-carousel"
                  category="World"
                  title="Global Destinations"
                  subtitle="Explore our curated catalog"
                  description="From ancient shrines to whitewashed volcanic cliffs, discover where your next escape awaits."
                  themeColor={currentTheme.accent}
                  items={destinations}
                  renderItem={(dest) => (
                    <ProductCard
                      dest={dest}
                      onClick={() => setSelectedDest(dest)}
                    />
                  )}
                />
              </motion.div>

              {/* --- CAROUSEL 1: THEME CAROUSEL --- */}
              <SplitCarousel
                id="theme-carousel"
                category="Atmosphere"
                title="Seasonal Vibes"
                subtitle="Select system theme"
                description="Tap to instantly transform the app visual vibe."
                themeColor={currentTheme.accent}
                items={seasonalThemes}
                renderItem={(themeItem: any) => {
                  const isActive = season === themeItem.id;
                  return (
                    <div
                      onClick={() => setSeason(themeItem.id as SeasonType)}
                      className={`relative h-[350px] rounded-[24px] overflow-hidden group cursor-pointer border transition-all duration-300 text-left ${
                        isActive
                          ? 'border-white/40 ring-1 ring-white/10 shadow-[0_0_25px_rgba(255,255,255,0.1)] shadow-amber-500/10'
                          : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Background Image */}
                      <img
                        src={themeItem.image}
                        alt={themeItem.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                        <div>
                          <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase rounded bg-black/50 border border-white/10 ${themeItem.colorClass}`}>
                            {themeItem.label}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-white leading-tight font-serif drop-shadow-md">
                            {themeItem.name}
                          </h4>
                          <p className="text-[11px] text-zinc-300 leading-relaxed font-sans line-clamp-2">
                            {themeItem.desc}
                          </p>
                          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                            <span className="text-[10px] font-mono text-zinc-400">
                              {isActive ? '✓ Vibe Activated' : 'Click to transform'}
                            </span>
                            <span className={`text-[10px] font-bold uppercase ${themeItem.colorClass}`}>
                              Activate →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              {/* --- CAROUSEL 2: TOP 10 DESTINATION --- */}
              <SplitCarousel
                id="top-destination-carousel"
                category="Stays"
                title="Top Escapes"
                subtitle="Finest luxury homes"
                description="Our most exclusive, scout-vetted global properties."
                themeColor="text-amber-400"
                items={sortedDests}
                renderItem={(dest, index) => (
                  <DestinationCard dest={dest} onClick={() => { setSelectedDest(dest); navigate('/destinations'); }} rank={index + 1} />
                )}
              />

              {/* --- CAROUSEL 3: HIGH-END PREMIER OPTIONS --- */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}>
              <SplitCarousel
                id="premier-destinations-carousel"
                category="Elite Trails"
                title="Top Bespoke Itineraries"
                subtitle="Hand-walked expeditions with direct escorts"
                description="Explore top rated daily trajectories. Select any custom plan to view pre-scheduled high-grade hotels, transport parameters, and concierge details instantly."
                themeColor="text-pink-400"
                items={destinations.flatMap(d => (d.products || []).map(p => ({ dest: d, product: p })))}
                renderItem={({ dest, product }) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedProduct(product, dest);
                      }}
                      className="relative h-[350px] rounded-[24px] overflow-hidden group cursor-pointer border border-white/10 shadow-xl text-left"
                    >
                      <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105 origin-center">
                        <img
                          src={product.images[0]?.src}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Info overlay */}
                      <div className="absolute inset-0 p-5 z-10 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                          <span className="inline-block px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white bg-black/55 backdrop-blur-md rounded-full border border-white/10 shadow-md">
                            {product.keyInformation.tags[0] || 'Featured'}
                          </span>
                          <span className="text-[10px] font-bold text-amber-300 font-mono bg-zinc-950/80 px-2 py-0.5 rounded border border-white/5">
                            {product.keyInformation.duration}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase flex items-center gap-1">
                            <MapPin size={10} /> {dest.name}
                          </span>
                          <h4 className="text-base font-bold text-white mt-1 leading-snug font-serif">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                            {product.description.short}
                          </p>
                          <div className="pt-3 border-t border-white/10 mt-3 flex justify-between items-center">
                            <span className="text-[10px] text-zinc-400 font-bold">${product.price.startingFrom} / {product.price.per}</span>
                            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                              View Details <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              </motion.div>

              {/* --- CAROUSEL 4: RELEVANT SEASONAL ESCAPES --- */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}>
              <SplitCarousel
                id="seasonal-escapes-carousel"
                category="Seasonal Fits"
                title={`${currentTheme.label} Escapes`}
                subtitle="Perfect for current weather."
                description="Handpicked seasonal selections."
                themeColor={currentTheme.accent}
                items={seasonalMatches}
                renderItem={(dest) => (
                  <ProductCard
                    dest={dest}
                    onClick={() => setSelectedDest(dest)}
                  />
                )}
              />
              </motion.div>

              {/* --- NEW ARCH CAROUSEL --- */}
              <ArchHero destinations={destinations} />



              {/* Simple Visual timeline explaining custom Escrow protection */}
              <div className="text-center space-y-4 py-4">
                <span className="text-xs uppercase font-mono tracking-widest text-zinc-500">The Tourishq Difference</span>
                <h3 className="text-xl font-bold text-white font-serif">4 Golden pillars of Elite Escapes</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-left">
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl space-y-2">
                    <Award size={20} className={currentTheme.accent} />
                    <h4 className="text-xs font-semibold text-white">Scout Verification</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mt-1">Every property and route physically walked and re-inspected monthly.</p>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl space-y-2">
                    <ShieldCheck size={20} className={currentTheme.accent} />
                    <h4 className="text-xs font-semibold text-white">Escrow Protection</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mt-1">Your deposit remains withheld until the local field check-out is complete.</p>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl space-y-2">
                    <HelpCircle size={20} className={currentTheme.accent} />
                    <h4 className="text-xs font-semibold text-white">24/7 Concierge Radar</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mt-1 font-sans">Continuous GPS vehicle dispatch coordination and emergency triage covers.</p>
                  </div>
                  <div className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl space-y-2">
                    <Sliders size={20} className={currentTheme.accent} />
                    <h4 className="text-xs font-semibold text-white">Live Custom tracking</h4>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mt-1 font-mono">Dynamic countdown dashboards for boarding pass verification.</p>
                  </div>
                </div>
              </div>

            </div>
          );
        })()}

        
    </>
  );
};
