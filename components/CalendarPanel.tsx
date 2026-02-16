import { cn } from "@/lib/utils"
import type { CalendarDayItem } from "@/lib/lunar-calendar"

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"]

interface CalendarPanelProps {
  monthTitle: string
  calendars: CalendarDayItem[]
  leadingEmptyCount: number
  currentDay: number
  todayInfo?: CalendarDayItem
  isDarkTheme: boolean
}

export function CalendarPanel({
  monthTitle,
  calendars,
  leadingEmptyCount,
  currentDay,
  todayInfo,
  isDarkTheme,
}: CalendarPanelProps) {
  const monthKey = monthTitle

  return (
    <section
      className={cn(
        "rounded-3xl border px-3 py-4 shadow-2xl backdrop-blur-xl sm:px-4 sm:py-5 md:px-6 md:py-6",
        isDarkTheme
          ? "border-slate-700/70 bg-slate-900/70"
          : "border-amber-200/80 bg-white/80"
      )}
    >
      <header className="mb-4 flex items-end justify-between sm:mb-5">
        <div>
          <p
            className={cn(
              "text-xs tracking-[0.2em] sm:text-sm",
              isDarkTheme ? "text-slate-400" : "text-slate-500"
            )}
          >
            CALENDAR
          </p>
          <h2 className="mt-1 text-xl font-semibold sm:text-2xl md:text-3xl">{monthTitle}</h2>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium sm:gap-2 sm:text-xs md:text-sm">
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
            className="h-11 sm:h-14 md:h-[74px]"
            aria-hidden="true"
          />
        ))}

        {calendars.map((item) => {
          const isToday = item.day === currentDay

          return (
            <article
              key={`${monthKey}-${item.day}`}
              className={cn(
                "h-11 rounded-lg border px-1.5 py-1 transition-colors sm:h-14 sm:rounded-xl sm:px-2 sm:py-1.5 md:h-[74px]",
                isToday
                  ? "border-rose-300 bg-gradient-to-br from-rose-500/85 to-orange-400/85 text-white shadow-lg"
                  : isDarkTheme
                    ? "border-slate-700/70 bg-slate-800/65 text-slate-100"
                    : "border-amber-100 bg-white/80 text-slate-700"
              )}
            >
              <p className="text-sm font-semibold leading-none sm:text-base md:text-lg">{item.day}</p>
              <p
                className={cn(
                  "mt-1 truncate text-[10px] sm:mt-2 sm:text-xs",
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
        <h3 className="text-sm font-semibold tracking-[0.14em]">今日宜忌</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <article>
            <p className="text-sm font-semibold text-emerald-500">宜</p>
            <p className="mt-1 break-words text-sm leading-6">{todayInfo?.yi ?? "暂无"}</p>
          </article>
          <article>
            <p className="text-sm font-semibold text-rose-500">忌</p>
            <p className="mt-1 break-words text-sm leading-6">{todayInfo?.ji ?? "暂无"}</p>
          </article>
        </div>
      </section>
    </section>
  )
}
