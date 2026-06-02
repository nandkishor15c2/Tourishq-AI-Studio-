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
  Pause
} from 'lucide-react';

import { SeasonType, Destination, Booking, SupportTicket, User as UserType } from './types';
import {
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
import { AuthContainer } from './components/AuthContainer';
import { ProductCard } from './components/ProductCard';
import { SplitCarousel } from './components/SplitCarousel';
import { ArchHero } from './components/ArchHero';

// Local storage keys for state persistence
const STORAGE_USER_KEY = 'tourishq_user_state';
const STORAGE_BOOKINGS_KEY = 'tourishq_bookings_state';
const STORAGE_TICKETS_KEY = 'tourishq_tickets_state';
const STORAGE_THEME_KEY = 'tourishq_season_theme';
const STORAGE_DESTS_KEY = 'tourishq_destinations_state';

// Luxury promotional themed slices
const PROMOTIONS = [
  {
    season: 'spring',
    badge: 'Blossom Special',
    title: 'Kyoto Sanctuary Sakura Tea Event',
    description: 'Complimentary Kaiseki Banquets and private tea ceremonies added to all spring Kyoto bookings.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    tagline: '🌸 SAKURA EVENT UPGRADE',
    destinationId: 'kyoto'
  },
  {
    season: 'summer',
    badge: 'High Altitude Support',
    title: 'Nubra Valley Oxygen Suite upgrades',
    description: 'Ladakh expeditions upgraded with elite oxygen chambers and personal mountain medical care guides.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800&auto=format&fit=crop',
    tagline: '☀️ HIGH PASS SAFETY INSURANCE',
    destinationId: 'ladakh'
  },
  {
    season: 'monsoon',
    badge: 'Rainforest Healing',
    title: 'Kerala Abhyanga & Shirodhara Special',
    description: 'Bespoke ayurvedic therapies and romantic candlelit dinner cruises on our signature houseboats.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
    tagline: '🌧️ MONSOON HEALING UPGRADES',
    destinationId: 'kerala'
  },
  {
    season: 'winter',
    badge: 'Ski Privilege',
    title: 'Swiss Chalet Matterhorn Helicopter Flight',
    description: 'Free peak-skimming mountain helicopter scenic flights for all winter ski chalet bookings.',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop',
    tagline: '❄️ ALPS SKYLINE ADVENTURE',
    destinationId: 'swiss'
  }
];

// Curated elite itineraries
const TOP_ITINERARIES = [
  {
    id: 'it1',
    destId: 'tokyo',
    title: 'Digital Art and High Ginza Masters',
    tagline: 'TeamLab projection trails & certified A5 Wagyu pairing.',
    duration: '3 Days',
    rating: '4.98 ★',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    theme: 'Spring/Urban'
  },
  {
    id: 'it2',
    destId: 'kyoto',
    title: 'Arashiyama Sunrise & Gion lanterns',
    tagline: 'Scenic bamboo walks, traditional river boat excursions.',
    duration: '3 Days',
    rating: '4.95 ★',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop',
    theme: 'Spring/Cultural'
  },
  {
    id: 'it3',
    destId: 'ladakh',
    title: 'Nubra Dunes & Sapphire Pangong Starry Night',
    tagline: 'Himalayan cold camel safari, cozy high-pass lakeside campfires.',
    duration: '3 Days',
    rating: '4.93 ★',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop',
    theme: 'Summer/Adventure'
  },
  {
    id: 'it4',
    destId: 'santorini',
    title: 'Volcanic Catamaran Sights & Caldera Diving',
    tagline: 'Elite Mediterranean sea tour, deep cliff pool stargazing.',
    duration: '3 Days',
    rating: '4.89 ★',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop',
    theme: 'Summer/Ocean'
  },
  {
    id: 'it5',
    destId: 'swiss',
    title: 'Panoramas & Matterhorn Helicopter Flyover',
    tagline: 'Glass-roof glacier express train, breathtaking peak flips.',
    duration: '3 Days',
    rating: '4.98 ★',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=600&auto=format&fit=crop',
    theme: 'Winter/Ski'
  },
  {
    id: 'it6',
    destId: 'kerala',
    title: 'Vembanad Houseboats & Rain Kayaking',
    tagline: 'Masterchef backwater cruises, therapeutic herbal massages.',
    duration: '3 Days',
    rating: '4.91 ★',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    theme: 'Monsoon/Healing'
  }
];

// Tactical theme items clickable options
const SEASONAL_THEMES_DATA = [
  {
    id: 'spring',
    name: 'Cherry Blossom Resonance',
    label: '💮 Spring',
    desc: 'Soft pink sakura bloom beds, outdoor hot baths, and fresh green tea.',
    colorClass: 'text-pink-400',
    borderColor: 'border-pink-500/20',
    glowColor: 'shadow-pink-500/20',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'summer',
    name: 'Solstice Sunbursts',
    label: '☀️ Summer',
    desc: 'Breathtaking blue water bays, caldera cliffs, and camel treks.',
    colorClass: 'text-accent',
    borderColor: 'border-accent/20',
    glowColor: 'shadow-accent/20',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'monsoon',
    name: 'Quiet Rain Healing',
    label: '🌧️ Monsoon',
    desc: 'Ayurvedic stone massage, river houseboats, and rain cascades.',
    colorClass: 'text-teal-400',
    borderColor: 'border-teal-500/20',
    glowColor: 'shadow-teal-500/20',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'winter',
    name: 'Glacial Firewood Cozy',
    label: '❄️ Winter',
    desc: 'Scenic snowbound train rides, thermal pools, and fondues.',
    colorClass: 'text-blue-400',
    borderColor: 'border-blue-600/20',
    glowColor: 'shadow-blue-600/20',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=400&auto=format&fit=crop'
  }
];

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
        // If it lacks the newly added destinations, discard cache and use DESTINATIONS from data.ts
        if (parsed.some(d => d.id === 'ladakh') && parsed.some(d => d.id === 'tokyo')) {
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
  const activeTab = location.pathname === '/' ? 'home' : location.pathname.split('/')[1] || 'home';

  // Navigation and view focus state
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  
  // Modals & Overlays state
  const [bookingDest, setBookingDest] = useState<Destination | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeDetailSection, setActiveDetailSection] = useState<'itinerary' | 'hotels' | 'activities'>('itinerary');

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

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative pb-16">
      
      {/* Immersive Atmosphere background glows */}
      <div className="atmosphere" />

      {/* Dynamic Seasonal Animated Overlay Particle Layer */}
      <SeasonalOverlay season={season} />

      {/* --- SLEEK FLOATING BRAND LOGO BAR --- */}
      <header className="py-3.5 px-6 border-b border-white/5 bg-zinc-950/20 backdrop-blur-sm relative z-30 select-none">
        <div className="max-w-7xl mx-auto flex justify-start items-center">
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
        </div>
      </header>
      {/* --- MAIN PAGE GRAPHICS & ACTIONS --- */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* VIEW 1: HOME LANDING PAGE */}
        {activeTab === 'home' && !selectedDest && (() => {
          const activePromo = PROMOTIONS[activePromoIndex] || PROMOTIONS[0];
          const promoDest = destinations.find(d => d.id === activePromo.destinationId);
          const seasonalMatches = destinations.filter(d => d.seasonRecommendation === season);
          const sortedDests = [...destinations].sort((a, b) => b.rating - a.rating);

          return (
            <div className="space-y-16">
              
              {/* --- ADVANCED PROMOTIONAL HERO WITH THEMES (STACK MODE) --- */}
              <div className="relative w-full h-[495px] sm:h-[455px] md:h-[435px] lg:h-[415px] pb-12">
                {PROMOTIONS.map((promoItem, idx) => {
                  const promoTheme = SEASONAL_THEMES_DATA.find(t => t.id === promoItem.season) || SEASONAL_THEMES_DATA[0];
                  const promoDest = destinations.find(d => d.id === promoItem.destinationId);
                  const currentIndex = activePromoIndex;
                  const relativeIndex = (idx - currentIndex + PROMOTIONS.length) % PROMOTIONS.length;
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
                      className="absolute inset-x-0 top-0 h-[450px] sm:h-[410px] md:h-[390px] lg:h-[370px] rounded-[32px] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl flex items-center"
                    >
                      {/* Immersive background image with smooth lightened overlay */}
                      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden rounded-[32px] bg-black">
                        <img
                          src={promoItem.image}
                          alt=""
                          className="w-full h-full object-cover opacity-70 md:opacity-80 md:saturate-125 md:blur-xl scale-100"
                          style={{ willChange: 'transform' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                      </div>

                      {/* Background soft glowing orb matching active theme - hidden on mobile for performance */}
                      <div className={`hidden md:block absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none bg-gradient-to-br ${
                        promoItem.season === 'spring' ? 'from-pink-500' :
                        promoItem.season === 'summer' ? 'from-amber-500' :
                        promoItem.season === 'monsoon' ? 'from-teal-500' : 'from-blue-500'
                      }`} />

                      <div className="w-full p-5 sm:p-6 md:p-12 relative z-10 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center text-left">
                          {/* Left Side: Editorial Typography & Copy */}
                          <div className="col-span-1 md:col-span-7 space-y-4 md:space-y-6">
                            <div className="space-y-2 md:space-y-3">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest font-black uppercase rounded-lg bg-white/5 border border-white/10 ${promoTheme.colorClass}`}>
                                <Sparkles size={11} /> Seasonal Promotional Event
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
                                style={{ backgroundColor: promoItem.season === 'spring' ? '#F472B6' : promoItem.season === 'summer' ? '#FF4D00' : promoItem.season === 'monsoon' ? '#2DD4BF' : '#60A5FA' }}
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

                          {/* Right Side: Promotion Imagery Spotlight */}
                          <div className="hidden md:block md:col-span-5">
                            <div className="relative h-44 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                              <img 
                                src={promoItem.image} 
                                alt={promoItem.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              {/* Floating Badge */}
                              <span 
                                className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-black px-3 py-1 rounded-md shadow-lg"
                                style={{ backgroundColor: promoItem.season === 'spring' ? '#F472B6' : promoItem.season === 'summer' ? '#FF4D00' : promoItem.season === 'monsoon' ? '#2DD4BF' : '#60A5FA' }}
                              >
                                ★ {promoItem.badge}
                              </span>

                              {promoDest && (
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-baseline">
                                  <div>
                                    <p className="text-[10px] text-zinc-400 font-mono">Starting package from</p>
                                    <p className="text-lg font-black text-white font-mono">${promoDest.priceStart}</p>
                                  </div>
                                  <span className="text-xs text-amber-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer" onClick={() => setSelectedDest(promoDest)}>
                                    Explore Route <ChevronRight size={14} />
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* --- CAROUSEL 1: THEME CAROUSEL --- */}
              <SplitCarousel
                id="theme-carousel"
                category="Atmosphere"
                title="Seasonal Vibes"
                subtitle="Select system theme"
                description="Tap to instantly transform the app visual vibe."
                themeColor={currentTheme.accent}
                items={SEASONAL_THEMES_DATA}
                renderItem={(themeItem) => {
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
                  <ProductCard
                    dest={dest}
                    onClick={() => setSelectedDest(dest)}
                    rank={index + 1}
                  />
                )}
              />

              {/* --- CAROUSEL 3: TOP 10 ITINERARY --- */}
              <SplitCarousel
                id="top-itinerary-carousel"
                category="Elite Trails & Activities"
                title="Top Bespoke Itineraries"
                subtitle="Hand-walked expeditions with direct escorts"
                description="Explore top rated daily trajectories. Select any custom plan to view pre-scheduled high-grade hotels, transport parameters, and concierge details instantly."
                themeColor="text-pink-400"
                items={TOP_ITINERARIES}
                renderItem={(itinerary) => {
                  return (
                    <div
                      onClick={() => {
                        const targetDest = destinations.find(d => d.id === itinerary.destId);
                        if (targetDest) setSelectedDest(targetDest);
                      }}
                      className="relative h-[350px] rounded-[24px] overflow-hidden group cursor-pointer border border-white/10 shadow-xl text-left"
                    >
                      <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105 origin-center">
                        <img
                          src={itinerary.image}
                          alt={itinerary.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Info overlay */}
                      <div className="absolute inset-0 p-5 z-10 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                          <span className="inline-block px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white bg-black/55 backdrop-blur-md rounded-full border border-white/10 shadow-md animate-pulse">
                            {itinerary.theme}
                          </span>
                          <span className="text-[10px] font-bold text-amber-300 font-mono bg-zinc-950/80 px-2 py-0.5 rounded border border-white/5">
                            {itinerary.duration}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                            BESPOKE ROUTE {itinerary.rating}
                          </span>
                          <h4 className="text-base font-bold text-white mt-1 leading-snug font-serif">
                            {itinerary.title}
                          </h4>
                          <p className="text-[11px] text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                            {itinerary.tagline}
                          </p>
                          <div className="pt-3 border-t border-white/10 mt-3 flex justify-between items-center">
                            <span className="text-[10px] text-zinc-400">View detailed itineraries</span>
                            <span className="text-[11px] font-bold text-pink-400 flex items-center gap-0.5">
                              Open Itinerary <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              {/* --- CAROUSEL 4: RELEVANT SEASONAL ESCAPES --- */}
              <SplitCarousel
                id="seasonal-escapes-carousel"
                category="Recommended Trajectories"
                title={`${currentTheme.label} Seasonal Escapes`}
                subtitle={`Calibrated strictly for ${season.toUpperCase()} weather profiles`}
                description="Vibrant selections handpicked specifically for current weather characteristics. Match thermal cabin fireplace log fires or sea excursions effortlessly."
                themeColor={currentTheme.accent}
                items={seasonalMatches}
                renderItem={(dest) => (
                  <ProductCard
                    dest={dest}
                    onClick={() => setSelectedDest(dest)}
                  />
                )}
              />

              {/* --- NEW ARCH CAROUSEL --- */}
              <ArchHero destinations={destinations} />

              {/* Testimonials and Community feedback */}
              <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
                <div className="space-y-2 col-span-3 border-b border-white/5 pb-4 text-left">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono">Authentic Echoes</span>
                  <h3 className="text-xl font-bold text-white font-serif">What Cultured Nomads Report</h3>
                </div>
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between text-left font-sans">
                    <p className="text-xs text-zinc-200 italic leading-relaxed">
                      “{review.text}”
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-zinc-400 font-mono">{review.user}</span>
                      <span className="text-[10px] font-semibold text-amber-400">Verified Explorer</span>
                    </div>
                  </div>
                ))}
              </div>

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

        {/* VIEW 2: DETAILED DESTINATION CATALOG (Search & Filtering) */}
        {activeTab === 'destinations' && !selectedDest && (
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

        {/* VIEW 3: DESTINATION DETAIL SHEET (Itineraries, Stays, Activities) */}
        {selectedDest && (
          <div className="space-y-8 animate-fade-in text-left">
            {/* Upper breadcrumb back button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-950/40 p-3 rounded-2xl border border-white/5">
              <button
                onClick={() => setSelectedDest(null)}
                className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
              >
                ← Back to Destinations Explorer
              </button>
              <div className="text-[11px] font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                Luxury Segment Route: <span className="text-white font-bold">{selectedDest.name} ({selectedDest.country})</span>
              </div>
            </div>

            {/* HIGH-FIDELITY IMMERSIVE WIDESCREEN HERO BANNER */}
            <div className="relative h-[280px] sm:h-[350px] md:h-[380px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group text-left">
              {/* Cover background image */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Cover info badges and titles */}
              <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold font-mono text-black tracking-widest bg-amber-400 px-2.5 py-1 rounded-lg">
                      {selectedDest.country}
                    </span>
                    <span className="text-[10px] uppercase font-bold font-mono text-zinc-300 tracking-wider bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      Recommended: {selectedDest.seasonRecommendation.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-zinc-300 font-mono bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
                      ★ {selectedDest.rating} / 5.0 Exceptional Rating
                    </span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-black text-white tracking-tight leading-none mt-2">
                    {selectedDest.name}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base font-medium text-zinc-300 font-serif italic mt-1 max-w-2xl leading-relaxed">
                    "{selectedDest.tagline}"
                  </p>
                </div>

                {/* Local Weather Status Widget */}
                <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-left max-w-sm shrink-0 shadow-lg">
                  <span className="text-[9px] uppercase tracking-widest text-[#FF4D00] font-mono font-black block mb-1">Atmospheric Condition</span>
                  <p className="text-xs font-bold text-white leading-snug">
                    {getDestinationWeather(selectedDest.seasonRecommendation)}
                  </p>
                  <p className="text-[9px] text-zinc-400 mt-1 leading-relaxed">Optimal weather matching with highly favorable visitor density conditions on the ground.</p>
                </div>
              </div>
            </div>

            {/* Split Grid: Heavy visual header left, information center right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Scout Reports, Interactive Calculator, and Chef Checklist */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Scout Narrative Inspection */}
                <div className="bg-zinc-950/40 border border-white/10 rounded-3xl p-5 md:p-6 text-xs space-y-4 leading-relaxed">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] font-mono">Scout Field Inspection Report</h4>
                  </div>
                  <p className="text-zinc-350 font-sans leading-relaxed text-xs">
                    {selectedDest.description}
                  </p>
                  
                  <div className="bg-white/5 border border-white/5 p-3.5 rounded-2xl space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center text-zinc-305">
                        🕵️‍♂️
                      </div>
                      <span className="font-bold text-zinc-300 text-[10px]">Lead Curator Notes (Sato-san):</span>
                    </div>
                    <p className="text-[10.5px] text-zinc-400 italic font-sans leading-relaxed">
                      "Each activity route is audited monthly. Local ryokans, high-altitude cabins and catamaran suites are pre-vetted to guarantee maximum privacy and seamless hospitality."
                    </p>
                  </div>
                </div>

                {/* INTERACTIVE DESTINATION BUDGET ESTIMATOR & PACKAGE ROUTER */}
                <div className="bg-zinc-950/40 border border-white/10 rounded-3xl p-5 md:p-6 space-y-4 text-xs font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                      <Sliders size={12} className={currentTheme.accent} /> Quick Budget Calculator
                    </h4>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-accent/20 border border-accent/35 rounded text-accent font-bold font-mono">Live Estimates</span>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Iterate with cost variables below to simulate net package estimates before launching the transactional booking sequence.
                  </p>

                  <div className="space-y-3.5 pt-1">
                    {/* Guest Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10.5px] font-semibold text-zinc-350">
                        <span>Attending Explorers:</span>
                        <span className="text-white font-mono">{calcGuests} {calcGuests === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="8" 
                        value={calcGuests} 
                        onChange={(e) => setCalcGuests(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    {/* Nights Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10.5px] font-semibold text-zinc-350">
                        <span>Duration Of Escapes:</span>
                        <span className="text-white font-mono">{calcNights} Nights</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="14" 
                        value={calcNights} 
                        onChange={(e) => setCalcNights(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      />
                    </div>

                    {/* Helicopter upgrades checkbox / premium extra */}
                    <label className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors select-none mt-2">
                      <input 
                        type="checkbox" 
                        checked={calcExtraHeli} 
                        onChange={(e) => setCalcExtraHeli(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-white/10 bg-zinc-900 focus:ring-0 text-amber-500 cursor-pointer"
                      />
                      <div className="text-left">
                        <span className="block text-[10px] font-bold text-white uppercase tracking-wider">Premium Helicopter upgrade</span>
                        <span className="block text-[9px] text-zinc-400 mt-0.5 leading-relaxed">Add exclusive peak-skimming charter flights & high-pass guides (+$490)</span>
                      </div>
                    </label>

                    {/* Calculated Live pricing results */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between font-sans">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-zinc-550 font-mono">Simulated Net Cost</span>
                        <span className="block text-xl font-mono font-black text-rose-400">
                          ${((selectedDest.priceStart * calcGuests) + (calcNights * 150) + (calcExtraHeli ? 490 : 0)).toLocaleString()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const savedUser = currentUser;
                          if (!savedUser) {
                            setShowAuthModal(true);
                          } else {
                            setBookingDest(selectedDest);
                          }
                        }}
                        className={`py-2 px-3.5 rounded-xl font-semibold text-[10.5px] text-black shadow cursor-pointer transition-transform active:scale-95 text-center shrink-0 ${currentTheme.accentBg}`}
                      >
                        Customize & Book Itinerary
                      </button>
                    </div>

                  </div>
                </div>

                {/* CHEF CURATOR'S FIELD PACKING CHECKLIST */}
                <div className="bg-zinc-950/40 border border-white/10 rounded-3xl p-5 md:p-6 space-y-4 text-xs font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <h4 className="font-bold text-zinc-305 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                      ✓ Scout Guard Packing Checklist
                    </h4>
                    {(() => {
                      const items = getPackingItemsForDestination(selectedDest.id);
                      const completedCount = items.filter(item => checkedPackingItems[selectedDest.id + '_' + item]).length;
                      const pct = Math.round((completedCount / items.length) * 100) || 0;
                      return (
                        <span className="text-[10px] font-semibold text-zinc-400 font-mono">
                          {completedCount}/{items.length} Checked ({pct}%)
                        </span>
                      );
                    })()}
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    Arrive fully prepared on sight with these field-specific luxury gear suggestions.
                  </p>

                  <div className="space-y-2 mt-2">
                    {getPackingItemsForDestination(selectedDest.id).map((item, idx) => {
                      const itemKey = selectedDest.id + '_' + item;
                      const isChecked = !!checkedPackingItems[itemKey];
                      return (
                        <div 
                          key={idx} 
                          onClick={() => {
                            setCheckedPackingItems(prev => ({
                              ...prev,
                              [itemKey]: !isChecked
                            }));
                          }}
                          className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                            isChecked ? 'bg-zinc-900/40 border-emerald-500/20 text-zinc-400' : 'bg-white/5 border-white/5 text-zinc-200 hover:bg-white/10'
                          }`}
                        >
                          <div className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center text-[9px] ${
                            isChecked ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400 font-extrabold' : 'border-zinc-500'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </div>
                          <span className={`text-[11px] leading-relaxed select-text ${isChecked ? 'line-through opacity-60 font-medium' : 'font-semibold'}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right dynamic tabbed panel: Itinerary tracker, Stays or Activities highlights */}
              <div className="lg:col-span-7 bg-zinc-950/40 border border-white/10 p-5 md:p-6 rounded-3xl space-y-6 text-left">
                
                {/* Information tab bar selection */}
                <div className="flex bg-neutral-900/80 p-1 border border-white/5 rounded-xl text-xs select-none">
                  <button
                    onClick={() => setActiveDetailSection('itinerary')}
                    className={`flex-1 py-2.5 rounded-lg font-bold transition-all ${activeDetailSection === 'itinerary' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Itinerary ({selectedDest.itineraries.length} Days)
                  </button>
                  <button
                    onClick={() => setActiveDetailSection('hotels')}
                    className={`flex-1 py-2.5 rounded-lg font-bold transition-all ${activeDetailSection === 'hotels' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Ryokans & Houses ({selectedDest.hotels.length})
                  </button>
                  <button
                    onClick={() => setActiveDetailSection('activities')}
                    className={`flex-1 py-2.5 rounded-lg font-bold transition-all ${activeDetailSection === 'activities' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Experiences ({selectedDest.activities.length})
                  </button>
                </div>

                {/* Subview Content displays */}
                <div className="min-h-[250px]">
                  
                  {activeDetailSection === 'itinerary' && (
                    <div className="space-y-4">
                      {selectedDest.itineraries.map((it) => (
                        <div key={it.day} className="flex gap-4 scroll-mt-2 font-sans relative border-l border-white/10 pl-6 ml-3 pb-5 last:pb-0">
                          {/* Anchor bullet node */}
                          <div className={`absolute -left-2 top-1.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-stone-950 px-1 font-mono text-[9px] font-bold text-black ${currentTheme.accentBg}`} />
                          
                          <div className="space-y-1.5 text-left">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4D00] font-mono block">Day {it.day} Checkpoint</span>
                            <h4 className="text-sm font-semibold text-white">{it.title}</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans">{it.description}</p>
                            
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {it.activities.map((a, aIdx) => (
                                <span key={aIdx} className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-zinc-300 font-medium">
                                  ✦ {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeDetailSection === 'hotels' && (
                    <div className="space-y-4">
                      {selectedDest.hotels.map((h) => (
                        <div key={h.id} className="bg-zinc-900/30 border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center text-left">
                          <img src={h.image} className="w-full md:w-32 h-24 object-cover rounded-xl shrink-0" alt="" />
                          <div className="flex-grow space-y-1.5 text-xs">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-white tracking-tight">{h.name}</h4>
                                <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Category Rating: {'★'.repeat(h.stars)}</p>
                              </div>
                              <span className="text-xs font-mono font-bold text-amber-400 shrink-0">${h.pricePerNight} / Night</span>
                            </div>
                            <p className="text-[11px] text-zinc-400">{h.location}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {h.benefits.map((b, bIdx) => (
                                <span key={bIdx} className="text-[9px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded">
                                  ✓ {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeDetailSection === 'activities' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      {selectedDest.activities.map((act) => (
                        <div key={act.id} className="relative rounded-2xl border border-white/5 overflow-hidden p-4 min-h-[140px] flex flex-col justify-between bg-[#050505]/65">
                          <div className="absolute inset-0 z-0">
                            <img src={act.image} className="w-full h-full object-cover opacity-10" alt="" />
                            <div className="absolute inset-0 bg-stone-950/80" />
                          </div>

                          <div className="relative z-10 space-y-1">
                            <span className="text-[9px] uppercase tracking-wider bg-white/5 text-zinc-350 px-1.5 py-0.5 rounded">
                              {act.category}
                            </span>
                            <h4 className="font-bold text-white text-xs mt-1 leading-tight">{act.title}</h4>
                            <p className="text-[10px] text-zinc-500">{act.duration} · {act.intensity}</p>
                          </div>

                          <div className="relative z-10 flex justify-between items-baseline pt-3 mt-3 border-t border-white/5 text-xs font-mono">
                            <span className="text-zinc-500">Curator Escort Rate</span>
                            <span className="text-white font-bold">${act.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Direct Action triggers */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs">
                  <div className="text-zinc-500 text-left">
                    <p className="font-bold text-zinc-400">Escrow Protected Escrow Files</p>
                    <p className="text-[10px] mt-0.5">Free booking date alignments accepted up to 14 days before active checking countdown begins.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const savedUser = currentUser;
                      if (!savedUser) {
                        setShowAuthModal(true);
                      } else {
                        setBookingDest(selectedDest);
                      }
                    }}
                    className={`w-full sm:w-auto py-3 px-6 rounded-2xl font-extrabold text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:translate-y-[-2px] hover:shadow-accent/10 transition-all ${currentTheme.accentBg}`}
                  >
                    <Calendar size={15} /> Book Curated Route
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* VIEW 4: ESCALATION / CONTACT US */}
        {activeTab === 'support' && (
          <SupportTicketSystem
            tickets={tickets}
            userId={currentUser?.id || 'usr_tester'}
            userName={currentUser?.name || 'Kishor Shekhawat'}
            onSubmitTicket={handleSupportTicketSubmit}
            onAddReply={handleAddUserReply}
            seasonTheme={season}
          />
        )}

        {/* VIEW 5: ACCOUNT PROFILE DASHBOARD (My Escapes / Upcoming / Live / Past) */}
        {activeTab === 'dashboard' && currentUser && (
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
        )}

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

        {/* VIEW 7: INTERNAL TEAM ADMIN REVENUE & OPERATIONS DASHBOARD */}
        {activeTab === 'admin' && currentUser?.email.toLowerCase() === 'admin@tourishq.co' && (
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
        )}

      </main>

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
        setSelectedDest={setSelectedDest}
        currentUser={currentUser}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={handleLogout}
      />

    </div>
  );
}
