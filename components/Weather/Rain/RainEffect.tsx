"use client";
import React, { useEffect, useRef } from 'react';
import RainRenderer from "./RainRenderer";
import Raindrops from "./Raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import { weatherData, WeatherType, WeatherData } from './rain-utils';

interface RainEffectProps {
  type?: WeatherType;
}

const DropColorSrc = "/weather/rain/drop-color.png";
const DropAlphaSrc = "/weather/rain/drop-alpha.png";
const BackgroundSrc = "/background.jpeg";

export default function RainEffect({ type = 'rain' }: RainEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const rendererRef = useRef<RainRenderer | null>(null);
  const raindropsRef = useRef<Raindrops | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let textureFg: HTMLCanvasElement;
    let textureFgCtx: CanvasRenderingContext2D;
    let textureBg: HTMLCanvasElement;
    let textureBgCtx: CanvasRenderingContext2D;
    
    let dropAlpha: HTMLImageElement;
    let dropColor: HTMLImageElement;
    let background: HTMLImageElement;

    const textureFgSize = {
      width: 512,
      height: 512
    };
    const textureBgSize = {
      width: 512,
      height: 512
    };

    const loadTextures = () => {
      return loadImages([
        { name: "dropAlpha", src: DropAlphaSrc },
        { name: "dropColor", src: DropColorSrc },
        { name: "background", src: BackgroundSrc },
      ]).then((images) => {
        dropColor = images.dropColor.img;
        dropAlpha = images.dropAlpha.img;
        background = images.background.img;
      });
    };

    const init = () => {
       if (!canvas || !container) return;

       const dpi = window.devicePixelRatio || 1;
       const rect = container.getBoundingClientRect();

       canvas.width = rect.width * dpi;
       canvas.height = rect.height * dpi;
       canvas.style.width = `${rect.width}px`;
       canvas.style.height = `${rect.height}px`;

       const raindrops = new Raindrops(
         canvas.width,
         canvas.height,
         dpi,
         dropAlpha,
         dropColor,
         {
           trailRate: 1,
           trailScaleRange: [0.2, 0.45],
           collisionRadius: 0.45,
           dropletsCleaningRadiusMultiplier: 0.28,
         }
       );
       raindropsRef.current = raindrops;

       textureFg = createCanvas(textureFgSize.width, textureFgSize.height)!;
       textureFgCtx = textureFg.getContext('2d')!;
       textureBg = createCanvas(textureBgSize.width, textureBgSize.height)!;
       textureBgCtx = textureBg.getContext('2d')!;

       generateTextures();

       const renderer = new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg, null, {
         brightness: 1.04,
         alphaMultiply: 16,
         alphaSubtract: 4,
         minRefraction: 128,
       });
       rendererRef.current = renderer;

       setupWeather();
       console.log('Rain initialized successfully');
    };

    const setupWeather = () => {
       const curWeatherData = { ...weatherData[type] };
       console.log('Setting up weather:', type, curWeatherData);
       
       if (type === 'storm' || type === 'fallout') {
         setupLightningFlicker(curWeatherData);
       } else {
           if (intervalRef.current) clearInterval(intervalRef.current);
       }
       
       if (raindropsRef.current) {
         raindropsRef.current.options = { ...raindropsRef.current.options, ...curWeatherData };
         raindropsRef.current.clearDrops();
       }
    };
    
    const setupLightningFlicker = (data: WeatherData) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const minInterval = 1000;
        const maxInterval = 5000;
        const flashChance = typeof data.flashChance === 'number' ? data.flashChance : 0;
        const interval = minInterval + (maxInterval - minInterval) * (1 - flashChance);
        
        intervalRef.current = setInterval(() => {
            const renderer = rendererRef.current;
            if (renderer && renderer.gl && renderer.programWater) { // check programWater
                 const flicker = Math.random() * 2.0;
                 renderer.gl.useProgram(renderer.programWater);
                 renderer.gl.createUniform("1f", "lightningFlash", flicker);
                 setTimeout(() => {
                     if (renderer.gl && renderer.programWater) {
                        renderer.gl.useProgram(renderer.programWater);
                        renderer.gl.createUniform("1f", "lightningFlash", 0.0);
                     }
                 }, 100 + Math.random() * 200);
            }
        }, interval);
    };

    const generateTextures = () => {
      if (!background) return;
      
      // Draw the loaded background image to both textures
      textureBgCtx.drawImage(background, 0, 0, textureBgSize.width, textureBgSize.height);
      textureFgCtx.drawImage(background, 0, 0, textureFgSize.width, textureFgSize.height);
    };

    loadTextures().then(() => {
        console.log('Textures loaded successfully');
        init();
    }).catch(error => {
        console.error('Failed to load textures for rain effect:', error);
    });

    // Cleanup
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (rendererRef.current) rendererRef.current.destroy();
        if (raindropsRef.current) raindropsRef.current.destroy();
    };
  }, [type]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Canvas is sized by JS */}
      <canvas ref={canvasRef} id="container-weather" /> 
    </div>
  );
}
