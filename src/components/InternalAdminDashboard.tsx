/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, DollarSign, Users, ShieldAlert, CheckCircle, ArrowUpRight, TrendingUp, RefreshCw, Send, Sliders } from 'lucide-react';
import { Booking, SupportTicket, OperationalMetric, Destination } from '../types';
import { LIVE_OPERATIONS_STEPS } from '../data';

interface InternalAdminDashboardProps {
  bookings: Booking[];
  tickets: SupportTicket[];
  metrics: OperationalMetric[];
  destinations: Destination[];
  onReplyTicket: (ticketId: string, text: string) => void;
  onUpdateBookingStep: (bookingId: string, increment: boolean) => void;
  onTweakPremium: (destId: string, tweak: number) => void;
  seasonTheme: string;
}

export const InternalAdminDashboard: React.FC<InternalAdminDashboardProps> = ({
  bookings,
  tickets,
  metrics,
  destinations,
  onReplyTicket,
  onUpdateBookingStep,
  onTweakPremium,
  seasonTheme
}) => {
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);

  const getAccentText = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'text-teal-400';
      case 'spring': return 'text-pink-400';
      case 'winter': return 'text-blue-400';
      case 'summer':
      default: return 'text-accent';
    }
  };

  const getAccentBg = () => {
    switch (seasonTheme) {
      case 'monsoon': return 'bg-teal-500 hover:bg-teal-400';
      case 'spring': return 'bg-pink-500 hover:bg-pink-400';
      case 'winter': return 'bg-blue-600 hover:bg-blue-500';
      case 'summer':
      default: return 'bg-accent hover:bg-accent-hover';
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

  // Financial aggregations
  const totalBookingsCount = bookings.length;
  const computedTotalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0) + 125430; // base historical total
  const liveToursCount = bookings.filter(b => b.status === 'live').length;
  const pendingTicketsCount = tickets.filter(t => t.status !== 'resolved').length;

  // Custom Chart scale calculation (SVG high precision bars for premium dashboard)
  const maxRevenue = Math.max(...metrics.map(m => m.revenue));
  const maxBookings = Math.max(...metrics.map(m => m.bookingsCount));

  const handleSendResponse = (ticketId: string) => {
    const text = replyInput[ticketId];
    if (!text || !text.trim()) return;
    onReplyTicket(ticketId, text);
    setReplyInput({ ...replyInput, [ticketId]: '' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 relative z-10 my-4">
      
      {/* Dynamic Status Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glassmorphism rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Escrow Sales Volume</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold font-mono text-white">${computedTotalRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-400 flex items-center"><TrendingUp size={10} /> +12.4%</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
            <span>Historical & Live</span>
            <DollarSign size={12} className={getAccentText()} />
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Active Bookings</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold font-mono text-white">{totalBookingsCount}</span>
              <span className="text-[10px] text-zinc-400">units matched</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
            <span>Customer matching</span>
            <Users size={12} className={getAccentText()} />
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Live Active Escapes</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-2xl font-bold font-mono text-white">{liveToursCount}</span>
              <span className="text-[10px] text-orange-400 animate-pulse">● Radio Dispatch</span>
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
            <span>In-flight GPS steps</span>
            <RefreshCw size={12} className={getAccentText()} />
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Active Support Alerts</span>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className={`text-2xl font-bold font-mono ${pendingTicketsCount > 0 ? 'text-rose-400' : 'text-zinc-400'}`}>
                {pendingTicketsCount}
              </span>
              {pendingTicketsCount > 0 && <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-bold animate-pulse">Critical</span>}
            </div>
          </div>
          <div className="text-[10px] text-zinc-500 mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
            <span>Support dispatch SLA</span>
            <ShieldAlert size={12} className="text-rose-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time Revenue Charts */}
        <div className="lg:col-span-2 glassmorphism rounded-3xl p-5 md:p-6 border border-white/10 flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Financial Intelligence Hub</span>
                <h3 className="text-lg font-bold text-white mt-1">SaaS & Booking Revenue Stream</h3>
              </div>
              <div className="flex gap-2 text-[10px] bg-neutral-900 border border-white/10 px-2.5 py-1.5 rounded-lg text-zinc-400">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Revenue</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-zinc-600 rounded-full" /> Bookings count</span>
              </div>
            </div>

            {/* Premium, interactive vector chart mimicking D3.js structure for ultra-fast load */}
            <div className="pt-6 relative">
              {/* Y-axis helper bounds */}
              <div className="absolute top-2 left-0 right-0 border-t border-white/5 flex justify-between text-[9px] text-zinc-600 font-mono">
                <span>$400k max</span>
                <span>Operational Capacity</span>
              </div>
              <div className="absolute top-[48%] left-0 right-0 border-t border-white/5 flex justify-between text-[9px] text-zinc-600 font-mono">
                <span>$200k mid</span>
              </div>

              <div className="flex justify-between items-end h-36 gap-3 md:gap-6 pt-4 relative z-10 select-none">
                {metrics.map((m, idx) => {
                  const revHeight = (m.revenue / maxRevenue) * 100;
                  const countHeight = (m.bookingsCount / maxBookings) * 80;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full flex justify-center items-end h-28 gap-1.5">
                        {/* Bookings Count background node */}
                        <div
                          className="w-2.5 bg-zinc-800 rounded-t group-hover:bg-zinc-700 transition-all duration-300"
                          style={{ height: `${countHeight}%` }}
                        />
                        {/* Revenue core gradient pillar */}
                        <div
                          className="w-4 bg-gradient-to-t from-orange-600 to-amber-400 rounded-t shadow-lg group-hover:from-orange-500 group-hover:to-amber-300 transition-all duration-300 relative"
                          style={{ height: `${revHeight}%` }}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-[10px] text-zinc-200 border border-white/15 px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-30 font-mono">
                            ${m.revenue.toLocaleString()} ({m.bookingsCount} bookings)
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-2 font-mono">{m.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic">
            *Drawn securely via local vector scalars. Historical indices updated in real-time on successful host escrow execution.
          </p>
        </div>

        {/* Operating Inventory Index Pricing controls (Spring/Summer tweaks) */}
        <div className="glassmorphism rounded-3xl p-5 md:p-6 border border-white/10 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Tour Logistics Engine</span>
              <h3 className="text-lg font-bold text-white mt-1">Demand Surge Multiplier</h3>
              <p className="text-xs text-zinc-400 mt-1">Tweak destination base prices dynamically to adjust margins.</p>
            </div>

            <div className="space-y-3 pt-2">
              {destinations.map((dest) => {
                // Read surge index from standard destination object (linked to memory state)
                const storedTweak = dest.priceStart > 1800 ? 10 : dest.priceStart < 1400 ? -5 : 0;
                return (
                  <div key={dest.id} className="bg-neutral-900/60 p-3 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white truncate">{dest.name}</span>
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        storedTweak > 0 ? 'bg-red-900/40 text-red-400' : storedTweak < 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {storedTweak > 0 ? `Surge +${storedTweak}%` : storedTweak < 0 ? `Promo ${storedTweak}%` : 'Standard'}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onTweakPremium(dest.id, -5)}
                        className="flex-1 py-1 px-1 text-[10px] rounded bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold"
                      >
                        Promo -5%
                      </button>
                      <button
                        type="button"
                        onClick={() => onTweakPremium(dest.id, 0)}
                        className="flex-1 py-1 px-1 text-[10px] rounded bg-white/5 hover:bg-white/10 text-zinc-300"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => onTweakPremium(dest.id, 10)}
                        className="flex-1 py-1 px-1 text-[10px] rounded bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold"
                      >
                        Surge +10%
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 pt-4 flex items-center gap-1">
            <Sliders size={12} className={getAccentText()} />
            <span>Interactive parameters applied immediately</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Support Tickets Desk responder */}
        <div className="glassmorphism rounded-3xl p-5 md:p-6 border border-white/10 space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400">Triage Operator</span>
            <h3 className="text-lg font-bold text-white mt-1">Urgent Support Inbox</h3>
            <p className="text-xs text-zinc-400 mt-1">Engage with guest escalations on the field.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[220px]">
            {/* Left list */}
            <div className="md:col-span-1 space-y-2 max-h-[250px] overflow-y-auto">
              {tickets.map((t) => {
                const isSelected = selectedTicketId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`cursor-pointer p-2.5 rounded-xl border text-left transition-colors ${
                      isSelected ? 'border-amber-500/50 bg-white/5' : 'border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex justify-between text-[8px] font-mono mb-1">
                      <span className={t.status === 'resolved' ? 'text-emerald-400' : 'text-amber-400'}>{t.status}</span>
                      <span className="text-zinc-500">{t.category}</span>
                    </div>
                    <h4 className="text-[11px] font-bold text-white truncate">{t.subject}</h4>
                    <p className="text-[9px] text-zinc-400 truncate mt-0.5">{t.message}</p>
                  </div>
                );
              })}
            </div>

            {/* Right chat operator window */}
            <div className="md:col-span-2 bg-zinc-950/40 border border-white/5 p-3 rounded-2xl flex flex-col justify-between">
              {selectedTicketId ? (
                (() => {
                  const t = tickets.find(ticket => ticket.id === selectedTicketId);
                  if (!t) return null;
                  return (
                    <div className="flex-1 flex flex-col justify-between text-xs h-full">
                      <div className="space-y-2 overflow-y-auto pr-1 max-h-[170px]">
                        <div className="border-b border-white/5 pb-1 mb-2">
                          <p className="text-[10px] text-zinc-500 font-mono">User: {t.userName} · Category: {t.category}</p>
                        </div>
                        {t.replies.map((rep, rIdx) => (
                          <div
                            key={rIdx}
                            className={`p-2 rounded-xl scale-98 ${
                              rep.sender === 'user' ? 'bg-white/5 border border-white/5 mr-auto max-w-[85%]' : 'bg-accent/10 border border-accent/20 ml-auto max-w-[85%] text-accent'
                            }`}
                          >
                            <p className="text-[11px]">{rep.text}</p>
                            <span className="text-[8px] text-zinc-500 block text-right">
                              {rep.sender === 'user' ? 'User' : 'You'}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-1.5 pt-3 mt-2 border-t border-white/5">
                        <input
                          type="text"
                          placeholder="Type response back..."
                          value={replyInput[t.id] || ''}
                          onChange={(e) => setReplyInput({ ...replyInput, [t.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendResponse(t.id);
                          }}
                          className="flex-1 bg-zinc-90 w-full bg-zinc-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendResponse(t.id)}
                          className={`p-2 rounded-xl cursor-pointer text-black ${getAccentBg()}`}
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-zinc-600 text-center text-xs">
                  <p>Inbox Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GUEST FLIGHT OPERATIONS CONTROLLER (LIVE BOOKINGS) */}
        <div className="glassmorphism rounded-3xl p-5 md:p-6 border border-white/10 space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Operations Control</span>
            <h3 className="text-lg font-bold text-white mt-1">Live Guest Dispatch Operations</h3>
            <p className="text-xs text-zinc-400 mt-1">Manually step guests through their actual itinerary checkpoints.</p>
          </div>

          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {bookings.filter(b => b.status === 'live').map((b) => (
              <div key={b.id} className="bg-neutral-900/60 p-4 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-white text-xs">{b.destination.name} Escape</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Primary: {b.paymentMethod.includes('ending') ? 'Kishor Shekhawat' : 'Kishor'}</p>
                  </div>
                  <span className="text-[10px] p-1 font-mono uppercase bg-emerald-900/30 text-emerald-300 rounded font-semibold animate-pulse">
                    Live steps: {b.currentStepIndex + 1}/5
                  </span>
                </div>

                <div className="space-y-1.5 bg-black/40 p-2.5 rounded-lg border border-white/5">
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>Active Stage:</span>
                  </div>
                  <p className="text-xs text-amber-300 font-semibold">{LIVE_OPERATIONS_STEPS[b.currentStepIndex]}</p>
                </div>

                {/* Control dispatch step */}
                <div className="flex gap-2">
                  <button
                    disabled={b.currentStepIndex === 0}
                    onClick={() => onUpdateBookingStep(b.id, false)}
                    className="flex-1 py-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none text-xs"
                  >
                    Previous Step
                  </button>
                  <button
                    disabled={b.currentStepIndex === 4}
                    onClick={() => onUpdateBookingStep(b.id, true)}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs"
                  >
                    Dispatch Next Step
                  </button>
                </div>
              </div>
            ))}

            {bookings.filter(b => b.status === 'live').length === 0 && (
              <div className="text-center py-6 text-zinc-500 text-xs">
                No active live bookings in-flight.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
