/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Mail, Phone, MessageSquare, Send, Check, ShieldAlert, Sparkles } from 'lucide-react';
import { SupportTicket } from '../types';

interface SupportTicketSystemProps {
  tickets: SupportTicket[];
  userId: string;
  userName: string;
  onSubmitTicket: (subject: string, message: string, category: 'booking' | 'payment' | 'on-trip' | 'other') => void;
  onAddReply: (ticketId: string, text: string) => void;
  seasonTheme: string;
}

export const SupportTicketSystem: React.FC<SupportTicketSystemProps> = ({
  tickets,
  userId,
  userName,
  onSubmitTicket,
  onAddReply,
  seasonTheme
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'booking' | 'payment' | 'on-trip' | 'other'>('booking');
  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  const [currentReply, setCurrentReply] = useState<{ [key: string]: string }>({});
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    onSubmitTicket(subject, message, category);
    setSubject('');
    setMessage('');
    setActiveTab('list');
  };

  const handleReplySubmit = (ticketId: string) => {
    const text = currentReply[ticketId];
    if (!text || !text.trim()) return;
    onAddReply(ticketId, text);
    setCurrentReply({ ...currentReply, [ticketId]: '' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto glassmorphism rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden my-4">
      {/* Background radial glowing ball */}
      <div className="absolute top-1/2 -right-20 w-[250px] h-[250px] bg-sky-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Priority Concierge Escapes</span>
          <h2 className="text-2xl font-bold text-white mt-1">24/7 Escalation & Support Desk</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time traveler rescue. Your itinerary safety and luxury comfort are guaranteed.
          </p>
        </div>

        <div className="flex bg-neutral-900/60 p-1 rounded-xl border border-white/10 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`flex-1 md:flex-none text-xs px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'new' ? `${getAccentBg()} text-black shadow-md` : 'text-zinc-400 hover:text-white'
            }`}
          >
            File Instant Escalation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`flex-1 md:flex-none text-xs px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
              activeTab === 'list' ? `${getAccentBg()} text-black shadow-md` : 'text-zinc-400 hover:text-white'
            }`}
          >
            Active Tickets ({tickets.length})
            {tickets.some(t => t.status === 'in-progress') && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'new' ? (
          <motion.div
            key="new-ticket"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Action form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Escalation Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none"
                  >
                    <option value="booking">Booking Change/Customization</option>
                    <option value="payment">Billing/Refund Triage</option>
                    <option value="on-trip">Critical On-Trip Active Support</option>
                    <option value="other">General Tour Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 font-mono">Traveler Name</label>
                  <input
                    type="text"
                    disabled
                    value={userName}
                    className="w-full bg-zinc-950/40 border border-white/5 rounded-xl px-4 py-3 text-zinc-400 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Subject / Matter Outline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Room upgrade check, or Airport driver delayed"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Describe What You Need Help with</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide details. Our tour operators have authoritative systems overrides."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-bold text-black flex items-center justify-center gap-2 text-xs shadow-lg transition-transform active:scale-98 ${getAccentBg()}`}
              >
                <Send size={14} />
                Submit Escalation Request
              </button>
            </form>

            {/* Direct Contact info (YouTube Music styling) */}
            <div className="bg-zinc-950/40 rounded-2xl p-5 border border-white/5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block">Hotline Concierge</span>
              
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                <div className={`p-2 rounded-lg bg-zinc-900 ${getAccentText()}`}>
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold font-mono">+1 (800) TOURISHQ</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Luxury Priority Line</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                <div className={`p-2 rounded-lg bg-zinc-900 ${getAccentText()}`}>
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold font-mono">escapes@tourishq.co</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Concierge Desk</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-orange-600/5 border border-orange-500/10 text-orange-400/90 text-[11px] leading-relaxed">
                <ShieldAlert size={14} className="inline mr-1.5" />
                <strong>Monsoon/Weather Alert Warning:</strong> Global emergency rescue procedures are active. Expect priority dispatcher responses within seconds.
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tickets-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {tickets.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900/10 rounded-2xl border border-white/5">
                <HelpCircle className="mx-auto text-zinc-600 mb-2" size={32} />
                <p className="text-sm text-zinc-400 font-semibold">No active escalation issues filed.</p>
                <p className="text-xs text-zinc-500 mt-1">If you have booking hitches, open a new ticket above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tickets left rail */}
                <div className="md:col-span-1 space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {tickets.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTicketId(selectedTicketId === t.id ? null : t.id)}
                      className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all duration-300 ${
                        selectedTicketId === t.id
                          ? `${getAccentBorder()} bg-white/5`
                          : 'border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          t.status === 'pending'
                            ? 'bg-neutral-800 text-zinc-300'
                            : t.status === 'in-progress'
                            ? 'bg-accent text-white'
                            : 'bg-emerald-600 text-white'
                        }`}>
                          {t.status}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white mt-2 truncate">{t.subject}</h4>
                      <p className="text-[10px] text-zinc-400 truncate mt-1">{t.message}</p>
                    </div>
                  ))}
                </div>

                {/* Ticket discussion right rail */}
                <div className="md:col-span-2 bg-zinc-950/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between min-h-[350px]">
                  {selectedTicketId ? (
                    (() => {
                      const activeTicket = tickets.find(t => t.id === selectedTicketId);
                      if (!activeTicket) return null;
                      return (
                        <>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="border-b border-white/5 pb-2.5 mb-3">
                                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${getAccentText()} bg-white/5`}>
                                  Category: {activeTicket.category}
                                </span>
                                <h3 className="text-sm font-bold text-white mt-1.5">{activeTicket.subject}</h3>
                              </div>

                              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                                {activeTicket.replies.map((rep, rIdx) => (
                                  <div
                                    key={rIdx}
                                    className={`p-3 rounded-xl text-xs max-w-[85%] ${
                                      rep.sender === 'user'
                                        ? 'bg-white/5 border border-white/5 ml-auto text-right text-zinc-300'
                                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 mr-auto text-left'
                                    }`}
                                  >
                                    <p>{rep.text}</p>
                                    <span className="text-[8px] text-zinc-500 block mt-1">
                                      {rep.sender === 'user' ? 'You' : 'Field Operator'} · {new Date(rep.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                              <input
                                type="text"
                                placeholder="Message Tourishq support..."
                                value={currentReply[activeTicket.id] || ''}
                                onChange={(e) => setCurrentReply({ ...currentReply, [activeTicket.id]: e.target.value })}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleReplySubmit(activeTicket.id);
                                }}
                                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleReplySubmit(activeTicket.id)}
                                className={`p-2.5 rounded-xl cursor-pointer text-black ${getAccentBg()}`}
                              >
                                <Send size={14} />
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })()
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-zinc-500">
                      <MessageSquare size={36} className="text-zinc-700 mb-2" />
                      <p className="text-xs font-semibold">Select an active ticket on the left rail</p>
                      <p className="text-[10px] mt-1">View dynamic chat updates and operator interventions.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
