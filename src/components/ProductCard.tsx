import React from 'react';
import { Destination } from '../types';

const blurLayers = [3, 6, 9, 12, 14, 17];

const BlurGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[35%] group-hover:h-[60%] transition-all duration-500 ease-in-out">
        {blurLayers.map((blur, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </div>
  );
};

interface ProductCardProps {
  dest: Destination;
  onClick: () => void;
  rank?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ dest, onClick, rank }) => {
  // Map our database Destination type directly to the exact Travel Component's variables
  const name = dest.name;
  const destination = dest.country;
  const itins = dest.itineraries || dest.products?.[0]?.itinerary || [];
  const days = itins.length || 5;
  const nights = days > 1 ? days - 1 : 4;
  const tags = [dest.seasonRecommendation.toUpperCase(), dest.country];
  const price = dest.priceStart;
  const image = {
    url: dest.image,
    alt: dest.name
  };

  return (
    <div 
      onClick={onClick}
      className="relative w-full h-[350px] rounded-[20px] overflow-hidden group cursor-pointer flex-shrink-0 border border-white/10 shadow-xl"
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-110 origin-center">
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <BlurGradient />

      <div className="absolute inset-0 p-5 z-10 flex flex-col justify-between">
        <div className="absolute top-4 left-4">
          <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
            {tags[0]}
          </span>
        </div>

        {rank && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-black text-black bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg shadow-lg border border-amber-300">
              🏆 #{rank}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-black text-white drop-shadow-2xl leading-snug tracking-tight font-serif">
            {name}
          </h3>
          
          <div className="flex items-center gap-1 mt-1 text-white drop-shadow-3xl font-semibold text-[11px] uppercase tracking-wide">
            <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{destination}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-white drop-shadow-3xl font-semibold text-xs">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span>{days} Days</span>
            </div>
            <span className="text-[10px] opacity-50">/</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span>{nights} Nights</span>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-3 pt-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[9px] text-white/70 uppercase tracking-widest block leading-none">Starting at</span>
                <p className="text-base font-black text-white font-mono mt-1">${price}</p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="flex-1 py-2 text-xs font-bold text-black bg-white hover:bg-zinc-200 hover:scale-102 transition-all rounded-[10px] shadow-lg text-center cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
