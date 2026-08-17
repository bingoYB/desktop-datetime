import { cn } from "@/lib/utils"
import type { CalendarState } from "@/hooks/useCalendar"
import type { ClockState } from "@/hooks/useClock"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"]
const WEEK_DAYS_FULL = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
]

interface CalendarPanelProps {
  calendar: CalendarState
  clock: ClockState
  isDarkTheme: boolean
}

export function CalendarPanel({
  calendar,
  clock,
  isDarkTheme,
}: CalendarPanelProps) {
  const {
    calendars,
    leadingEmptyCount,
    monthTitle,
    todayInfo,
    isCurrentMonth,
    prevMonth,
    nextMonth,
    resetToToday,
  } = calendar

  const monthKey = monthTitle
  const totalSlots = leadingEmptyCount + calendars.length
  const totalRows = Math.ceil(totalSlots / 7)

  return (
    <section
      className={cn(
        "rounded-2xl sm:rounded-3xl border p-3 sm:p-4 md:p-5 lg:p-4 xl:p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between h-full min-h-0 transition-colors duration-300",
        isDarkTheme
          ? "border-slate-700/60 bg-slate-900/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          : "border-amber-200/70 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      )}
    >
      {/* Month Header */}
      <header className="mb-2 sm:mb-3 grid grid-cols-[1fr_auto_1fr] items-center shrink-0 gap-1.5 sm:gap-2">
        {/* 左侧：月份 */}
        <div className="flex items-center justify-start min-w-0">
          <h2
            className={cn(
              "text-base sm:text-lg md:text-xl lg:text-lg xl:text-2xl font-bold tracking-tight truncate",
              isDarkTheme ? "text-slate-100" : "text-slate-800"
            )}
          >
            {monthTitle}
          </h2>
        </div>

        {/* 中间：具体日期与星期 */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-1 text-center whitespace-nowrap">
          <span
            className={cn(
              "text-sm sm:text-base md:text-lg lg:text-sm xl:text-lg font-bold tracking-tight",
              isDarkTheme ? "text-amber-300" : "text-amber-700"
            )}
          >
            {clock.month}月{clock.date}日
          </span>
          <span
            className={cn(
              "text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm font-semibold",
              isDarkTheme ? "text-slate-400" : "text-slate-500"
            )}
          >
            {WEEK_DAYS_FULL[clock.day]}
          </span>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-2">
          {!isCurrentMonth && (
            <button
              type="button"
              onClick={resetToToday}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-medium transition-colors",
                isDarkTheme
                  ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                  : "bg-rose-100 text-rose-700 hover:bg-rose-200"
              )}
              title="回到今天"
            >
              <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>今天</span>
            </button>
          )}

          <button
            type="button"
            onClick={prevMonth}
            className={cn(
              "inline-flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full border transition-colors",
              isDarkTheme
                ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                : "border-amber-200 bg-white/90 hover:bg-amber-50 text-slate-700"
            )}
            aria-label="上一月"
            title="上一月"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>

          <button
            type="button"
            onClick={nextMonth}
            className={cn(
              "inline-flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full border transition-colors",
              isDarkTheme
                ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                : "border-amber-200 bg-white/90 hover:bg-amber-50 text-slate-700"
            )}
            aria-label="下一月"
            title="下一月"
          >
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </header>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2 text-center text-xs sm:text-sm md:text-base lg:text-sm xl:text-base font-semibold shrink-0 pb-1">
        {WEEK_DAYS.map((weekDay) => (
          <div
            key={weekDay}
            className={cn(
              "py-0.5",
              isDarkTheme ? "text-slate-400" : "text-slate-500"
            )}
          >
            {weekDay}
          </div>
        ))}
      </div>

      {/* Days Grid - dynamic rows in lg: view, responsive min-height in stacked view */}
      <div
        className="grid grid-cols-7 gap-1 sm:gap-1.5 min-h-0 my-1 sm:my-1.5 lg:flex-1"
        style={{
          gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: leadingEmptyCount }).map((_, index) => (
          <div
            key={`${monthKey}-empty-${index}`}
            className="min-h-[44px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-0 h-full opacity-0 pointer-events-none"
            aria-hidden="true"
          />
        ))}

        {calendars.map((item) => {
          const isToday = isCurrentMonth && item.day === clock.date

          return (
            <article
              key={`${monthKey}-${item.day}`}
              className={cn(
                "min-h-[44px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-0 h-full rounded-lg sm:rounded-xl border p-1 sm:p-1.5 md:p-2 transition-all flex flex-col justify-between overflow-hidden",
                isToday
                  ? "border-rose-400/90 bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25 ring-1 ring-rose-300/40"
                  : isDarkTheme
                    ? "border-slate-800/80 bg-slate-800/50 text-slate-100 hover:bg-slate-800/80 hover:border-slate-700"
                    : "border-amber-100/90 bg-white/70 text-slate-700 hover:bg-white hover:border-amber-200"
              )}
            >
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold leading-none tracking-tight">
                {item.day}
              </p>
              <p
                className={cn(
                  "mt-0.5 truncate text-[11px] sm:text-xs md:text-sm lg:text-xs xl:text-sm leading-tight",
                  isToday
                    ? "text-white/95 font-medium"
                    : isDarkTheme
                      ? "text-slate-400"
                      : "text-slate-500"
                )}
                title={item.bottom}
              >
                {item.bottom}
              </p>
            </article>
          )
        })}
      </div>

      {/* Today's Yi/Ji (今日宜忌) */}
      <section
        className={cn(
          "mt-2 sm:mt-3 rounded-xl sm:rounded-2xl border p-2 sm:p-2.5 md:p-3 xl:p-3.5 shrink-0 transition-colors",
          isDarkTheme ? "border-slate-800/80 bg-slate-800/40" : "border-amber-100/90 bg-white/60"
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-semibold tracking-wider">
            {isCurrentMonth ? "今日宜忌" : `${monthTitle} 宜忌参考`}
          </h3>
        </div>

        <div className="mt-1.5 sm:mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-1.5 sm:gap-2 min-w-0">
            <span className="shrink-0 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400">
              宜
            </span>
            <p
              className={cn(
                "min-w-0 flex-1 truncate sm:line-clamp-1 xl:line-clamp-2 leading-relaxed",
                isDarkTheme ? "text-slate-300" : "text-slate-700"
              )}
              title={todayInfo?.yi ?? "暂无"}
            >
              {todayInfo?.yi ?? "暂无"}
            </p>
          </div>

          <div className="flex items-start gap-1.5 sm:gap-2 min-w-0">
            <span className="shrink-0 rounded-md bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-400">
              忌
            </span>
            <p
              className={cn(
                "min-w-0 flex-1 truncate sm:line-clamp-1 xl:line-clamp-2 leading-relaxed",
                isDarkTheme ? "text-slate-300" : "text-slate-700"
              )}
              title={todayInfo?.ji ?? "暂无"}
            >
              {todayInfo?.ji ?? "暂无"}
            </p>
          </div>
        </div>
      </section>
    </section>
  )
}

