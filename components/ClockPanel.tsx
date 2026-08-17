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
        "rounded-2xl sm:rounded-3xl border p-3.5 sm:p-5 md:p-6 lg:p-4 xl:p-6 shadow-xl backdrop-blur-xl shrink-0 transition-colors duration-300",
        isDarkTheme
          ? "border-slate-700/60 bg-slate-900/75 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          : "border-amber-200/70 bg-white/85 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 lg:gap-2.5 xl:gap-6">
        {/* 左侧：日期与星期信息 */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
            <span
              className={cn(
                "text-[10px] sm:text-xs tracking-[0.2em] font-semibold uppercase",
                isDarkTheme ? "text-slate-400" : "text-slate-500"
              )}
            >
              TIME
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold",
                isDarkTheme
                  ? "bg-slate-800/90 border border-slate-700/80 text-cyan-300"
                  : "bg-amber-100/90 border border-amber-200 text-amber-900"
              )}
            >
              {getPeriod(clock.hour24)}
            </span>
          </div>

          <h2
            className={cn(
              "text-lg sm:text-xl md:text-2xl lg:text-base xl:text-2xl 2xl:text-3xl font-extrabold tracking-tight truncate",
              isDarkTheme ? "text-slate-100" : "text-slate-900"
            )}
          >
            {clock.year}年{clock.month}月{clock.date}日
          </h2>

          <p
            className={cn(
              "mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm font-semibold tracking-wide",
              isDarkTheme ? "text-slate-400" : "text-slate-600"
            )}
          >
            {WEEK_DAYS_FULL[clock.day]}
          </p>
        </div>

        {/* 右侧：超大显眼时间数字（远距离清晰可读） */}
        <div className="shrink-0 flex items-center sm:justify-end">
          <p
            className={cn(
              "font-[var(--font-digits)] font-black leading-none tracking-tight tabular-nums whitespace-nowrap",
              "text-4xl sm:text-5xl md:text-6xl lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl",
              isDarkTheme
                ? "text-slate-100 drop-shadow-[0_2px_16px_rgba(255,255,255,0.12)]"
                : "text-slate-900 drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
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
