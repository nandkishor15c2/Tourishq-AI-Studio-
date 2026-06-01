/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SeasonType } from '../types';

interface SeasonalOverlayProps {
  season: SeasonType;
}

export const SeasonalOverlay: React.FC<SeasonalOverlayProps> = ({ season }) => {
  // Generate random items for falling effects with lightweight, 60fps-safe inline layouts
  const itemCounts = 15;
  const items = Array.from({ length: itemCounts }, (_, i) => ({
    id: i,
    delay: `${(i * 0.4).toFixed(1)}s`,
    left: `${(i * 7) % 95}%`,
    duration: `${6 + (i % 5)}s`,
    scale: 0.5 + ((i % 3) * 0.25),
  }));

  switch (season) {
    case 'monsoon':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Ambient Blue-Green Radial Mist */}
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px] mix-blend-screen" />
          
          {/* Premium rain droplets */}
          <div className="absolute inset-0">
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute bg-gradient-to-b from-teal-300 to-transparent w-[1.5px] h-9 opacity-40 rounded-full animate-rain-1"
                style={{
                  left: item.left,
                  top: '-50px',
                  animationDelay: item.delay,
                  animationDuration: '1.4s',
                  transform: `scaleY(${item.scale})`,
                }}
              />
            ))}
            {items.slice(0, 8).map((item) => (
              <div
                key={`sub-${item.id}`}
                className="absolute bg-gradient-to-b from-cyan-400 to-transparent w-[1px] h-6 opacity-30 rounded-full animate-rain-2"
                style={{
                  left: `${(parseFloat(item.left) + 4) % 100}%`,
                  top: '-50px',
                  animationDelay: `${parseFloat(item.delay) + 0.3}s`,
                  animationDuration: '1.9s',
                }}
              />
            ))}
          </div>
        </div>
      );

    case 'spring':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Sakura Pastel Blossom Radial Glow */}
          <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[100px] mix-blend-screen" />
          
          {/* Blossom petals falling */}
          <div className="absolute inset-0">
            {items.map((item) => (
              <svg
                key={item.id}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute text-pink-400/40 w-4 h-4 animate-petal-1 select-none"
                style={{
                  left: item.left,
                  top: '-30px',
                  animationDelay: item.delay,
                  animationDuration: `${parseFloat(item.duration) + 1}s`,
                  transform: `scale(${item.scale})`,
                }}
              >
                {/* Custom petal spline path */}
                <path d="M12,21C12,21 4,14 4,10C4,6 8,4 12,8C16,4 20,6 20,10C20,14 12,21 12,21Z" />
              </svg>
            ))}
          </div>
        </div>
      );

    case 'winter':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Frosted Deep Blue-Steel Radial Gloom */}
          <div className="absolute top-10 left-10 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[160px] mix-blend-screen" />
          <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
          
          {/* Drifting Snowflake stars */}
          <div className="absolute inset-0">
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute text-white font-mono opacity-40 select-none animate-snow-1"
                style={{
                  left: item.left,
                  top: '-35px',
                  fontSize: `${10 * item.scale}px`,
                  animationDelay: item.delay,
                  animationDuration: `${parseFloat(item.duration) - 2}s`,
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </div>
      );

    case 'summer':
    default:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Dynamic Golden Sunset Flares */}
          <div className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-500/15 to-orange-600/5 blur-[160px] mix-blend-screen animate-sunbeam" />
          <div className="absolute bottom-0 left-10 w-[550px] h-[550px] rounded-full bg-rose-500/5 blur-[140px] mix-blend-screen" />
          
          {/* Subtle warm sparks drifting upward */}
          <div className="absolute inset-0">
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute bg-amber-400/25 rounded-full blur-[1px]"
                style={{
                  left: item.left,
                  top: `${80 - (parseInt(item.left) % 65)}%`,
                  width: `${3 * item.scale}px`,
                  height: `${3 * item.scale}px`,
                  boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)',
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
        </div>
      );
  }
};
