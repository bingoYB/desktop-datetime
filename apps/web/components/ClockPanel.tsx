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
        "rounded-3xl border px-4 py-5 shadow-2xl backdrop-blur-xl sm:px-5 sm:py-6 md:px-6",
        isDarkTheme
          ? "border-slate-700/70 bg-slate-900/75"
          : "border-amber-200/80 bg-white/85"
      )}
    >
      <p
        className={cn(
          "text-xs tracking-[0.2em]",
          isDarkTheme ? "text-slate-400" : "text-slate-500"
        )}
      >
        TIME
      </p>
      <h2 className="mt-2 text-base font-semibold sm:text-xl md:text-2xl">
        {clock.year}年{clock.month}月{clock.date}日 {WEEK_DAYS_FULL[clock.day]}
      </h2>

      <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <p
          className="font-[var(--font-digits)] text-4xl font-semibold leading-none tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
          aria-live="polite"
        >
          {clock.hours}:{clock.minutes}:{clock.seconds}
        </p>
        <p
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium",
            isDarkTheme
              ? "bg-slate-700/70 text-slate-100"
              : "bg-amber-100 text-amber-700"
          )}
        >
          {getPeriod(clock.hour24)}
        </p>
      </div>
    </section>
  )
}
