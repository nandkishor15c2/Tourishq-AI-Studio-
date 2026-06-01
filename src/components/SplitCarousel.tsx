import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface SplitCarouselProps<T> {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  themeColor?: string; // e.g., 'text-accent', 'text-pink-400', etc.
}

export function SplitCarousel<T>({
  id,
  category,
  title,
  subtitle,
  description,
  items,
  renderItem,
  themeColor = 'text-accent',
}: SplitCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 340; // Approx card width + gap
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
      {/* LEFT SIDE: Promotional panel with titles, arrows, and tags */}
      <div className="lg:col-span-4 space-y-4 lg:pr-6">
        <div className="space-y-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 ${themeColor}`}>
            <Sparkles size={11} /> {category}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-serif leading-tight">
            {title}
          </h2>
          <p className="text-xs text-zinc-400 uppercase font-bold tracking-widest">
            {subtitle}
          </p>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed font-sans">
          {description}
        </p>

        {/* Dynamic scroll buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            aria-label="Scroll left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-zinc-950/40 hover:bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            aria-label="Scroll right"
          >
            <ArrowRight size={16} />
          </button>
          
          <span className="text-[11px] text-zinc-500 font-mono pl-2">
            {items.length} curated trails
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Smooth snap-fit carousel cards */}
      <div className="lg:col-span-8 relative">
        {/* Soft edge masking for smooth fadeouts */}
        <div className="absolute top-0 bottom-0 -left-4 w-4 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none hidden lg:block" />
        <div className="absolute top-0 bottom-0 -right-4 w-12 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none hidden lg:block" />

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-[280px] md:w-[320px] shrink-0 snap-start">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
