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
        "rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-7 lg:p-4.5 xl:p-7 2xl:p-8 shadow-xl backdrop-blur-xl shrink-0 transition-colors duration-300",
        isDarkTheme
          ? "border-slate-700/60 bg-slate-900/75 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          : "border-amber-200/70 bg-white/85 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-6 lg:gap-3 xl:gap-8">
        {/* 左侧：日期与星期信息 */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
            <span
              className={cn(
                "text-[11px] sm:text-xs md:text-sm lg:text-xs xl:text-sm tracking-[0.25em] font-bold uppercase",
                isDarkTheme ? "text-slate-400" : "text-slate-500"
              )}
            >
              TIME
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm lg:text-xs xl:text-sm font-bold shadow-xs",
                isDarkTheme
                  ? "bg-slate-800/95 border border-slate-700/80 text-cyan-300 shadow-cyan-950/30"
                  : "bg-amber-100 border border-amber-200 text-amber-900 shadow-amber-950/10"
              )}
            >
              {getPeriod(clock.hour24)}
            </span>
          </div>

          <h2
            className={cn(
              "text-xl sm:text-2xl md:text-3xl lg:text-lg xl:text-3xl 2xl:text-4xl font-black tracking-tight truncate  mb-0",
              isDarkTheme ? "text-slate-100" : "text-slate-900"
            )}
          >
            {clock.year}年{clock.month}月{clock.date}日
          </h2>

          <p
            className={cn(
              "mt-0 text-sm sm:text-base md:text-md lg:text-md xl:text-base 2xl:text-lg font-bold tracking-wide",
              isDarkTheme ? "text-slate-400" : "text-slate-600"
            )}
          >
            {WEEK_DAYS_FULL[clock.day]}
          </p>
        </div>

        {/* 右侧：超大显眼时间数字（远距离清晰可读） */}
        <div className="shrink-0 flex sm:justify-end">
          <p
            className={cn(
              "font-[var(--font-digits)] font-black leading-none tracking-tight tabular-nums whitespace-nowrap",
              "text-5xl sm:text-6xl md:text-7xl lg:text-[3.5rem] xl:text-6xl 2xl:text-7xl 3xl:text-8xl",
              isDarkTheme
                ? "text-slate-100 drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
                : "text-slate-900 drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            )}
            aria-live="polite"
          >
            {clock.hours}:{clock.minutes}:{clock.seconds}
          </p>
        </div>
      </div>
    </section>
  )
}
