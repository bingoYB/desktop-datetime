"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CloudOff, Cloud, Maximize2, Minimize2, Settings2 } from "lucide-react"
import { CalendarPanel } from "@/components/CalendarPanel"
import { ClockPanel } from "@/components/ClockPanel"
import { SettingsModal } from "@/components/SettingsModal"
import { WeatherPanel } from "@/components/WeatherPanel"
import { useCalendar } from "@/hooks/useCalendar"
import { useClock } from "@/hooks/useClock"
import { useWeather } from "@/hooks/useWeather"
import { cn } from "@/lib/utils"
import WeatherBackground, { WeatherCondition } from "@/components/Weather/WeatherBackground"

export function DesktopCalendarClock() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [showWeatherBg, setShowWeatherBg] = useState(true)
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clock = useClock()
  const { calendars, leadingEmptyCount, monthTitle, todayInfo } = useCalendar(clock.now)
  const { weather, loading, hasLocation } = useWeather([clock.date])
  const calendarMonthKey = `${clock.year}-${clock.month}`

  const weatherCondition = useMemo<WeatherCondition>(() => {
    if (!weather?.today?.icon) return 'none';
    const icon = parseInt(weather.today.icon, 10);

    console.log(icon);
    
    // QWeather Icons mapping
    if (icon >= 300 && icon < 400) {
       if (icon >= 302 && icon <= 304) return 'storm';
       return 'rain';
    }
    if (icon >= 400 && icon < 500) {
       if (icon === 400 || icon === 408) return 'gentle-snow';
       return 'snow';
    }
    if (icon >= 500 && icon <= 515) {
       return 'fog'; // 501 is dense fog but generic fog is fine
    }
    return 'none';
  }, [weather]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        return
      }

      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Failed to toggle fullscreen", error)
    }
  }, [])

  const handleScreenClick = useCallback(() => {
    setShowControls(prev => {
      const next = !prev
      // Auto-hide after 5 seconds
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
        controlsTimerRef.current = null
      }
      if (next) {
        controlsTimerRef.current = setTimeout(() => {
          setShowControls(false)
          controlsTimerRef.current = null
        }, 5000)
      }
      return next
    })
  }, [])

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        className={cn(
          "relative min-h-screen overflow-x-hidden overflow-y-auto transition-colors duration-500 lg:h-screen lg:overflow-hidden",
          isDarkTheme ? "bg-[#040712] text-slate-100" : "bg-[#f5efe1] text-slate-900"
        )}
        onClick={handleScreenClick}
      >
        {showWeatherBg && <WeatherBackground weather={weatherCondition} />}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-20 left-[-12%] h-72 w-72 rounded-full blur-3xl",
            isDarkTheme ? "bg-cyan-400/20" : "bg-amber-300/45"
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-[-18%] right-[-8%] h-96 w-96 rounded-full blur-3xl",
            isDarkTheme ? "bg-indigo-500/25" : "bg-orange-300/45"
          )}
        />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1680px] flex-col p-3 sm:p-4 md:p-6 lg:h-screen">
          <header
            className={cn(
              "absolute right-3 top-3 z-20 flex gap-2 transition-all duration-300 sm:right-4 sm:top-4 md:right-6 md:top-6",
              showControls ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                isDarkTheme
                  ? "border-slate-700/70 bg-slate-900/80 hover:bg-slate-800"
                  : "border-amber-200 bg-white/80 hover:bg-white"
              )}
              onClick={() => setShowWeatherBg(prev => !prev)}
              aria-label={showWeatherBg ? "关闭天气背景" : "开启天气背景"}
              title={showWeatherBg ? "关闭天气背景" : "开启天气背景"}
            >
              {showWeatherBg ? <Cloud className="h-5 w-5" /> : <CloudOff className="h-5 w-5" />}
            </button>

            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                isDarkTheme
                  ? "border-slate-700/70 bg-slate-900/80 hover:bg-slate-800"
                  : "border-amber-200 bg-white/80 hover:bg-white"
              )}
              onClick={() => setIsSettingsOpen(true)}
              aria-label="打开设置"
            >
              <Settings2 className="h-5 w-5" />
            </button>

            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                isDarkTheme
                  ? "border-slate-700/70 bg-slate-900/80 hover:bg-slate-800"
                  : "border-amber-200 bg-white/80 hover:bg-white"
              )}
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "退出全屏" : "进入全屏"}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </header>

          <main className="grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            <CalendarPanel
              key={calendarMonthKey}
              monthTitle={monthTitle}
              calendars={calendars}
              leadingEmptyCount={leadingEmptyCount}
              currentDay={clock.date}
              todayInfo={todayInfo}
              isDarkTheme={isDarkTheme}
            />

            <section className="grid gap-4 lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)]">
              <ClockPanel clock={clock} isDarkTheme={isDarkTheme} />
              <WeatherPanel
                weather={weather ?? null}
                loading={loading}
                hasLocation={hasLocation}
                isDarkTheme={isDarkTheme}
              />
            </section>
          </main>
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />
    </>
  )
}
