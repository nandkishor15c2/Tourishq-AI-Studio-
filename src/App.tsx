/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Sliders,
  DollarSign,
  Phone,
  HelpCircle,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Star,
  User,
  LogOut,
  Map,
  ClipboardList,
  Flame,
  ArrowRight,
  Heart,
  Send,
  MessageCircle,
  LayoutDashboard,
  Play,
  Pause,
  Sun,
  CloudRain,
  Snowflake,
  ChevronUp,
  CheckCircle,
  XCircle,
  Tag
} from 'lucide-react';

import { SeasonType, Destination, Booking, SupportTicket, User as UserType, Product } from './types';
import {
  PROMOTIONS,
  SEASONAL_THEMES_DATA,
  DESTINATIONS,
  DEFAULT_BOOKINGS,
  DEFAULT_TICKETS,
  REVENUE_METRICS,
  MOCK_REVIEWS,
  LIVE_OPERATIONS_STEPS
} from './data';

import { SeasonalOverlay } from './components/SeasonalOverlay';
import { BookingWizard } from './components/BookingWizard';
import { SupportTicketSystem } from './components/SupportTicketSystem';
import { InternalAdminDashboard } from './components/InternalAdminDashboard';
import { BlurGlassHeader } from './components/BlurGlassHeader';
import { Footer } from './components/Footer';
import { AuthContainer } from './components/AuthContainer';
import { ProductCard } from './components/ProductCard';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { DestinationPage } from './pages/DestinationPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SupportPage } from './pages/SupportPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { SplitCarousel } from './components/SplitCarousel';
import { ArchHero } from './components/ArchHero';

// Local storage keys for state persistence
const STORAGE_USER_KEY = 'tourishq_user_state';
const STORAGE_BOOKINGS_KEY = 'tourishq_bookings_state';
const STORAGE_TICKETS_KEY = 'tourishq_tickets_state';
const STORAGE_THEME_KEY = 'tourishq_season_theme';
const STORAGE_DESTS_KEY = 'tourishq_destinations_state';

// Luxury promotional themed slices



// Tactical theme items clickable options

const getDestinationWeather = (seasonRecommendation: string): string => {
  switch (seasonRecommendation) {
    case 'spring':
      return '💮 18°C · Gentle Sakura Breeze & Spring Blooms';
    case 'summer':
      return '☀️ 28°C · High Pass Clear Sunshine & Solar Radiance';
    case 'monsoon':
      return '🌧️ 24°C · Misty Rainfall Showers & Healing Winds';
    case 'winter':
      return '❄️ -2°C · Crisp Mountain Powder & Alpine Glimmer';
    default:
      return '🌟 22°C · Calm Atmospheric Temperature Profiles';
  }
};

const getPackingItemsForDestination = (destId: string): string[] => {
  switch (destId) {
    case 'kyoto':
      return [
        'Premium silk kimono sash or light layers',
        'Cedar wood coin pouch for temple entry offerings',
        'Traditional tabi socks for ryokan walks',
        'Light travel umbrella (blossom weather showers)'
      ];
    case 'ladakh':
      return [
        'Altitude climate adjustment support / oxygen capsules',
        'Wide-brim ultimate mountain sun shade hat',
        'Polarized anti-glare high altitude glasses',
        'Fleece windcheater and thermal inner layers'
      ];
    case 'kerala':
      return [
        'Pure sandalwood balm or bug guard oil',
        'Organic cotton wrap clothes or light linen shirts',
        'Waterproof dry sleeve (backwater rain gusts)',
        'Eco-friendly river herbal bath soaps'
      ];
    case 'swiss':
      return [
        'Fleece-lined winter neck collar scarf',
        'Sturdy crampon spikes for slippery pathways',
        'Lip protector balm and high-intensity SPF cream',
        'Anti-fog professional alpine snow goggles'
      ];
    default:
      return [
        'Personal premium travel journal',
        'Fast-charging compact power storage bank',
        'Comfortable walking loafers',
        'Noise-canceling ear pods for transit flights'
      ];
  }
};

