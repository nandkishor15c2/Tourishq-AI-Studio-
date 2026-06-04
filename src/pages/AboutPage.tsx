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

export const AboutPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  return (
    <>
{/* VIEW 6: ABOUT US PAGE */}
        {activeTab === 'about' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">The Tourishq Odyssey</span>
              <h2 className="text-4xl font-serif font-bold text-white">Cultivating the Future of Travel</h2>
              <p className="text-xs text-zinc-400 font-sans tracking-wide">Founded at the intersection of high physics simulation engineering and ground field operations.</p>
            </div>

            {/* Split Narrative grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
                <h3 className="text-lg font-bold text-white font-serif">1. Elite Scout Operations</h3>
                <p>
                  We are not an aggregator. We do not scraping itineraries or listings. Every destination index inside our database represents an actual ground sanctuary where our scouts set up base.
                </p>
                <p>
                  Our scouts coordinate directly with remote Ryokans and volcanic villas to secure dedicated, high-floor rooms, bespoke hot toddy ingredients and private helicopter clearances.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop"
                className="w-full h-56 object-cover rounded-3xl border border-white/10 shadow-lg"
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
                className="w-full h-56 object-cover rounded-3xl border border-white/10 shadow-lg md:order-2"
                alt=""
              />
              <div className="space-y-4 text-xs leading-relaxed text-zinc-300 md:order-1">
                <h3 className="text-lg font-bold text-white font-serif">2. Luxury Escrow Contracts</h3>
                <p>
                  We believe currency exchanges should benefit the traveler. Your complete travel package pricing rests in luxury ledger bonds and is released to hotel guides only upon successful checkout check-ins.
                </p>
                <p>
                  This safeguards our nomads against weather closures, unexpected room hitches, and provides authoritative leverage inside foreign borders.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 text-center space-y-3 max-w-2xl mx-auto">
              <h4 className="text-white font-bold text-sm">Have Specific Custom Requests?</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect directly with our 24/7 Priority Concierge. We handle unique food allergy mappings, heavy camera drybag cargo and honeymoon settings.
              </p>
              <button
                onClick={() => navigate('/support')}
                className={`py-2 px-5 text-xs font-bold rounded-xl text-black cursor-pointer inline-block ${currentTheme.accentBg}`}
              >
                Connect Support Desk
              </button>
            </div>
          </div>
        )}

        
    </>
  );
};
