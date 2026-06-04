import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, MapPin, Calendar, Users, Sliders, DollarSign, Phone, HelpCircle, Clock, Sparkles, Award, ChevronRight, ShieldCheck, Star, User, LogOut, Map, ClipboardList, Flame, ArrowRight, Heart, Send, MessageCircle, LayoutDashboard, Play, Pause, Sun, CloudRain, Snowflake, ChevronUp, CheckCircle, XCircle, Tag, Thermometer, Droplets, Wind, Shield, CheckCircle2, ChevronDown, HeartPulse, ShieldAlert, PlayCircle, Navigation, Search, Activity, Info } from 'lucide-react';
import { SEASONAL_THEMES_DATA, PROMOTIONS, DESTINATIONS, LIVE_OPERATIONS_STEPS } from '../data';
import { AuthContainer } from '../components/AuthContainer';
import { ProductCard } from '../components/ProductCard';
import { SplitCarousel } from '../components/SplitCarousel';
import { ArchHero } from '../components/ArchHero';
import { SupportTicketSystem } from '../components/SupportTicketSystem';
import { InternalAdminDashboard } from '../components/InternalAdminDashboard';

export const DashboardPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  return (
    <>
{/* VIEW 5: ACCOUNT PROFILE DASHBOARD (My Escapes / Upcoming / Live / Past) */}
        {activeTab === 'dashboard' && (
          currentUser ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">My Escape Passport</span>
                <h2 className="text-3xl font-serif font-bold text-white mt-1">Hello, {currentUser.name}</h2>
                <p className="text-xs text-zinc-400 mt-1">Registered Account Email: {currentUser.email} · Phone: {currentUser.phone}</p>
              </div>

              <div className="bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs flex gap-4 max-w-sm">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase">Upcoming countdown:</span>
                  <span className="text-white font-semibold flex items-center gap-1 mt-0.5 font-mono">
                    <Clock size={12} className="text-amber-500" /> Kyoto Departure
                  </span>
                </div>
              </div>
            </div>

            {/* UPCOMING ESCAPES DETAILS WITH COUNTDOWN */}
            {bookings.some(b => b.status === 'upcoming') && (
              <div className="glassmorphism rounded-3xl p-5 md:p-6 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono bg-amber-500/10 px-2 py-0.5 rounded">Upcoming Trip</span>
                    
                    {(() => {
                      const dup = bookings.find(b => b.status === 'upcoming');
                      if (!dup) return null;
                      return (
                        <>
                          <h3 className="text-xl font-bold text-white">{dup.destination.name}</h3>
                          <p className="text-xs text-zinc-400">{dup.destination.country} · {dup.guestCount} Travelers</p>
                          <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1 mt-3">
                            <span className="text-[9px] text-zinc-500 font-mono block">Villas / Ryokan stay:</span>
                            <span className="text-xs text-zinc-300 font-semibold">{dup.hotel.name}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Dynamic Countdown Timer Module (YouTube Music aesthetics) */}
                  <div className="lg:col-span-5 bg-black/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-center text-center">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Flight boarding dispatch begins in:</span>
                    
                    <div className="grid grid-cols-4 gap-2 mt-3 select-none text-white font-mono">
                      <div className="bg-neutral-900 border border-white/5 p-2 rounded-xl">
                        <span className="text-lg font-extrabold block text-amber-400">{timeRemaining.days}</span>
                        <span className="text-[8px] text-zinc-500 uppercase font-sans">Days</span>
                      </div>
                      <div className="bg-neutral-900 border border-white/5 p-2 rounded-xl">
                        <span className="text-lg font-extrabold block text-white">{timeRemaining.hours}</span>
                        <span className="text-[8px] text-zinc-500 uppercase font-sans">Hrs</span>
                      </div>
                      <div className="bg-neutral-900 border border-white/5 p-2 rounded-xl">
                        <span className="text-lg font-extrabold block text-white">{timeRemaining.minutes}</span>
                        <span className="text-[8px] text-zinc-500 uppercase font-sans">Min</span>
                      </div>
                      <div className="bg-neutral-900 border border-white/5 p-2 rounded-xl">
                        <span className="text-lg font-extrabold block text-zinc-400">{timeRemaining.seconds}</span>
                        <span className="text-[8px] text-zinc-500 uppercase font-sans">Sec</span>
                      </div>
                    </div>
                  </div>

                  {/* BOARDING PASS EXPORT TRIGGER (Mock UI with luxury details) */}
                  <div className="lg:col-span-3 text-center lg:text-right space-y-3">
                    <div className="bg-zinc-950/60 p-4 border border-white/5 rounded-2xl inline-block text-left text-[11px] font-mono leading-relaxed space-y-1 w-full scale-95">
                      <span className="text-zinc-600 block bg-zinc-900 text-center rounded py-0.5 mb-1.5">PASSENGER RECEIPT</span>
                      <p className="flex justify-between"><span>PASS:</span> <span className="text-zinc-300 font-bold">KISHOR S.</span></p>
                      <p className="flex justify-between"><span>PKG:</span> <span className="text-zinc-300 font-bold">VIP SAKURA S-1</span></p>
                      <p className="flex justify-between"><span>STATUS:</span> <span className="text-emerald-400 font-bold">PAID ESCROW</span></p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* LIVE ESCAPES ACTIVE DISPATCH TRACKER */}
            {bookings.some(b => b.status === 'live') && (
              <div className="glassmorphism rounded-3xl p-5 md:p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 font-sans">In-Flight Live Radar Tracking</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">GPS radio synced</span>
                </div>

                {(() => {
                  const liveTrip = bookings.find(b => b.status === 'live');
                  if (!liveTrip) return null;
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono">Active Destination</span>
                        <h4 className="text-sm font-bold text-white">{liveTrip.destination.name}</h4>
                        <p className="text-[11px] text-zinc-400">{liveTrip.destination.tagline}</p>
                        
                        <div className="bg-black/30 border border-white/5 rounded-xl p-3 mt-3 text-xs leading-relaxed text-zinc-300 flex items-center gap-2">
                          <Flame size={14} className="text-amber-500 flex-shrink-0" />
                          <span>Operator Dispatch reports: All local streams cleared. enjoy private transport checkpoints.</span>
                        </div>
                      </div>

                      {/* Visual trace of progress checkpoints (Changed Live step admin controls mutator!) */}
                      <div className="lg:col-span-2 space-y-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono block">Ground Checkpoint Steps</span>
                        
                        <div className="grid grid-cols-5 gap-1 pt-2 relative z-10">
                          {['Airport', 'Welcome Juice', 'Activity Walk', 'Hot Spa', 'Check Out'].map((checkpoint, idx) => {
                            const isPassed = liveTrip.currentStepIndex >= idx;
                            const isCurrent = liveTrip.currentStepIndex === idx;
                            return (
                              <div key={idx} className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                                  isCurrent
                                    ? 'bg-amber-500 text-black border-transparent shadow shadow-amber-500/30'
                                    : isPassed
                                    ? 'bg-emerald-600 text-white border-transparent'
                                    : 'border-white/10 text-zinc-600 bg-zinc-950/10'
                                }`}>
                                  {idx + 1}
                                </div>
                                <span className={`text-[9px] mt-2 font-medium tracking-tight mt-1 hidden md:block whitespace-nowrap ${
                                  isCurrent ? 'text-amber-400 font-semibold' : isPassed ? 'text-zinc-300' : 'text-zinc-600'
                                }`}>
                                  {checkpoint}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Interactive live dialogue context indicator */}
                        <div className="bg-neutral-900/60 p-3.5 border border-white/5 rounded-xl text-center mt-3 scale-98">
                          <span className="text-[9px] uppercase text-zinc-500 block">CURRENT DISPATCH STATUS:</span>
                          <p className="text-xs text-amber-300 font-semibold mt-1">“{LIVE_OPERATIONS_STEPS[liveTrip.currentStepIndex]}”</p>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>
            )}

            {/* HISTORIC COMPLETED ESCAPES & SUBMIT REVIEW */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block">Past Wandering Journeys</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.filter(b => b.status === 'past').map((b) => (
                  <div key={b.id} className="bg-zinc-900/10 border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-zinc-500 font-mono">{b.startDate} completed</span>
                          <h4 className="text-sm font-bold text-white mt-1">{b.destination.name}</h4>
                        </div>
                        <span className="text-[10px] bg-white/5 border border-white/5 px-2.5 py-0.5 rounded text-zinc-400">Archived Receipt</span>
                      </div>

                      {/* Display Submit Review form if no review exists */}
                      {!b.reviewText ? (
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-3 bg-black/20 p-3 rounded-xl text-xs">
                          <p className="font-semibold text-zinc-300">Submit Luxury Feedback & Rating:</p>
                          
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handlePostReview(b.id, star, '')}
                                className="text-zinc-600 hover:text-amber-400"
                              >
                                <Star size={14} className="fill-current" />
                              </button>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Write your review experiences..."
                              id={`reviewInput-${b.id}`}
                              className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-2 py-1.5 focus:outline-none text-[11px]"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const val = (e.target as HTMLInputElement).value;
                                  if (val.trim()) {
                                    handlePostReview(b.id, b.rating || 5, val);
                                  }
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.getElementById(`reviewInput-${b.id}`) as HTMLInputElement;
                                if (input && input.value.trim()) {
                                  handlePostReview(b.id, b.rating || 5, input.value);
                                }
                              }}
                              className="px-3 bg-amber-500 text-black font-bold rounded-lg py-1 hover:bg-amber-400"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                          <div className="flex text-amber-400 text-xs">
                            {'★'.repeat(b.rating || 5)}
                          </div>
                          <p className="text-xs text-zinc-300 italic leading-relaxed">“{b.reviewText}”</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-zinc-500 mb-2">
                <User size={32} />
              </div>
              <h2 className="text-2xl font-bold font-serif text-white">Sign In Required</h2>
              <p className="text-zinc-400 text-sm max-w-sm mb-6">Please connect your account to view your upcoming bookings, live itineraries, and past escapes.</p>
              <button 
                onClick={() => setShowAuthModal(true)} 
                className="mt-4 px-6 py-2.5 bg-amber-500 text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-xl cursor-pointer"
              >
                Connect Account
              </button>
            </div>
          )
        )}

        
    </>
  );
};