export default function App() {
  // --- 1. Persistent State Initialization ---
  const [season, setSeason] = useState<SeasonType>(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    return (saved as SeasonType) || 'spring';
  });

  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem(STORAGE_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem(STORAGE_DESTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Destination[];
        // If it lacks any of the hardcoded destinations, discard cache and use DESTINATIONS from data.ts
        if (DESTINATIONS.every(dest => parsed.some(p => p.id === dest.id))) {
          return parsed;
        }
      } catch (e) {
        // Fall through
      }
    }
    return DESTINATIONS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    // Use standard user id if logged in, else mock default ID 'usr_tester'
    const uid = currentUser?.id || 'usr_tester';
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS(uid);
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(STORAGE_TICKETS_KEY);
    const uid = currentUser?.id || 'usr_tester';
    return saved ? JSON.parse(saved) : DEFAULT_TICKETS(uid);
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const activeTab = pathParts.length === 0 ? 'home' : pathParts[0];

  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const [showBlogLightbox, setShowBlogLightbox] = useState(false);

  const getSeasonIcon = (s: string) => {
    switch (s) {
      case 'spring': return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />;
      case 'summer': return <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-spin-slow" />;
      case 'monsoon': return <CloudRain className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />;
      case 'winter': return <Snowflake className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />;
      default: return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    }
  };

  // Navigation and view focus state (Derived from URL)
  let selectedDest: Destination | null = null;
  let selectedProduct: Product | null = null;

  if (activeTab === 'search' && pathParts[1]) {
    selectedDest = destinations.find(d => d.id === pathParts[1]) || null;
    if (selectedDest && pathParts[2] === 'products' && pathParts[3]) {
      selectedProduct = selectedDest.products?.find(p => p.id === pathParts[3]) || null;
    }
  }

  const setSelectedDest = (dest: Destination | null) => {
    if (dest) {
      navigate(`/search/${dest.id}`);
    } else {
      navigate('/search');
    }
  };

  const setSelectedProduct = (prod: Product | null, forceDest?: Destination) => {
    const dest = forceDest || selectedDest;
    if (prod && dest) {
      navigate(`/search/${dest.id}/products/${prod.id}`);
    } else if (dest) {
      navigate(`/search/${dest.id}`);
    } else {
      navigate('/search');
    }
  };
  const [activeDetailSection, setActiveDetailSection] = useState<string>('overview');
  
  // View 4 Product Detail UI States
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [showProductLightbox, setShowProductLightbox] = useState(false);
  const [showMobilePriceBox, setShowMobilePriceBox] = useState(false);
  
  // Modals & Overlays state
  const [bookingDest, setBookingDest] = useState<Destination | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Interactive Destination Landing Page States
  const [calcGuests, setCalcGuests] = useState<number>(2);
  const [calcNights, setCalcNights] = useState<number>(5);
  const [calcExtraHeli, setCalcExtraHeli] = useState<boolean>(false);
  const [checkedPackingItems, setCheckedPackingItems] = useState<Record<string, boolean>>({});

  // Search filter terms for destinations view
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [filterSeason, setFilterSeason] = useState<string>('all');

  // Interactive Live Countdown State (Calculated for Kyoto Upcoming Booking)
  const [timeRemaining, setTimeRemaining] = useState({ days: 16, hours: 2, minutes: 45, seconds: 59 });

  // Sync to outer states
  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_KEY, season);
  }, [season]);

  // Autoplay Seasonal Promotion rotation (every 4 seconds) - independent of theme
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [activePromoIndex, setActivePromoIndex] = useState(() => {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    const initialSeason = (saved as SeasonType) || 'spring';
    const idx = PROMOTIONS.findIndex(p => p.season === initialSeason);
    return idx !== -1 ? idx : 0;
  });

  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setTimeout(() => {
      setActivePromoIndex((prev) => (prev + 1) % PROMOTIONS.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [activePromoIndex, autoplayActive]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TICKETS_KEY, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_DESTS_KEY, JSON.stringify(destinations));
  }, [destinations]);

  // Decoupled dynamic countdown tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dispatch live automated Support Concierge auto-replies after 5 seconds to user's newly posted tickets
  useEffect(() => {
    const unresolvedTickets = tickets.filter(t => t.status === 'pending');
    if (unresolvedTickets.length > 0) {
      const targetTicket = unresolvedTickets[0];
      const timer = setTimeout(() => {
        // Compose automated tailored response based on category
        let botText = "We are reviewing your request. Our local operators on the ground will handle this immediately.";
        if (targetTicket.category === 'booking') {
          botText = "Concierge Desk successfully loaded properties details. Room modifications are being requested directly to the Ryokan Desk. Stay tuned.";
        } else if (targetTicket.category === 'on-trip') {
          botText = "🚨 priority Critical Dispatch Alert: Field representative has been assigned to coordinate immediate solutions. We are standing by.";
        } else if (targetTicket.category === 'payment') {
          botText = "Our Billing ledger is verifying this escrow refund index. It should reflect updated values on check.";
        }

        // Add reply and mark as 'in-progress'
        setTickets(prev =>
          prev.map(t =>
            t.id === targetTicket.id
              ? {
                  ...t,
                  status: 'in-progress',
                  replies: [
                    ...t.replies,
                    {
                      sender: 'agent',
                      text: botText,
                      timestamp: new Date().toISOString()
                    }
                  ]
                }
              : t
          )
        );
      }, 5000); // 5 seconds automated dispatch

      return () => clearTimeout(timer);
    }
  }, [tickets]);

  // --- Dynamic Color Schemes and Theming (YouTube Music Slate glass theme + Zomato seasonal palettes) ---
  const getThemeColors = () => {
    switch (season) {
      case 'monsoon':
        return {
          accent: 'text-teal-400',
          accentBg: 'bg-teal-500 hover:bg-teal-400',
          accentBorder: 'border-teal-500/20',
          gradientHex: 'from-[#050505] via-[#050505]/95 to-teal-950/20',
          borderActive: 'border-teal-500',
          glowText: 'glow-text-monsoon',
          label: 'Monsoon Mist 🌧️',
          ambientText: 'Refresh under relaxing monsoon cloud covers and misty lagoon walks.'
        };
      case 'spring':
        return {
          accent: 'text-pink-400',
          accentBg: 'bg-pink-500 hover:bg-pink-400',
          accentBorder: 'border-pink-500/20',
          gradientHex: 'from-[#050505] via-[#050505]/95 to-pink-950/20',
          borderActive: 'border-pink-500',
          glowText: 'glow-text-spring',
          label: 'Cherry Blossom 🌸',
          ambientText: 'Delight in gorgeous pastel blooms, wellness tea tours and fresh spring winds.'
        };
      case 'winter':
        return {
          accent: 'text-blue-400',
          accentBg: 'bg-blue-600 hover:bg-blue-500',
          accentBorder: 'border-blue-600/20',
          gradientHex: 'from-[#050505] via-[#050505]/95 to-blue-950/20',
          borderActive: 'border-blue-600',
          glowText: 'glow-text-winter',
          label: 'Glacial Cozy ❄️',
          ambientText: 'Cozy up next to authentic wood logs and thermal streams surrounded by white peaks.'
        };
      case 'summer':
      default:
        return {
          accent: 'text-accent',
          accentBg: 'bg-accent hover:bg-accent-hover',
          accentBorder: 'border-accent/20',
          gradientHex: 'from-[#050505] via-[#050505]/95 to-accent/20',
          borderActive: 'border-accent',
          glowText: 'glow-text-summer',
          label: 'Solstice Glow ☀️',
          ambientText: 'Indulge in azure infinity pool domes, volcanic sun bursts and cliffside parties.'
        };
    }
  };

  const currentTheme = getThemeColors();

  // --- Handlers & Mutators ---
  const handleAddNewBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setBookingDest(null);
    setSelectedDest(null);
    navigate('/dashboard'); // Redirect to Customer Profile to see progress instantly!
  };

  const handleSupportTicketSubmit = (
    subjectInput: string,
    messageInput: string,
    categoryInput: 'booking' | 'payment' | 'on-trip' | 'other'
  ) => {
    const newTicket: SupportTicket = {
      id: `t_${Date.now()}`,
      userId: currentUser?.id || 'usr_tester',
      userName: currentUser?.name || 'Kishor Shekhawat',
      subject: subjectInput,
      message: messageInput,
      category: categoryInput,
      status: 'pending',
      createdAt: new Date().toISOString(),
      replies: [
        {
          sender: 'user',
          text: messageInput,
          timestamp: new Date().toISOString()
        }
      ]
    };
    setTickets([newTicket, ...tickets]);
  };

  const handleAddUserReply = (ticketId: string, text: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? {
              ...t,
              replies: [
                ...t.replies,
                {
                  sender: 'user',
                  text,
                  timestamp: new Date().toISOString()
                }
              ]
            }
          : t
      )
    );
  };

  // Admin responding to ticket
  const handleAdminReplyTicket = (ticketId: string, text: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? {
              ...t,
              status: 'resolved',
              replies: [
                ...t.replies,
                {
                  sender: 'agent',
                  text,
                  timestamp: new Date().toISOString()
                }
              ]
            }
          : t
      )
    );
  };

  // Admin updating live booking operational checkpoints step
  const handleUpdateBookingStep = (bookingId: string, increment: boolean) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId && b.status === 'live') {
          const nextIndex = increment
            ? Math.min(4, b.currentStepIndex + 1)
            : Math.max(0, b.currentStepIndex - 1);
          return { ...b, currentStepIndex: nextIndex };
        }
        return b;
      })
    );
  };

  // Admin tweaking premium markup multiplier ratios
  const handleTweakInventorySurge = (destId: string, tweakPercent: number) => {
    setDestinations(prev =>
      prev.map(d => {
        if (d.id === destId) {
          // Adjust price base dynamically
          const computedBase = DESTINATIONS.find(baseD => baseD.id === destId)!.priceStart;
          const finalPrice = Math.round(computedBase * (1 + tweakPercent / 100));
          return { ...d, priceStart: finalPrice };
        }
        return d;
      })
    );
  };

  // Guest logging in or signing up
  const handleUserLogin = (user: UserType) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    // Bind current user bookings
    const refreshedBookings = DEFAULT_BOOKINGS(user.id);
    const refreshedTickets = DEFAULT_TICKETS(user.id);
    setBookings(refreshedBookings);
    setTickets(refreshedTickets);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    // Clear back to guest dummy bounds
    setBookings(DEFAULT_BOOKINGS('usr_tester'));
    setTickets(DEFAULT_TICKETS('usr_tester'));
    navigate('/');
  };

  const handlePostReview = (bookingId: string, score: number, reviewContent: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? { ...b, rating: score, reviewText: reviewContent }
          : b
      )
    );
  };

  // Filtering destination list
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = dest.priceStart <= priceRange;
    const matchesSeason = filterSeason === 'all' || dest.seasonRecommendation === filterSeason;

    return matchesSearch && matchesPrice && matchesSeason;
  });

  const appState = {
    season, setSeason,
    currentUser, setCurrentUser,
    destinations, setDestinations,
    bookings, setBookings,
    tickets, setTickets,
    navigate, location, pathParts, activeTab,
    showSeasonDropdown, setShowSeasonDropdown,
    showBlogLightbox, setShowBlogLightbox,
    getSeasonIcon,
    selectedDest, selectedProduct, setSelectedDest, setSelectedProduct,
    activeDetailSection, setActiveDetailSection,
    expandedDay, setExpandedDay,
    showProductLightbox, setShowProductLightbox,
    showMobilePriceBox, setShowMobilePriceBox,
    bookingDest, setBookingDest,
    showAuthModal, setShowAuthModal,
    calcGuests, setCalcGuests,
    calcNights, setCalcNights,
    calcExtraHeli, setCalcExtraHeli,
    checkedPackingItems, setCheckedPackingItems,
    searchQuery, setSearchQuery,
    priceRange, setPriceRange,
    filterSeason, setFilterSeason,
    timeRemaining, setTimeRemaining,
    autoplayActive, setAutoplayActive,
    activePromoIndex, setActivePromoIndex,
    currentTheme,
    handleAddNewBooking, handleSupportTicketSubmit, handleAddUserReply,
    handleAdminReplyTicket, handleUpdateBookingStep, handleTweakInventorySurge,
    handleUserLogin, handleLogout, handlePostReview,
    filteredDestinations
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-clip relative">
      
      {/* Immersive Atmosphere background glows */}
      <div className="atmosphere" />

      {/* Dynamic Seasonal Animated Overlay Particle Layer */}
      <SeasonalOverlay season={season} />

      {/* --- SLEEK FLOATING BRAND LOGO BAR --- */}
      <header className="py-2 px-6 relative z-50 select-none bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => { navigate('/'); setSelectedDest(null); }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 520 125" 
              className="h-5 sm:h-5.5 md:h-6 w-auto text-white select-none pointer-events-none transition-all"
              fill="currentColor"
            >
              {/* Left Arch of T */}
              <path d="M 0,105 H 17 V 40 C 17,25 27,15 42,15 H 53 V 0 H 42 C 19,0 0,19 0,40 Z" />
              
              {/* Stem of T */}
              <rect x="53" y="24" width="13" height="81" />
              
              {/* Paper Plane of T */}
              <path d="M 49,15 L 94,0 L 63,48 L 61,25 Z" />
              
              {/* "ourishq" text in high-end matching bold sans-serif */}
              <text 
                x="110" 
                y="105" 
                fontWeight="900" 
                className="font-sans font-black tracking-normal"
                fontSize="112"
                fill="currentColor"
                style={{ fontFamily: '"Inter", "Montserrat", "system-ui", sans-serif' }}
              >
                ourishq
              </text>
            </svg>
          </div>

          {/* HEADER UTILITIES: SEASON SWITCHER & PROFILE TRIGGER */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <div className="relative">
              <button
                onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer bg-black/40 backdrop-blur-md"
                title="Change Ambient Theme"
              >
                {getSeasonIcon(season)}
                <ChevronUp className={`w-3.5 h-3.5 text-zinc-400 ml-1 transition-transform duration-300 ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showSeasonDropdown && (
                  <>
                    <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowSeasonDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -15, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                      className="absolute top-full right-0 mt-3 bg-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl z-50 w-44 space-y-1.5"
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

            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <div 
                  onClick={() => navigate('/dashboard')} 
                  className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer relative group flex items-center justify-center bg-white/5 hover:bg-white/10"
                  title={`${currentUser.name}'s Escapes`}
                >
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[11px] font-bold font-mono text-white">{currentUser.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden sm:flex p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/15 hover:border-red-500/20 text-zinc-400 hover:text-red-400 cursor-pointer active:scale-95 transition-all"
                  title="Disconnect"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-bold bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

          </div>
        </div>
      </header>
      {/* --- MAIN PAGE GRAPHICS & ACTIONS --- */}
      <main className="max-w-7xl mx-auto px-4 pt-0 pb-6 md:pb-8 relative z-10">
        {/* VIEW 1: HOME LANDING PAGE */}
        {activeTab === 'home' && <HomePage {...appState} />}

        {/* VIEW 2: DETAILED DESTINATION CATALOG (Search & Filtering) */}
        {activeTab === 'search' && !selectedDest && <SearchPage {...appState} />}

        {/* VIEW 3: NEW DESTINATION PAGE */}
        {selectedDest && !selectedProduct && <DestinationPage {...appState} />}

        {/* VIEW 4: PRODUCT DETAIL PAGE */}
        {selectedDest && selectedProduct && <ProductDetailPage {...appState} />}

        {/* VIEW 4: ESCALATION / CONTACT US */}
        {activeTab === 'support' && <SupportPage {...appState} />}

        {/* VIEW 5: ACCOUNT PROFILE DASHBOARD (My Escapes / Upcoming / Live / Past) */}
        {activeTab === 'dashboard' && <DashboardPage {...appState} />}

        {/* VIEW 6: ABOUT US PAGE */}
        {activeTab === 'about' && <AboutPage {...appState} />}

        {/* VIEW 7: INTERNAL TEAM ADMIN REVENUE & OPERATIONS DASHBOARD */}
        {activeTab === 'admin' && <AdminPage {...appState} />}
      </main>

      <Footer />

      {/* --- FLOATING SECURE AUTHENTICATION DIALOG (Portal container) --- */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthContainer
            onLogin={handleUserLogin}
            onCancel={() => setShowAuthModal(false)}
            seasonTheme={season}
          />
        )}
      </AnimatePresence>

      {/* --- DETAILED CUSTOM BOOKING WIZARD OVERLAY --- */}
      <AnimatePresence>
        {bookingDest && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <BookingWizard
              destination={bookingDest}
              currentUser={currentUser}
              onComplete={handleAddNewBooking}
              onCancel={() => setBookingDest(null)}
              seasonTheme={season}
            />
          </div>
        )}
      </AnimatePresence>

      {/* --- HIGH-FIDELITY FLOATING BLUR GLASS DOCK HEADER/NAVBAR --- */}
      <BlurGlassHeader
        currentTheme={currentTheme}
        season={season}
        setSeason={(newSeason) => setSeason(newSeason as any)}
        currentUser={currentUser}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={handleLogout}
      />

    </div>
  );
}
