import { useMemo } from "react"
import { getMonthCalendar, type CalendarDayItem } from "@/lib/lunar-calendar"

export interface CalendarState {
  calendars: CalendarDayItem[]
  todayInfo: CalendarDayItem | undefined
  monthTitle: string
  leadingEmptyCount: number
}

export function useCalendar(currentDate: Date): CalendarState {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  const calendars = useMemo(() => getMonthCalendar(year, month), [year, month])

  return useMemo(
    () => ({
      calendars,
      todayInfo: calendars.find((item) => item.day === day),
      monthTitle: `${year}年${month}月`,
      leadingEmptyCount: calendars[0]?.week ?? 0,
    }),
    [calendars, day, month, year]
  )
}
