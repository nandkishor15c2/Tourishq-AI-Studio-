/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Hotel as HotelIcon, Compass, ShieldCheck, Check, ArrowRight, ArrowLeft, CreditCard, Sparkles } from 'lucide-react';
import { Destination, Hotel, Activity, Booking } from '../types';

interface BookingWizardProps {
  destination: Destination;
  currentUser: any;
  onComplete: (booking: Booking) => void;
  onCancel: () => void;
  seasonTheme: string;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  destination,
  currentUser,
  onComplete,
  onCancel,
  seasonTheme
}) => {
  const [step, setStep] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('2026-07-10');
  const [endDate, setEndDate] = useState<string>('2026-07-15');
  const [guests, setGuests] = useState<number>(2);
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(destination.hotels[0]);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([destination.activities[0]]);
  const [guestName, setGuestName] = useState<string>(currentUser?.name || 'Kishor Shekhawat');
  const [guestPhone, setGuestPhone] = useState<string>(currentUser?.phone || '+91 9876543210');
  const [paymentMethod, setPaymentMethod] = useState<string>('Google Pay');

  // Calculates financial summation
  const daysCount = Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)));
  const hotelTotal = selectedHotel.pricePerNight * daysCount * guests;
  const activitiesTotal = selectedActivities.reduce((sum, item) => sum + item.price, 0) * guests;
  const destinationBase = destination.priceStart * guests;
  const serviceFee = 120;
  const grandTotal = destinationBase + hotelTotal + activitiesTotal + serviceFee;

  const toggleActivity = (act: Activity) => {
    if (selectedActivities.some(a => a.id === act.id)) {
      setSelectedActivities(selectedActivities.filter(a => a.id !== act.id));
    } else {
      setSelectedActivities([...selectedActivities, act]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Completed, dispatch new Booking
      const newBooking: Booking = {
        id: `b_${Date.now()}`,
        userId: currentUser?.id || 'guest',
        destination,
        hotel: selectedHotel,
        activities: selectedActivities,
        startDate,
        endDate,
        guestCount: guests,
        totalPrice: grandTotal,
        status: 'upcoming',
        currentStepIndex: 0,
        paymentMethod
      };
      onComplete(newBooking);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  // Setup seasonal branding colors
  const getAccentBg = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'bg-teal-500 hover:bg-teal-400';
      case 'spring': return 'bg-pink-500 hover:bg-pink-400';
      case 'winter': return 'bg-blue-600 hover:bg-blue-500';
      case 'summer':
      default: return 'bg-accent hover:bg-accent-hover';
    }
  };

  const getAccentText = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'text-teal-400';
      case 'spring': return 'text-pink-400';
      case 'winter': return 'text-blue-400';
      case 'summer':
      default: return 'text-accent';
    }
  };

  const getAccentBorder = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'border-teal-500/50';
      case 'spring': return 'border-pink-500/50';
      case 'winter': return 'border-blue-600/50';
      case 'summer':
      default: return 'border-accent/50';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glassmorphism rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10 my-4">
      {/* Background radial soft light */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header with Step Tracker */}
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Bespoke Travel Booking</span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Tailor Your Trip to <span className={getAccentText()}>{destination.name}</span>
          </h2>
        </div>
        
        {/* Animated Progress Indicators */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-300 ${
                  step >= id
                    ? `${getAccentBg()} text-black border-transparent shadow-lg`
                    : 'border-white/10 text-zinc-400 bg-zinc-900/40'
                }`}
              >
                {step > id ? <Check size={14} className="stroke-[3]" /> : id}
              </div>
              {id < 4 && (
                <div
                  className={`w-6 h-[2px] transition-all duration-300 ${
                    step > id ? getAccentBg() : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Core Wizard Panel */}
        <div className="lg:col-span-2 p-6 md:p-8 min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              {/* Step 1: Calendar & Companions */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white/5 ${getAccentText()}`}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Select Travel Dates</h3>
                      <p className="text-xs text-zinc-400">Choose when you wish to experience {destination.name}.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400">Departure Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400">Return Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none "
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-white/5 ${getAccentText()}`}>
                        <Users size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Travel Companions</h3>
                        <p className="text-xs text-zinc-400">Indicate companion slots to calibrate logistics pricing.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-900/40 border border-white/10 p-4 rounded-xl">
                      <span className="text-sm text-zinc-300 flex-1">Total Attendees</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/5 text-lg font-medium"
                        >
                          -
                        </button>
                        <span className="text-white font-semibold min-w-8 text-center">{guests}</span>
                        <button
                          type="button"
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                          className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/5 text-lg font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Hotel Stays */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white/5 ${getAccentText()}`}>
                      <HotelIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Luxury Boutique Stay</h3>
                      <p className="text-xs text-zinc-400">Select a curated sanctuary included in your journey.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {destination.hotels.map((hotel) => {
                      const isSelected = selectedHotel.id === hotel.id;
                      return (
                        <div
                          key={hotel.id}
                          onClick={() => setSelectedHotel(hotel)}
                          className={`group cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col md:flex-row gap-4 p-4 ${
                            isSelected
                              ? `${getAccentBorder()} bg-white/5 shadow-lg`
                              : 'border-white/5 bg-zinc-900/30 hover:bg-zinc-900/60'
                          }`}
                        >
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full md:w-32 h-24 object-cover rounded-xl"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="text-white font-semibold group-hover:text-amber-300 transition-colors">{hotel.name}</h4>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                  isSelected ? `${getAccentBg()} text-black` : 'bg-white/5 text-zinc-300'
                                }`}>
                                  ${hotel.pricePerNight} / Night
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 mt-1">{hotel.location} · {'★'.repeat(hotel.stars)}</p>
                              
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {hotel.benefits.slice(0, 2).map((benefit, bIdx) => (
                                  <span key={bIdx} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-zinc-300">
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Adventure Activities */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white/5 ${getAccentText()}`}>
                      <Compass size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Adventure & Culture Activities</h3>
                      <p className="text-xs text-zinc-400">Add local explorations curated by our specialized field scouts.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.activities.map((act) => {
                      const isSelected = selectedActivities.some(a => a.id === act.id);
                      return (
                        <div
                          key={act.id}
                          onClick={() => toggleActivity(act)}
                          className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between h-44 relative overflow-hidden ${
                            isSelected
                              ? `${getAccentBorder()} bg-white/5 shadow-md`
                              : 'border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40'
                          }`}
                        >
                          {/* Half overlay image background */}
                          <div className="absolute inset-0 z-0">
                            <img src={act.image} className="w-full h-full object-cover opacity-15" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-black/60" />
                          </div>

                          <div className="relative z-10">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] uppercase tracking-wide bg-white/5 px-2 py-1 rounded text-zinc-300">
                                {act.category}
                              </span>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                                isSelected ? `${getAccentBg()} text-black` : 'border border-white/20'
                              }`}>
                                {isSelected && <Check size={12} className="stroke-[3]" />}
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-white mt-2 group-hover:text-amber-300">{act.title}</h4>
                            <p className="text-[11px] text-zinc-400 mt-1">{act.duration} · {act.intensity}</p>
                          </div>

                          <div className="relative z-10 flex justify-between items-baseline mt-2">
                            <span className="text-xs text-zinc-400">Price Per Guest</span>
                            <span className="text-sm font-bold text-white">${act.price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Attendee Checkout Details */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-white/5 ${getAccentText()}`}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Attendee Credentials</h3>
                      <p className="text-xs text-zinc-400">Complete verification to dispatch luxury confirmations.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Full Name (Primary Guest)</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                        placeholder="E.g., Nand Kishor"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-400">Phone for SMS Boarding Pass</label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400">Simulate Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Google Pay', 'Credit Card ending 4992'].map((method) => {
                          const isActive = paymentMethod === method;
                          return (
                            <div
                              key={method}
                              onClick={() => setPaymentMethod(method)}
                              className={`cursor-pointer rounded-xl border p-3 flex items-center justify-between transition-all duration-300 ${
                                isActive
                                  ? `${getAccentBorder()} bg-white/5`
                                  : 'border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60'
                              }`}
                            >
                              <span className="text-xs text-zinc-300 font-medium">{method}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isActive ? `${getAccentBg()} border-transparent` : 'border-white/20'
                              }`}>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Back / Next Controllers */}
          <div className="mt-8 flex justify-between items-center pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handleBack}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ArrowLeft size={16} />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`text-xs px-6 py-3 rounded-full font-bold flex items-center gap-2 cursor-pointer ${getAccentBg()} text-black shadow-lg hover:brightness-110 active:scale-95 transition-all`}
            >
              {step === 4 ? `Reserve for $${grandTotal.toLocaleString()}` : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Floating Side Pricing Summary (YouTube Music Glass vibe) */}
        <div className="p-6 md:p-8 bg-zinc-950/70 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-4">Invoice Summary</span>
            
            <div className="flex gap-3 mb-6">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">{destination.name}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{destination.country}</p>
                <span className="text-[10px] text-zinc-500">{guests} traveler{guests > 1 ? 's' : ''} · {daysCount} day{daysCount > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Destination base package</span>
                <span className="text-white">${destinationBase}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Hotel ({selectedHotel.name})</span>
                <span className="text-white">${hotelTotal}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Added Activities ({selectedActivities.length})</span>
                <span className="text-white">${activitiesTotal}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Scout & Logistics Fee</span>
                <span className="text-white">${serviceFee}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-sm font-semibold text-zinc-300">Grand Estimated Total</span>
              <span className={`text-xl font-bold ${getAccentText()}`}>
                ${grandTotal.toLocaleString()}
              </span>
            </div>

            <p className="text-[10px] text-zinc-500 leading-relaxed">
              *By tapping Continue, you initiate Tourishq luxury escrow protection. All custom properties verified instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
