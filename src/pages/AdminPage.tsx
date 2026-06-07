import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, MapPin, Calendar, Users, Sliders, DollarSign, Phone, HelpCircle, Clock, Sparkles, Award, ChevronRight, ShieldCheck, Star, User, LogOut, Map, ClipboardList, Flame, ArrowRight, Heart, Send, MessageCircle, LayoutDashboard, Play, Pause, Sun, CloudRain, Snowflake, ChevronUp, CheckCircle, XCircle, Tag, Thermometer, Droplets, Wind, Shield, CheckCircle2, ChevronDown, HeartPulse, ShieldAlert, PlayCircle, Navigation, Search, Activity, Info } from 'lucide-react';
import { REVENUE_METRICS } from '../data';
import { AuthContainer } from '../components/AuthContainer';
import { ProductCard } from '../components/ProductCard';
import { SplitCarousel } from '../components/SplitCarousel';
import { ArchHero } from '../components/ArchHero';
import { SupportTicketSystem } from '../components/SupportTicketSystem';
import { InternalAdminDashboard } from '../components/InternalAdminDashboard';

export const AdminPage = (props: any) => {
  const { season, setSeason, currentUser, setCurrentUser, destinations, setDestinations, bookings, setBookings, tickets, setTickets, navigate, location, pathParts, activeTab, showSeasonDropdown, setShowSeasonDropdown, showBlogLightbox, setShowBlogLightbox, getSeasonIcon, selectedDest, selectedProduct, setSelectedDest, setSelectedProduct, activeDetailSection, setActiveDetailSection, expandedDay, setExpandedDay, showProductLightbox, setShowProductLightbox, showMobilePriceBox, setShowMobilePriceBox, bookingDest, setBookingDest, showAuthModal, setShowAuthModal, calcGuests, setCalcGuests, calcNights, setCalcNights, calcExtraHeli, setCalcExtraHeli, checkedPackingItems, setCheckedPackingItems, searchQuery, setSearchQuery, priceRange, setPriceRange, filterSeason, setFilterSeason, timeRemaining, setTimeRemaining, autoplayActive, setAutoplayActive, activePromoIndex, setActivePromoIndex, currentTheme, handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply, handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge, handleUserLogin, handleLogout, handlePostReview, filteredDestinations } = props;
  return (
    <>
{/* VIEW 7: INTERNAL TEAM ADMIN REVENUE & OPERATIONS DASHBOARD */}
        {activeTab === 'admin' && (
          currentUser?.email?.toLowerCase().trim() === 'admin@tourishq.co' ? (
            <InternalAdminDashboard
              bookings={bookings}
              tickets={tickets}
              metrics={REVENUE_METRICS}
              destinations={destinations}
              onReplyTicket={handleAdminReplyTicket}
              onUpdateBookingStep={handleUpdateBookingStep}
              onTweakPremium={handleTweakInventorySurge}
              seasonTheme={season}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
              <ShieldAlert className="w-16 h-16 text-rose-500" />
              <h2 className="text-2xl font-bold text-white font-serif">Restricted Clearance</h2>
              <p className="text-zinc-400 text-sm max-w-md">
                You do not have the required permissions to view the internal operations dashboard. 
                Please log in using the administrator email <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">admin@tourishq.co</span>.
              </p>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4 text-xs font-mono text-zinc-300">
                <p><strong>Diagnostics:</strong></p>
                <p>Current Email: "{currentUser?.email || 'None'}"</p>
                <p>Current Role: "{currentUser?.role || 'None'}"</p>
              </div>
              
              <button 
                onClick={() => navigate('/')}
                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-semibold transition-colors"
              >
                Return to Home
              </button>
            </div>
          )
        )}

      
    </>
  );
};
