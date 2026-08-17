import { useCallback, useMemo, useState } from "react"
import { getMonthCalendar, normalizeYearMonth, type CalendarDayItem } from "@/lib/lunar-calendar"

export interface CalendarState {
  calendars: CalendarDayItem[]
  todayInfo: CalendarDayItem | undefined
  monthTitle: string
  leadingEmptyCount: number
  viewYear: number
  viewMonth: number
  isCurrentMonth: boolean
  prevMonth: () => void
  nextMonth: () => void
  resetToToday: () => void
}

export function useCalendar(currentDate: Date): CalendarState {
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()

  const [monthOffset, setMonthOffset] = useState(0)

  const { year: viewYear, month: viewMonth } = useMemo(
    () => normalizeYearMonth(currentYear, currentMonth + monthOffset),
    [currentYear, currentMonth, monthOffset]
  )

  const isCurrentMonth = viewYear === currentYear && viewMonth === currentMonth

  const calendars = useMemo(() => getMonthCalendar(viewYear, viewMonth), [viewYear, viewMonth])

  const todayInfo = useMemo(() => {
    if (!isCurrentMonth) return undefined
    return calendars.find((item) => item.day === currentDay)
  }, [calendars, currentDay, isCurrentMonth])

  const prevMonth = useCallback(() => {
    setMonthOffset((prev) => prev - 1)
  }, [])

  const nextMonth = useCallback(() => {
    setMonthOffset((prev) => prev + 1)
  }, [])

  const resetToToday = useCallback(() => {
    setMonthOffset(0)
  }, [])

  return useMemo(
    () => ({
      calendars,
      todayInfo,
      monthTitle: `${viewYear}年${viewMonth}月`,
      leadingEmptyCount: calendars[0]?.week ?? 0,
      viewYear,
      viewMonth,
      isCurrentMonth,
      prevMonth,
      nextMonth,
      resetToToday,
    }),
    [calendars, isCurrentMonth, nextMonth, prevMonth, resetToToday, todayInfo, viewMonth, viewYear]
  )
}
