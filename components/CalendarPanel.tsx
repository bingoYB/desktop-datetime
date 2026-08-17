import { cn } from "@/lib/utils"
import type { CalendarState } from "@/hooks/useCalendar"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"]

interface CalendarPanelProps {
  calendar: CalendarState
  currentDay: number
  isDarkTheme: boolean
}

export function CalendarPanel({
  calendar,
  currentDay,
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

  return (
    <section
      className={cn(
        "rounded-3xl border px-3 py-4 shadow-2xl backdrop-blur-xl sm:px-4 sm:py-5 md:px-6 md:py-6 flex flex-col justify-between",
        isDarkTheme
          ? "border-slate-700/70 bg-slate-900/70"
          : "border-amber-200/80 bg-white/80"
      )}
    >
      <header className="mb-3 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-3">
          <p
            className={cn(
              "text-xs tracking-[0.2em] sm:text-sm font-semibold",
              isDarkTheme ? "text-slate-400" : "text-slate-500"
            )}
          >
            CALENDAR
          </p>
          <h2
            className={cn(
              "text-lg font-bold tracking-tight sm:text-xl md:text-2xl",
              isDarkTheme ? "text-slate-100" : "text-slate-800"
            )}
          >
            {monthTitle}
          </h2>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {!isCurrentMonth && (
            <button
              type="button"
              onClick={resetToToday}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                isDarkTheme
                  ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                  : "bg-rose-100 text-rose-700 hover:bg-rose-200"
              )}
              title="回到今天"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>今天</span>
            </button>
          )}

          <button
            type="button"
            onClick={prevMonth}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors sm:h-9 sm:w-9",
              isDarkTheme
                ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                : "border-amber-200 bg-white/90 hover:bg-amber-50 text-slate-700"
            )}
            aria-label="上一月"
            title="上一月"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={nextMonth}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors sm:h-9 sm:w-9",
              isDarkTheme
                ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                : "border-amber-200 bg-white/90 hover:bg-amber-50 text-slate-700"
            )}
            aria-label="下一月"
            title="下一月"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium sm:gap-2 sm:text-base md:text-lg">
        {WEEK_DAYS.map((weekDay) => (
          <div
            key={weekDay}
            className={cn(
              "pb-1",
              isDarkTheme ? "text-slate-400" : "text-slate-500"
            )}
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: leadingEmptyCount }).map((_, index) => (
          <div
            key={`${monthKey}-empty-${index}`}
            className="h-14 sm:h-20 md:h-24"
            aria-hidden="true"
          />
        ))}

        {calendars.map((item) => {
          const isToday = isCurrentMonth && item.day === currentDay

          return (
            <article
              key={`${monthKey}-${item.day}`}
              className={cn(
                "h-14 rounded-lg border px-1.5 py-1.5 transition-colors sm:h-20 sm:rounded-xl sm:px-2 sm:py-2 md:h-24",
                isToday
                  ? "border-rose-300 bg-gradient-to-br from-rose-500/85 to-orange-400/85 text-white shadow-lg"
                  : isDarkTheme
                    ? "border-slate-700/70 bg-slate-800/65 text-slate-100"
                    : "border-amber-100 bg-white/80 text-slate-700"
              )}
            >
              <p className="text-xl font-semibold leading-none sm:text-2xl md:text-3xl">{item.day}</p>
              <p
                className={cn(
                  "mt-1 truncate text-xs sm:mt-2 sm:text-sm md:text-base",
                  isToday
                    ? "text-white/90"
                    : isDarkTheme
                      ? "text-slate-300"
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

      <section
        className={cn(
          "mt-4 rounded-2xl border p-3 sm:mt-5 sm:p-4",
          isDarkTheme ? "border-slate-700/70 bg-slate-800/70" : "border-amber-100 bg-white/70"
        )}
      >
        <h3 className="text-lg font-semibold tracking-[0.14em] sm:text-xl">
          {isCurrentMonth ? "今日宜忌" : `${monthTitle}宜忌`}
        </h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <article>
            <p className="text-lg font-semibold text-emerald-500">宜</p>
            <p className="mt-1 break-words text-base leading-7 sm:text-lg">{todayInfo?.yi ?? "暂无"}</p>
          </article>
          <article>
            <p className="text-lg font-semibold text-rose-500">忌</p>
            <p className="mt-1 break-words text-base leading-7 sm:text-lg">{todayInfo?.ji ?? "暂无"}</p>
          </article>
        </div>
      </section>
    </section>
  )
}
