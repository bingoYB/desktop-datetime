"use client";

import React, { useState } from 'react';
import WeatherBackground, { WeatherCondition } from '@/components/Weather/WeatherBackground';
import { cn } from '@/lib/utils';
import { CloudRain, CloudSnow, CloudFog, Sun, Zap, CloudDrizzle } from 'lucide-react';

const weatherOptions: { type: WeatherCondition; label: string; icon: React.ReactNode }[] = [
  { type: 'clear', label: 'Clear', icon: <Sun className="w-4 h-4" /> },
  { type: 'rain', label: 'Rain', icon: <CloudRain className="w-4 h-4" /> },
  { type: 'drizzle', label: 'Drizzle', icon: <CloudDrizzle className="w-4 h-4" /> },
  { type: 'storm', label: 'Storm', icon: <Zap className="w-4 h-4" /> },
  { type: 'snow', label: 'Snow', icon: <CloudSnow className="w-4 h-4" /> },
  { type: 'gentle-snow', label: 'Gentle Snow', icon: <CloudSnow className="w-4 h-4" /> },
  { type: 'storm-snow', label: 'Snow Storm', icon: <CloudSnow className="w-4 h-4" /> },
  { type: 'fog', label: 'Fog', icon: <CloudFog className="w-4 h-4" /> },
  { type: 'dense-fog', label: 'Dense Fog', icon: <CloudFog className="w-4 h-4" /> },
];

export default function WeatherDemoPage() {
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>('rain');
  const [showUI, setShowUI] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-slate-100">
      {/* Background Layer */}
      <div className="absolute inset-0 z-[-2] bg-slate-900">
         {/* Fallback background color/image if needed */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519681393798-38e43269d877?q=80&w=3870&auto=format&fit=crop)' }}
         />
      </div>
      <WeatherBackground weather={currentWeather} />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
        <div className="pointer-events-auto transition-opacity duration-500" style={{ opacity: showUI ? 1 : 0 }}>
            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg tracking-tighter">
              {currentWeather.charAt(0).toUpperCase() + currentWeather.slice(1).replace('-', ' ')}
            </h1>
            <p className="text-xl opacity-80 mb-12 text-center max-w-lg drop-shadow-md">
              Experience the immersive weather effects. Select a mode below to change the atmosphere.
            </p>
        </div>
      </div>

      {/* Control Panel */}
      <div className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-auto",
        showUI ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      )}>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center gap-1 shadow-2xl">
          {weatherOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setCurrentWeather(option.type)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                currentWeather === option.type 
                  ? "bg-white text-black shadow-lg scale-105" 
                  : "hover:bg-white/10 text-white/70 hover:text-white"
              )}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle UI Button */}
      <button 
        onClick={() => setShowUI(!showUI)}
        className="fixed top-4 right-4 z-50 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white/50 hover:text-white p-2 rounded-full transition-colors text-xs uppercase tracking-widest font-bold pointer-events-auto"
      >
        {showUI ? 'Hide UI' : 'Show UI'}
      </button>

    </div>
  );
}
