import React from 'react';
import { Destination } from '../types';
import { ArrowRight, MapPin } from 'lucide-react';

interface DestinationCardProps {
  dest: Destination;
  onClick: () => void;
  rank?: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ dest, onClick, rank }) => {
  return (
    <div 
      onClick={onClick}
      className="relative w-[300px] md:w-[350px] aspect-[4/3] rounded-[24px] overflow-hidden group cursor-pointer flex-shrink-0 border border-white/10 shadow-xl"
    >
      {/* Background Image */}
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
      />

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Optional Top Rank Badge */}
      {rank && (
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center z-20">
          <span className="text-white text-xs font-bold font-mono">#{rank}</span>
        </div>
      )}

      {/* Glassmorphic Top Badge (Optional details) */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
        <MapPin className="w-3 h-3 text-amber-400" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{dest.country}</span>
      </div>

      {/* Content Area */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end z-20">
        <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400/90 mb-1.5 block">
              {dest.seasonRecommendation} Escape
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight drop-shadow-lg">
              {dest.name}
            </h3>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-300 shadow-lg">
            <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
          </div>
        </div>
        
        {/* Subtle detail text that reveals on hover */}
        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-500 mt-3">
          <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
            {dest.description || "Discover breathtaking landscapes, curated luxury, and unforgettable AI-powered experiences."}
          </p>
        </div>
      </div>
    </div>
  );
};
