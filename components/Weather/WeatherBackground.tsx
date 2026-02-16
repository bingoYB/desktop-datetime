import React from 'react';
import FogEffect from './Fog/FogEffect';
import RainEffect from './Rain/RainEffect';
import SnowEffect from './Snow/SnowEffect';
import { WeatherType as RainWeatherType } from './Rain/rain-utils';

export type WeatherCondition = 'fog' | 'dense-fog' | 'rain' | 'storm' | 'drizzle' | 'snow' | 'gentle-snow' | 'storm-snow' | 'clear' | 'none';

interface WeatherBackgroundProps {
  weather: WeatherCondition;
}

export default function WeatherBackground({ weather }: WeatherBackgroundProps) {
  // If Rain, RainEffect handles background because of webgl effects
  if (['rain', 'storm', 'drizzle'].includes(weather)) {
      let type: RainWeatherType = 'rain';
      if (weather === 'drizzle') type = 'drizzle';
      if (weather === 'storm') type = 'storm';
      
      return (
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: 1 }}>
             <RainEffect type={type} />
        </div>
      );
  }

  // If clear, return null
  if (weather === 'none' || weather === 'clear') {
    return null;
  }

  // For others, we render the background explicitly
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: 1}}>
        {/* Overlays */}
        {weather === 'fog' && <FogEffect type="light" />}
        {weather === 'dense-fog' && <FogEffect type="dense" />}
        {(weather === 'snow' || weather === 'gentle-snow') && <SnowEffect type="gentle" />}
        {weather === 'storm-snow' && <SnowEffect type="storm" />}
    </div>
  );
}
