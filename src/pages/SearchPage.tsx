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

export const SearchPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  return (
    <>
{/* VIEW 2: DETAILED DESTINATION CATALOG (Search & Filtering) */}
        {activeTab === 'search' && !selectedDest && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Tourishq Treasury</span>
              <h2 className="text-3xl font-serif font-bold text-white mt-1">Curated Global Havens</h2>
              <p className="text-xs text-zinc-400 mt-1">Calibrate specific variables below to pinpoint matching properties.</p>
            </div>

            {/* Heavy Variable Controls panel */}
            <div className="glassmorphism rounded-2xl p-4 md:p-6 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 block">Search Destination or Country</label>
                <input
                  type="text"
                  placeholder="e.g., Japan, Greece, Switzerland..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-zinc-400">Budget Limit Per Guest</label>
                  <span className="font-mono text-[11px] text-white font-bold">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="3500"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 block">Seasonal Recommendation filter</label>
                <div className="flex gap-2">
                  {['all', 'spring', 'summer', 'monsoon', 'winter'].map((seasonId) => (
                    <button
                      key={seasonId}
                      onClick={() => setFilterSeason(seasonId)}
                      className={`flex-1 py-2 text-[10px] uppercase font-bold tracking-tight rounded-lg border cursor-pointer transition-all ${
                        filterSeason === seasonId
                          ? `${currentTheme.borderActive} bg-white/5 text-white`
                          : 'border-white/5 text-zinc-400 bg-transparent'
                      }`}
                    >
                      {seasonId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <ProductCard
                  key={dest.id}
                  dest={dest}
                  onClick={() => setSelectedDest(dest)}
                />
              ))}

              {filteredDestinations.length === 0 && (
                <div className="col-span-3 text-center py-20 bg-zinc-900/10 rounded-2xl border border-white/5">
                  <Compass className="mx-auto text-zinc-700 mb-2" size={32} />
                  <p className="text-sm text-zinc-400 font-semibold">No high-end properties matching criteria.</p>
                  <p className="text-xs text-zinc-500 mt-1">Reset filters or lower price caps to retry.</p>
                </div>
              )}
            </div>
          </div>
        )}

        
    </>
  );
};
