/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SeasonType = 'spring' | 'summer' | 'monsoon' | 'winter';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer' | 'admin';
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
}

export interface Activity {
  id: string;
  title: string;
  duration: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  intensity: 'Easy' | 'Moderate' | 'Challenging';
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  pricePerNight: number;
  location: string;
  benefits: string[];
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  country: string;
  seasonRecommendation: string;
  rating: number;
  priceStart: number;
  image: string;
  description: string;
  itineraries: ItineraryDay[];
  hotels: Hotel[];
  activities: Activity[];
}

export interface Booking {
  id: string;
  userId: string;
  destination: Destination;
  hotel: Hotel;
  activities: Activity[];
  startDate: string;
  endDate: string;
  guestCount: number;
  totalPrice: number;
  status: 'upcoming' | 'live' | 'past';
  currentStepIndex: number; // For live tracking (e.g. index in operations list)
  rating?: number;
  reviewText?: string;
  paymentMethod: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  category: 'booking' | 'payment' | 'on-trip' | 'other';
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  replies: Array<{
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
  }>;
}

export interface OperationalMetric {
  date: string;
  revenue: number;
  bookingsCount: number;
  liveGuests: number;
}
