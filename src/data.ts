/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination, Booking, SupportTicket, OperationalMetric } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto Sanctuary',
    tagline: 'Sakura trails & timeless bamboo groves',
    country: 'Japan',
    seasonRecommendation: 'spring',
    rating: 4.9,
    priceStart: 1850,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    description: 'Immerse in ancient shrines, slow-brewing tea ceremonies, and pink canopy clouds during the beautiful Spring blossom season.',
    itineraries: [
      {
        day: 1,
        title: 'Arrival & Gion Lanterns',
        description: 'Check in to Ryokan, evening walk under floating lanterns of Gion district.',
        activities: ['Gion Evening Walk', 'Welcome Kaiseki Feast'],
        meals: ['Breakfast', 'Dinner']
      },
      {
        day: 2,
        title: 'Arashiyama Bamboo & River Boat',
        description: 'Morning walk in the soaring bamboo trails followed by dynamic traditional wooden river boating.',
        activities: ['Bamboo Grove Exploration', 'Hozu River Boat Cruise'],
        meals: ['Breakfast', 'Lunch']
      },
      {
        day: 3,
        title: 'Kiyomizu-dera & Golden Pavilion',
        description: 'Explore Kyoto’s iconic architectural masterworks with panoramic city views.',
        activities: ['Golden Pavilion Tour', 'Sipping Sacred Water Experience'],
        meals: ['Breakfast']
      }
    ],
    hotels: [
      {
        id: 'ryokan_kyoto',
        name: 'Hoshinoya Kyoto Ryokan',
        stars: 5,
        pricePerNight: 450,
        location: 'Arashiyama Hills',
        benefits: ['Traditional Onsen Spa', 'Private Riverside Access', 'Authentic Matcha Lounge'],
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'forest_retreat',
        name: 'Suhara Wood Cabin Retreat',
        stars: 4,
        pricePerNight: 280,
        location: 'Higashiyama Forest',
        benefits: ['Zen Garden View', 'complimentary Bicycle Pass', 'Organic Breakfast Bar'],
        image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop'
      }
    ],
    activities: [
      {
        id: 'tea_ceremony',
        title: 'Private Uji Matcha Ceremony',
        duration: '2 Hours',
        price: 120,
        category: 'Cultural',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop',
        intensity: 'Easy'
      },
      {
        id: 'bamboo_bike',
        title: 'Arashiyama Sunrise Bicycle Trail',
        duration: '4 Hours',
        price: 95,
        category: 'Adventure',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1473872170233-0c3cc9a37aef?q=80&w=600&auto=format&fit=crop',
        intensity: 'Moderate'
      }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini Sunset',
    tagline: 'Azure domes, infinity cliff pools & sun flares',
    country: 'Greece',
    seasonRecommendation: 'summer',
    rating: 4.8,
    priceStart: 2100,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    description: 'Indulge in whitewashed elegance perched above volcanic calderas. Experience the world’s most cinematic golden sunset cliffs.',
    itineraries: [
      {
        day: 1,
        title: 'Oia Cliff Walk & Sunset Cocktail',
        description: 'Arrive at luxury cliff villa. Watch sunsets from private plunge pool with bespoke greek wine.',
        activities: ['Luxury Cliff Transfer', 'Bespoke Vintage Wine Tasting'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Volcanic Caldera Luxury Catamaran',
        description: 'Day sailing charter with hot spring swimming and delicious Mediterranean buffet on deck.',
        activities: ['Catamaran Sailing Tour', 'Hot Spring Snorkeling'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'Akrotiri Archaeological Treasures',
        description: 'Guided tour of the prehistoric Minoan city preserved in volcanic ash.',
        activities: ['Akrotiri Archeology Explorer', 'Saganaki Masterclass'],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    hotels: [
      {
        id: 'astra_suites',
        name: 'Astra Suites Cliffside Resort',
        stars: 5,
        pricePerNight: 550,
        location: 'Imerovigli Cliff',
        benefits: ['Iconic Caldera View Plunge Pools', 'Private Yacht Charters', 'Volcanic Spa Treatments'],
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'oia_dream',
        name: 'Oia Windmill Boutique Hotel',
        stars: 4.5,
        pricePerNight: 390,
        location: 'Oia Sunset Edge',
        benefits: ['Rooftop sunset dine decks', 'Curated volcanic wine cellars', 'Complimentary luggage transfer'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop'
      }
    ],
    activities: [
      {
        id: 'catamaran_sail',
        title: 'Private Catamaran Sunburst Cruise',
        duration: '5 Hours',
        price: 240,
        category: 'Ocean',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1505080856163-267d49b302c4?q=80&w=600&auto=format&fit=crop',
        intensity: 'Easy'
      },
      {
        id: 'scuba_caldera',
        title: 'Volcanic Plunge Scuba Diving',
        duration: '3 Hours',
        price: 150,
        category: 'Adventure',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop',
        intensity: 'Challenging'
      }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala Mist & Spice',
    tagline: 'Floating luxury houseboats & monsoon rains',
    country: 'India',
    seasonRecommendation: 'monsoon',
    rating: 4.8,
    priceStart: 1200,
    image: 'https://images.unsplash.com/photo-1563228913-74b595ed5808?q=80&w=800&auto=format&fit=crop',
    description: 'Listen to premium soothing rain droplets on banana leaves. Wake up on an authentic luxury houseboat cruising emerald waters.',
    itineraries: [
      {
        day: 1,
        title: 'Floating Houseboat Embarkation',
        description: 'Boards private premium wooden houseboat in Kumarakom with dedicated personal chef and captain.',
        activities: ['Houseboat Cruise', 'Live Rain Deck Dining'],
        meals: ['Lunch', 'Dinner']
      },
      {
        day: 2,
        title: 'Spice Forest Canopy Trail',
        description: 'Guided trek through refreshing rain-soaked spice plantations, learning ancient plant medicine.',
        activities: ['Monsoon Jungle Safari', 'Spice Tasting Session'],
        meals: ['Breakfast', 'Lunch']
      },
      {
        day: 3,
        title: 'Munnar Tea Mountain Tea Walk',
        description: 'Scenic drive to misty terraced estates with authentic Ceylon tea manufacturing tours.',
        activities: ['Misty Mountain Trek', 'Handcrafted Tea Blending'],
        meals: ['Breakfast']
      }
    ],
    hotels: [
      {
        id: 'palms_houseboat',
        name: 'The Tamara Kerala Houseboat Escapes',
        stars: 5,
        pricePerNight: 350,
        location: 'Vembanad Lake',
        benefits: ['Dedicated Masterchef', 'Open Air Monsoon Rainfall Deck', 'Authentic Ayurveda Masseuse'],
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'kumarakom_lake',
        name: 'Kumarakom Lake Heritage Villas',
        stars: 4.8,
        pricePerNight: 290,
        location: 'Alleppey Backwaters',
        benefits: ['Private Heritage Pools', 'Monsoon Ayurvedic Spa', 'Evening Kathakali shows'],
        image: 'https://images.unsplash.com/photo-1545438342-7641a44fe95e?q=80&w=800&auto=format&fit=crop'
      }
    ],
    activities: [
      {
        id: 'ayurveda_dhara',
        title: 'Monsoon Abhyanga Shirodhara Massage',
        duration: '1.5 Hours',
        price: 90,
        category: 'Wellness',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
        intensity: 'Easy'
      },
      {
        id: 'backwater_kayak',
        title: 'Narrow Canal Rain Kayaking',
        duration: '3 Hours',
        price: 75,
        category: 'Adventure',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=600&auto=format&fit=crop',
        intensity: 'Moderate'
      }
    ]
  },
  {
    id: 'swiss',
    name: 'Swiss Frost & Fire',
    tagline: 'Cozy fireplaces, peak powder & thermal pools',
    country: 'Switzerland',
    seasonRecommendation: 'winter',
    rating: 4.9,
    priceStart: 2450,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop',
    description: 'Ski down sweeping glaciers, dine on artisan cheese fondue next to roaring logs, and steep in thermal bath waters surrounded by winter snow.',
    itineraries: [
      {
        day: 1,
        title: 'Alpine Express & Cheese Cabin',
        description: 'Arrive via glass-dome panoramic Glacier Express. Enjoy luxury cabin check-in with standard hot toddy.',
        activities: ['Scenic Alpine Train Ride', 'Welcome Fondue Gathering'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Zermatt Ski Adventure or Snowshoes',
        description: 'Premium lift passes to the high Matterhorn peaks. Enjoy skiing or scenic forest snowshoe trails.',
        activities: ['Glacier Ski Session', 'Matterhorn Summit Heli-Tour'],
        meals: ['Breakfast', 'Lunch']
      },
      {
        day: 3,
        title: 'Outdoor Hot Bath & Thermal Spa',
        description: 'Steep in natural sulfur hot pools directly under the crisp winter stars and cold mountain peaks.',
        activities: ['Thermal Bath VIP Access', 'Deep Snow Cabin Relaxation'],
        meals: ['Breakfast', 'Dinner']
      }
    ],
    hotels: [
      {
        id: 'gstaad_palace',
        name: 'The Alpina Gstaad Winter Palace',
        stars: 5,
        pricePerNight: 620,
        location: 'Gstaad Ski Valley',
        benefits: ['Indoor/Outdoor Heated Thermal Pools', 'Michelin Rated Alpine Fine Dining', 'Chamber Fireplaces'],
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop'
      },
      {
        id: 'zermatt_refuge',
        name: 'Zermatt Panorama Spa & Lodge',
        stars: 4.5,
        pricePerNight: 430,
        location: 'Zermatt Peak Edge',
        benefits: ['Direct ski-in / ski-out doors', 'Fireplace lounge with cellar bar', 'Stargazing skylight rooms'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop'
      }
    ],
    activities: [
      {
        id: 'ski_matterhorn',
        title: 'Matterhorn Peak Ski Guiding',
        duration: '6 Hours',
        price: 290,
        category: 'Adventure',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1551698618-1fed5d97d206?q=80&w=600&auto=format&fit=crop',
        intensity: 'Challenging'
      },
      {
        id: 'glacier_helicopter',
        title: 'Premium Helicopter Glacial Flyover',
        duration: '1 Hours',
        price: 450,
        category: 'Sights',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=600&auto=format&fit=crop',
        intensity: 'Easy'
      }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh Highland Glaciers',
    tagline: 'Monasteries on cliffs, sapphire lakes & high passes',
    country: 'India',
    seasonRecommendation: 'summer',
    rating: 4.93,
    priceStart: 1650,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=800&auto=format&fit=crop',
    description: 'Discover the pristine majesty of the high-altitude trans-Himalayan desert. Experience winding ancient monastery paths, pristine salt lake waters, and high mountain peaks.',
    itineraries: [
      {
        day: 1,
        title: 'Leh Acclimatization & Shanti Stupa',
        description: 'Rest and acclimatize at the altitude. Sunset visit to the white-domed Shanti Stupa.',
        activities: ['Leh Palace Walk', 'Traditional Hot Ginger Drink Session'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Nubra Valley via Khardung La',
        description: 'Drive across the world’s highest motorable pass. Explore cold desert sand dunes on double-humped camels.',
        activities: ['Khardung La Pass Stunt Photo', 'Bactrian Camel Ride'],
        meals: ['Breakfast', 'Lunch']
      },
      {
        day: 3,
        title: 'Sapphire Waters of Pangong Lake',
        description: 'Drive through Chang La Pass to reach the end-to-end blue saline lake on the international border.',
        activities: ['Lake-shore Sunset Walk', 'Lakeside Cozy Campfire'],
        meals: ['Breakfast', 'Dinner']
      }
    ],
    hotels: [
      {
        id: 'himalayan_retreat',
        name: 'The Grand Dragon Ladakh Resort',
        stars: 5,
        pricePerNight: 240,
        location: 'Leh Valley Side',
        benefits: ['Premium Oxygen Enrichment Rooms', 'Buddhist Zen Prayer Garden', 'Traditional Ladakhi Clay Oven Bakeries'],
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop'
      }
    ],
    activities: [
      {
        id: 'pangong_camp',
        title: 'Sapphire Stargazing & Cozy Campsite',
        duration: 'Overnight',
        price: 180,
        category: 'Adventure',
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop',
        intensity: 'Moderate'
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo Cyber Neon Odyssey',
    tagline: 'Immersive cyber-streets, wagyu pairing & floating tea shrines',
    country: 'Japan',
    seasonRecommendation: 'spring',
    rating: 4.88,
    priceStart: 2200,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
    description: 'Get lost in a brilliant fusion of high-neon skyscrapers, futuristic galactic lounges, and quiet hidden woodland temples.',
    itineraries: [
      {
        day: 1,
        title: 'Shibuya Neon Crossing & Golden Gai Speakeasy',
        description: 'Behold the dynamic rhythm of Shibuya crossing. Sip craft gin in hidden retro alleys.',
        activities: ['Shibuya Sky Panoramic View', 'Golden Gai Night Safari'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Digital Art Museum & Teamlab Planetary Trails',
        description: 'Walk through infinite matrix crystals and projection of falling orchids.',
        activities: ['TeamLab Crystals Access', 'Meiji Forest Shrine walk'],
        meals: ['Breakfast', 'Lunch']
      },
      {
        day: 3,
        title: 'VIP Ginza Culinary Masters',
        description: 'Indulge in certified A5 Kobe Wagyu charcoal grilling paired with luxury hot sake.',
        activities: ['Ginza Wagyu Tasting', 'Midnight Tsukimi tea ritual'],
        meals: ['Breakfast', 'Dinner']
      }
    ],
    hotels: [
      {
        id: 'aman_tokyo',
        name: 'Aman Tokyo Panoramic Suites',
        stars: 5,
        pricePerNight: 750,
        location: 'Otemachi Trade Spire',
        benefits: ['Sake Bathhouse Onsen', 'Fuji Mountain Sunset Vistas', 'Chamber Matcha Ceremonies'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop'
      }
    ],
    activities: [
      {
        id: 'michelin_wagyu',
        title: 'Ginza A5 Wagyu & Sake Masterclass',
        duration: '3 Hours',
        price: 250,
        category: 'Culinary',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
        intensity: 'Easy'
      }
    ]
  }
];

export const MOCK_REVIEWS = [
  { id: 1, user: 'Siddharth M.', text: 'The Monsoon theme made me book a Kerala backwater trip instantly. Outstanding animations!' },
  { id: 2, user: 'Elena Rostova', text: 'Kyoto under cherry blossoms was flawless. The Ryokan recommendation was 10 out of 10.' },
  { id: 3, user: 'Aris Thorne', text: 'Highly visual billing. The live operational tracker actually let me see when my shuttle got dispatched.' }
];

export const DEFAULT_BOOKINGS = (userId: string): Booking[] => [
  {
    id: 'b_upcoming',
    userId,
    destination: DESTINATIONS[0], // Kyoto
    hotel: DESTINATIONS[0].hotels[0], // Ryokan
    activities: [DESTINATIONS[0].activities[0]],
    startDate: '2026-06-15',
    endDate: '2026-06-20',
    guestCount: 2,
    totalPrice: 3250,
    status: 'upcoming',
    currentStepIndex: 0,
    paymentMethod: 'Google Pay'
  },
  {
    id: 'b_live',
    userId,
    destination: DESTINATIONS[2], // Kerala
    hotel: DESTINATIONS[2].hotels[0], // Palms Houseboat
    activities: [DESTINATIONS[2].activities[0], DESTINATIONS[2].activities[1]],
    startDate: '2026-05-28',
    endDate: '2026-06-03',
    guestCount: 2,
    totalPrice: 2150,
    status: 'live',
    currentStepIndex: 1, // "Luggage Handled, cruising Vembanad Lake!"
    paymentMethod: 'Credit Card ending in 4992'
  },
  {
    id: 'b_past',
    userId,
    destination: DESTINATIONS[1], // Santorini
    hotel: DESTINATIONS[1].hotels[1], // Oia Dream
    activities: [DESTINATIONS[1].activities[0]],
    startDate: '2025-08-10',
    endDate: '2025-08-15',
    guestCount: 1,
    totalPrice: 1950,
    status: 'past',
    currentStepIndex: 3, // Complete
    rating: 5,
    reviewText: 'Spectacular sunset views. Oia Windmill hotel had amazing service.',
    paymentMethod: 'Apple Pay'
  }
];

export const LIVE_OPERATIONS_STEPS = [
  'Luxury airport pickup dispatch confirmed',
  'Arrived & local welcome juices served at hotel',
  'Onboard evening local food tour/activity underway',
  'Local wellness spa session completed',
  'Leisure check-out & private escort transfer to terminal'
];

export const DEFAULT_TICKETS = (userId: string): SupportTicket[] => [
  {
    id: 't1',
    userId,
    userName: 'Kishor',
    subject: 'Requesting High-Floor Room at Hoshinoya Ryokan',
    message: 'Hello, our upcoming honeymoon in Kyoto would be complete with a high-floor corner wood-panel room. Can Tourishq ensure this?',
    category: 'booking',
    status: 'in-progress',
    createdAt: '2026-05-29T10:15:00Z',
    replies: [
      {
        sender: 'user',
        text: 'Hello, our upcoming honeymoon in Kyoto would be complete with a high-floor corner wood-panel room. Can Tourishq ensure this?',
        timestamp: '2026-05-29T10:15:00Z'
      },
      {
        sender: 'agent',
        text: 'Congratulations on your upcoming honeymoon! We have flagged this priority request directly to Hoshinoya Kyoto Ryokan’s executive concierge desk. We will have an update within 2 hours.',
        timestamp: '2026-05-29T10:45:00Z'
      }
    ]
  },
  {
    id: 't2',
    userId,
    userName: 'Kishor',
    subject: 'Rain cover question for Monsoon Kayaking in Kerala',
    message: 'Since it is raining heavily, do you supply waterproof drybags and waterproof rainponchos for kayaking?',
    category: 'on-trip',
    status: 'resolved',
    createdAt: '2026-05-28T08:00:00Z',
    replies: [
      {
        sender: 'user',
        text: 'Since it is raining heavily, do you supply waterproof drybags and waterproof rainponchos for kayaking?',
        timestamp: '2026-05-28T08:00:00Z'
      },
      {
        sender: 'agent',
        text: 'Absolutely! Tourishq supplies heavy-duty waterproof gear, floating camera zip bags, and dry fleece towels inside each kayak. Stay warm and enjoy the beautiful rain drops!',
        timestamp: '2026-05-28T08:10:00Z'
      }
    ]
  }
];

export const DEFAULT_ADMIN_STOCKS = [
  { id: 'kyoto', name: 'Kyoto Sanctuary', allocatedSlots: 24, booked: 18, pricingPremium: 0 },
  { id: 'santorini', name: 'Santorini Sunset', allocatedSlots: 15, booked: 14, pricingPremium: 10 },
  { id: 'kerala', name: 'Kerala Mist & Spice', allocatedSlots: 40, booked: 22, pricingPremium: -5 },
  { id: 'swiss', name: 'Swiss Frost & Fire', allocatedSlots: 12, booked: 9, pricingPremium: 15 }
];

export const REVENUE_METRICS: OperationalMetric[] = [
  { date: 'Jan 2026', revenue: 145000, bookingsCount: 68, liveGuests: 12 },
  { date: 'Feb 2026', revenue: 185000, bookingsCount: 82, liveGuests: 24 },
  { date: 'Mar 2026', revenue: 230000, bookingsCount: 110, liveGuests: 35 },
  { date: 'Apr 2026', revenue: 310000, bookingsCount: 145, liveGuests: 48 },
  { date: 'May 2026 (Live)', revenue: 382400, bookingsCount: 178, liveGuests: 64 }
];
