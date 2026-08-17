'use client'

import { cn } from "@/lib/utils"
import type { ClockState } from "@/hooks/useClock"

const WEEK_DAYS_FULL = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
]

function getPeriod(hour24: number): string {
  if (hour24 < 6) return "凌晨"
  if (hour24 < 12) return "上午"
  if (hour24 < 18) return "下午"
  return "晚上"
}

interface ClockPanelProps {
  clock: ClockState
  isDarkTheme: boolean
}

export function ClockPanel({ clock, isDarkTheme }: ClockPanelProps) {
  return (
    <section
      className={cn(
        "rounded-2xl sm:rounded-3xl border p-3.5 sm:p-4 md:p-5 lg:p-4 xl:p-5 shadow-xl backdrop-blur-xl shrink-0 transition-colors duration-300",
        isDarkTheme
          ? "border-slate-700/60 bg-slate-900/75 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          : "border-amber-200/70 bg-white/85 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-[10px] sm:text-xs tracking-[0.2em] font-semibold uppercase",
            isDarkTheme ? "text-slate-400" : "text-slate-500"
          )}
        >
          TIME
        </p>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            isDarkTheme
              ? "bg-slate-800 border border-slate-700/80 text-slate-300"
              : "bg-amber-100/80 border border-amber-200 text-amber-800"
          )}
          suppressHydrationWarning
        >
          {getPeriod(clock.hour24)}
        </span>
      </div>

      <h2
        className="mt-1 text-sm sm:text-base md:text-lg lg:text-sm xl:text-lg font-semibold tracking-tight"
        suppressHydrationWarning
      >
        {clock.year}年{clock.month}月{clock.date}日 {WEEK_DAYS_FULL[clock.day]}
      </h2>

      <div className="mt-2 sm:mt-3 flex items-baseline justify-between gap-2">
        <p
          className="font-[var(--font-digits)] text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-bold leading-none tracking-tight tabular-nums"
          aria-live="polite"
          suppressHydrationWarning
        >
          {clock.hours}:{clock.minutes}:{clock.seconds}
        </p>
      </div>
    </section>
  )
}

