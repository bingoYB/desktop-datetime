"use client"

import React, { useMemo } from "react"
import type { WeatherScene } from "@/components/WeatherPanel"
import "./WeatherEffects.css"

interface WeatherEffectsProps {
  scene: WeatherScene
  isDarkTheme: boolean
}

/* ---- helpers ---- */
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}



/* ==================== Individual Effect Renderers ==================== */

function RainEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const drops = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${rand(2, 98)}%`,
      height: `${rand(18, 40)}px`,
      duration: `${rand(0.5, 1.1)}s`,
      delay: `${rand(0, 1.5)}s`,
      opacity: rand(0.3, 0.8),
    }))
  }, [])

  const splashes = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${rand(8, 92)}%`,
      duration: `${rand(0.5, 1.0)}s`,
      delay: `${rand(0, 2)}s`,
    }))
  }, [])

  const color = isDarkTheme
    ? "rgba(174,214,255,0.5)"
    : "rgba(120,170,230,0.45)"

  return (
    <>
      {drops.map((d) => (
        <div
          key={d.id}
          className="weather-rain-drop"
          style={{
            left: d.left,
            top: "-20px",
            height: d.height,
            opacity: d.opacity,
            animationDuration: d.duration,
            animationDelay: d.delay,
            background: `linear-gradient(to bottom, transparent, ${color}, ${color.replace(/[\d.]+\)$/, "0.9)")})`,
          }}
        />
      ))}
      {splashes.map((s) => (
        <div
          key={`splash-${s.id}`}
          className="weather-rain-splash"
          style={{
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </>
  )
}

function SnowEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const flakes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${rand(0, 100)}%`,
      size: rand(2, 7),
      duration: `${rand(3, 8)}s`,
      delay: `${rand(0, 5)}s`,
      opacity: rand(0.4, 0.95),
    }))
  }, [])

  return (
    <>
      {flakes.map((f) => (
        <div
          key={f.id}
          className="weather-snow-flake"
          style={{
            left: f.left,
            top: "-10px",
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: f.duration,
            animationDelay: f.delay,
            background: isDarkTheme
              ? `radial-gradient(circle, rgba(255,255,255,0.95), rgba(220,235,255,0.5), transparent)`
              : `radial-gradient(circle, rgba(255,255,255,0.9), rgba(200,215,240,0.5), transparent)`,
          }}
        />
      ))}
    </>
  )
}

function SunnyEffect() {
  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      top: `${rand(8, 70)}%`,
      right: `${rand(5, 60)}%`,
      dx: `${rand(-30, 30)}px`,
      dy: `${rand(-30, 30)}px`,
      duration: `${rand(4, 9)}s`,
      delay: `${rand(0, 5)}s`,
      size: rand(2, 5),
      opacity: rand(0.25, 0.65),
    }))
  }, [])

  const rays = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: i * 30,
      length: rand(45, 75),
      width: rand(1.5, 3),
      opacity: rand(0.15, 0.4),
      delay: `${rand(0, 3)}s`,
    }))
  }, [])

  return (
    <>
      {/* Blue sky gradient wash — base layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(175deg, rgba(100,180,255,0.18) 0%, rgba(135,200,255,0.12) 35%, rgba(160,210,255,0.06) 60%, transparent 85%)",
          pointerEvents: "none",
        }}
      />

      {/* Sky-blue ambient glow — top area */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "80%",
          height: "60%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(120,190,255,0.15) 0%, rgba(100,175,255,0.06) 45%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* Sun outer halo — large warm glow */}
      <div
        className="weather-sun-glow"
        style={{
          position: "absolute",
          top: "-22%",
          right: "-12%",
          width: "65%",
          height: "80%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,225,130,0.4) 0%, rgba(255,200,90,0.18) 30%, rgba(255,180,60,0.06) 55%, transparent 75%)",
          animation: "sun-pulse 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Sun core — bright golden disc */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          right: "8%",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,240,180,0.95) 0%, rgba(255,220,120,0.7) 40%, rgba(255,200,80,0.3) 65%, transparent 85%)",
          boxShadow:
            "0 0 18px 6px rgba(255,220,120,0.35), 0 0 40px 15px rgba(255,200,80,0.15)",
          animation: "sun-core-pulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Sun rays — radiating lines from the sun core */}
      <div
        style={{
          position: "absolute",
          top: "calc(6% + 21px)",
          right: "calc(8% + 21px)",
          width: "0",
          height: "0",
          animation: "sun-rotate 40s linear infinite",
          pointerEvents: "none",
        }}
      >
        {rays.map((r) => (
          <div
            key={r.id}
            className="weather-sun-ray-line"
            style={{
              position: "absolute",
              top: "0",
              left: "-1px",
              width: `${r.width}px`,
              height: `${r.length}px`,
              transformOrigin: "center top",
              transform: `rotate(${r.angle}deg)`,
              opacity: r.opacity,
              background: `linear-gradient(to bottom, rgba(255,225,140,0.7), rgba(255,210,100,0.15), transparent)`,
              borderRadius: "1px",
              animationDelay: r.delay,
            }}
          />
        ))}
      </div>

      {/* Warm transition — subtle gradient from sun area */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, transparent 40%, rgba(255,230,160,0.06) 65%, rgba(255,210,120,0.1) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating light motes */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="weather-sun-particle"
          style={{
            top: p.top,
            right: p.right,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            ["--dx" as string]: p.dx,
            ["--dy" as string]: p.dy,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
          }}
        />
      ))}
    </>
  )
}

function ClearNightEffect() {
  const stars = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${rand(3, 97)}%`,
      top: `${rand(5, 85)}%`,
      size: rand(1, 3.5),
      duration: `${rand(2, 5)}s`,
      delay: `${rand(0, 4)}s`,
      minOpacity: rand(0.15, 0.3),
      maxOpacity: rand(0.6, 1),
    }))
  }, [])

  const shootingStar = useMemo(
    () => ({
      top: `${rand(10, 35)}%`,
      left: `${rand(10, 50)}%`,
      delay: `${rand(4, 10)}s`,
    }),
    []
  )

  return (
    <>
      {/* Moon glow */}
      <div className="weather-moon-glow" />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="weather-star"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--duration" as string]: s.duration,
            ["--delay" as string]: s.delay,
            ["--star-min-opacity" as string]: s.minOpacity,
            ["--star-max-opacity" as string]: s.maxOpacity,
          }}
        />
      ))}

      {/* Shooting star (occasional) */}
      <div
        className="weather-shooting-star"
        style={{
          top: shootingStar.top,
          left: shootingStar.left,
          ["--delay" as string]: shootingStar.delay,
        }}
      />
    </>
  )
}

function CloudyEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const clouds = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const y = rand(10, 70)
      const size = rand(60, 120)
      return {
        id: i,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size * 0.5}px`,
        start: `${rand(-30, 0)}%`,
        end: `${rand(100, 130)}%`,
        duration: `${rand(18, 35)}s`,
        delay: `${rand(0, 12)}s`,
        opacity: rand(0.15, 0.35),
        color: isDarkTheme
          ? `rgba(150,165,190,${rand(0.12, 0.28)})`
          : `rgba(200,210,230,${rand(0.25, 0.5)})`,
      }
    })
  }, [isDarkTheme])

  return (
    <>
      {clouds.map((c) => (
        <div
          key={c.id}
          className="weather-cloud"
          style={{
            top: c.top,
            width: c.width,
            height: c.height,
            opacity: c.opacity,
            background: `radial-gradient(ellipse, ${c.color}, transparent 70%)`,
            filter: "blur(10px)",
            ["--cloud-start" as string]: c.start,
            ["--cloud-end" as string]: c.end,
            ["--duration" as string]: c.duration,
            ["--delay" as string]: c.delay,
          }}
        />
      ))}
    </>
  )
}

function PartlyCloudyEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const clouds = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${20 + i * 22}%`,
      right: `${10 + i * 15}%`,
      width: `${rand(50, 90)}px`,
      height: `${rand(25, 45)}px`,
      duration: `${rand(8, 15)}s`,
      delay: `${rand(0, 5)}s`,
      opacity: rand(0.2, 0.4),
      color: isDarkTheme
        ? `rgba(140,160,190,${rand(0.15, 0.3)})`
        : `rgba(200,215,240,${rand(0.35, 0.6)})`,
    }))
  }, [isDarkTheme])

  return (
    <>
      {/* Soft sun glow peeking through — smaller and subtler than sunny */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "55%",
          height: "70%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,220,130,0.3) 0%, rgba(255,200,90,0.12) 40%, transparent 70%)",
          animation: "sun-pulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {clouds.map((c) => (
        <div
          key={c.id}
          className="weather-partial-cloud"
          style={{
            top: c.top,
            right: c.right,
            width: c.width,
            height: c.height,
            opacity: c.opacity,
            background: `radial-gradient(ellipse, ${c.color}, transparent 70%)`,
            ["--duration" as string]: c.duration,
            ["--delay" as string]: c.delay,
          }}
        />
      ))}
    </>
  )
}

function ThunderEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const flashes = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      duration: `${rand(4, 9)}s`,
      delay: `${rand(0, 6)}s`,
    }))
  }, [])

  return (
    <>
      {/* Rain drops (fewer, heavier) */}
      <RainEffect isDarkTheme={isDarkTheme} />

      {/* Lightning flashes */}
      {flashes.map((f) => (
        <div
          key={f.id}
          className="weather-lightning-flash"
          style={{
            ["--duration" as string]: f.duration,
            ["--delay" as string]: f.delay,
          }}
        />
      ))}

      {/* Ambient lightning glow */}
      <div className="weather-lightning-ambient" />

      {/* Lightning bolt shape */}
      <svg
        className="weather-lightning-bolt"
        style={{
          top: "5%",
          left: "30%",
          width: "20px",
          height: "50px",
          opacity: 0,
          animation: "lightning-flash 7s ease-out infinite 2s",
        }}
        viewBox="0 0 24 60"
        fill="none"
      >
        <path
          d="M14 0L6 25h6L8 60l14-35h-7L22 0z"
          fill="rgba(255,255,200,0.7)"
        />
      </svg>
    </>
  )
}

function FogEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const layers = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: `${15 + i * 15}%`,
      height: `${rand(30, 60)}px`,
      fogStart: `${rand(-15, 5)}%`,
      fogEnd: `${rand(5, 15)}%`,
      fogScale: rand(1, 1.5),
      fogOpacity: rand(0.15, 0.35),
      duration: `${rand(8, 18)}s`,
      delay: `${rand(0, 8)}s`,
      color: isDarkTheme
        ? `rgba(140,155,180,${rand(0.15, 0.3)})`
        : `rgba(200,210,225,${rand(0.3, 0.55)})`,
    }))
  }, [isDarkTheme])

  return (
    <>
      {layers.map((l) => (
        <div
          key={l.id}
          className="weather-fog-layer"
          style={{
            top: l.top,
            height: l.height,
            ["--fog-start" as string]: l.fogStart,
            ["--fog-end" as string]: l.fogEnd,
            ["--fog-scale" as string]: l.fogScale,
            ["--fog-opacity" as string]: l.fogOpacity,
            ["--fog-color" as string]: l.color,
            ["--duration" as string]: l.duration,
            ["--delay" as string]: l.delay,
          }}
        />
      ))}
    </>
  )
}

function WindEffect({ isDarkTheme }: { isDarkTheme: boolean }) {
  const streaks = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${rand(10, 85)}%`,
      width: `${rand(40, 100)}px`,
      duration: `${rand(1.5, 3.5)}s`,
      delay: `${rand(0, 3)}s`,
      opacity: rand(0.2, 0.5),
      color: isDarkTheme
        ? `rgba(180,210,240,${rand(0.2, 0.45)})`
        : `rgba(150,190,230,${rand(0.25, 0.5)})`,
    }))
  }, [isDarkTheme])

  const particles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      top: `${rand(10, 90)}%`,
      left: `${rand(0, 30)}%`,
      dy: `${rand(-15, 15)}px`,
      duration: `${rand(2, 4)}s`,
      delay: `${rand(0, 3)}s`,
    }))
  }, [])

  return (
    <>
      {streaks.map((s) => (
        <div
          key={s.id}
          className="weather-wind-streak"
          style={{
            top: s.top,
            left: "-10%",
            width: s.width,
            ["--wind-color" as string]: s.color,
            ["--wind-opacity" as string]: s.opacity,
            ["--duration" as string]: s.duration,
            ["--delay" as string]: s.delay,
          }}
        />
      ))}
      {particles.map((p) => (
        <div
          key={`wp-${p.id}`}
          className="weather-wind-particle"
          style={{
            top: p.top,
            left: p.left,
            ["--wind-dy" as string]: p.dy,
            ["--duration" as string]: p.duration,
            ["--delay" as string]: p.delay,
          }}
        />
      ))}
    </>
  )
}

/* ==================== Main Component ==================== */

export default function WeatherEffects({
  scene,
  isDarkTheme,
}: WeatherEffectsProps) {
  const effectMap: Record<WeatherScene, React.ReactNode> = {
    sunny: <SunnyEffect />,
    clearNight: <ClearNightEffect />,
    partlyCloudy: <PartlyCloudyEffect isDarkTheme={isDarkTheme} />,
    cloudy: <CloudyEffect isDarkTheme={isDarkTheme} />,
    rain: <RainEffect isDarkTheme={isDarkTheme} />,
    snow: <SnowEffect isDarkTheme={isDarkTheme} />,
    thunder: <ThunderEffect isDarkTheme={isDarkTheme} />,
    fog: <FogEffect isDarkTheme={isDarkTheme} />,
    wind: <WindEffect isDarkTheme={isDarkTheme} />,
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {effectMap[scene]}
    </div>
  )
}
