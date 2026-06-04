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

export const DestinationPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  return (
    <>
{/* VIEW 3: NEW DESTINATION PAGE */}
        {selectedDest && !selectedProduct && (
          <div className="space-y-12 animate-fade-in text-left pb-24">
            {/* Upper breadcrumb back button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-950/40 p-3 rounded-2xl border border-white/5 relative z-10">
              <button
                onClick={() => {
                  if (selectedProduct) {
                    setSelectedProduct(null);
                  } else {
                    setSelectedDest(null);
                  }
                }}
                className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
              >
                ← Back to Search
              </button>
              <div className="text-[11px] font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                Destination: <span className="text-white font-bold">{selectedDest.name} ({selectedDest.country})</span>
              </div>
            </div>

            {/* 1. HERO SECTION */}
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl text-left -mt-6 group">
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-10 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase font-bold font-mono text-black tracking-widest bg-amber-400 px-3 py-1.5 rounded-lg">
                    {selectedDest.country}
                  </span>
                  <span className="text-[10px] text-zinc-300 font-mono bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                    ★ {selectedDest.rating} Exceptional
                  </span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-white tracking-tight leading-none">
                  {selectedDest.name}
                </h2>
                <p className="text-sm sm:text-base md:text-xl font-medium text-zinc-300 font-serif italic max-w-2xl leading-relaxed">
                  "{selectedDest.tagline}"
                </p>
              </div>
            </div>

            {/* 2. REGION DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-start hover:bg-white/5 transition-colors">
                <CloudRain className={`w-6 h-6 mb-3 ${currentTheme.accent}`} />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-bold mb-1">Climate</span>
                <span className="text-base text-white font-bold">{selectedDest.regionDetails?.weather || 'Check live reports'}</span>
              </div>
              <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-start hover:bg-white/5 transition-colors">
                <Users className={`w-6 h-6 mb-3 ${currentTheme.accent}`} />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-bold mb-1">Local Population</span>
                <span className="text-base text-white font-bold">{selectedDest.regionDetails?.population || 'Varies by region'}</span>
              </div>
              <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-start hover:bg-white/5 transition-colors">
                <DollarSign className={`w-6 h-6 mb-3 ${currentTheme.accent}`} />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-bold mb-1">Language & Currency</span>
                <span className="text-base text-white font-bold">{selectedDest.regionDetails?.language || 'English'} · {selectedDest.regionDetails?.currency || 'USD'}</span>
              </div>
            </div>

            {/* 3. BLOG LIGHTBOX TEASER */}
            {selectedDest.blog && (
              <div 
                onClick={() => setShowBlogLightbox(true)}
                className="group relative h-[300px] rounded-[32px] overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
              >
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <img src={selectedDest.blog.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 z-10 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                    Journal Entry · {selectedDest.blog.readTime}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {selectedDest.blog.title}
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-3xl line-clamp-2">
                    {selectedDest.blog.excerpt}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-400 font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                    Read Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )}

            {/* 4. PRODUCTS LIST (STACKED) */}
            <div className="space-y-16 pt-8">
              
              {/* Stays */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white">Curated Stays</h3>
                  <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-zinc-400 font-mono">{selectedDest.hotels.length} Properties</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedDest.hotels.map((h) => (
                    <div key={h.id} className="bg-zinc-900/30 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 items-start sm:items-center text-left hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden shrink-0 relative">
                        <img src={h.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>
                      <div className="flex-grow space-y-2 text-xs w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-sm tracking-tight">{h.name}</h4>
                            <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">{'★'.repeat(h.stars)}</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-400 shrink-0 bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">${h.pricePerNight} / Night</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{h.location}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {h.benefits.map((b, bIdx) => (
                            <span key={bIdx} className="text-[9px] bg-white/5 border border-white/5 text-zinc-300 px-2 py-0.5 rounded truncate max-w-full">
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Packages / Products */}
              {selectedDest.products && selectedDest.products.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white">Curated Packages</h3>
                    <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-zinc-400 font-mono">{selectedDest.products.length} Routes</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedDest.products.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => setSelectedProduct(prod)}
                        className="group relative rounded-[24px] overflow-hidden border border-white/10 cursor-pointer text-left shadow-xl h-[300px]"
                      >
                        <div className="absolute inset-0 z-0 pointer-events-none">
                          <img src={prod.images[0]?.src} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
                        </div>
                        
                        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold font-mono tracking-widest bg-amber-400 text-black px-2 py-1 rounded">
                              {prod.keyInformation.duration}
                            </span>
                            <span className="text-xs font-mono font-bold text-white">${prod.price.startingFrom}</span>
                          </div>
                          
                          <h4 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                            {prod.description.short}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white">Curator Experiences</h3>
                  <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-zinc-400 font-mono">{selectedDest.activities.length} Add-ons</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedDest.activities.map((act) => (
                    <div key={act.id} className="relative rounded-2xl border border-white/5 overflow-hidden p-5 min-h-[180px] flex flex-col justify-between bg-[#050505]/65 group cursor-pointer hover:border-white/20 transition-colors">
                      <div className="absolute inset-0 z-0">
                        <img src={act.image} className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                      </div>

                      <div className="relative z-10 space-y-1">
                        <span className="text-[9px] uppercase tracking-wider bg-white/10 text-zinc-300 px-2 py-1 rounded font-bold">
                          {act.category}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-3 leading-tight">{act.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">{act.duration} · {act.intensity}</p>
                      </div>

                      <div className="relative z-10 flex justify-between items-baseline pt-4 mt-4 border-t border-white/10 text-xs font-mono">
                        <span className="text-zinc-500">Escort Rate</span>
                        <span className="text-white font-bold text-sm">${act.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Bottom Booking Bar */}
              <div className="sticky bottom-6 z-40 bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-4 items-center justify-between mt-12 mx-auto max-w-3xl">
                <div className="text-left">
                  <p className="font-bold text-white">Ready to book {selectedDest.name}?</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Package starts at <span className="text-amber-400 font-mono font-bold">${selectedDest.priceStart}</span> per guest.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!currentUser) setShowAuthModal(true);
                    else setBookingDest(selectedDest);
                  }}
                  className={`py-3 px-6 rounded-xl font-bold text-xs text-black shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-2 ${currentTheme.accentBg}`}
                >
                  <Calendar size={14} /> Configure & Book
                </button>
              </div>

            </div>
          </div>
        )}

        
    </>
  );
};
