import { Solar } from "lunar-typescript"

export interface CalendarDayItem {
  day: number
  week: number
  bottom: string
  yi: string
  ji: string
}

const ACTION_EMPTY_TEXT = "暂无"

function normalizeActionItems(items: string[] | null | undefined): string {
  if (!items || !Array.isArray(items)) {
    return ACTION_EMPTY_TEXT
  }
  const normalized = items.filter((item) => item && item !== "无")
  return normalized.length > 0 ? normalized.join("、") : ACTION_EMPTY_TEXT
}

export function normalizeYearMonth(year: number, month: number): { year: number; month: number } {
  const date = new Date(year, Math.floor(month) - 1, 1)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }
}

function getBottomLabel(solar: Solar): string {
  try {
    const lunar = solar.getLunar()
    if (!lunar) {
      return `${solar.getDay()}日`
    }

    const solarFestivals = solar.getFestivals() || []
    const solarOtherFestivals = solar.getOtherFestivals() || []
    const solarFestival = solarFestivals[0] ?? solarOtherFestivals[0]

    const lunarFestivals = lunar.getFestivals() || []
    const lunarOtherFestivals = lunar.getOtherFestivals() || []
    const lunarFestival = lunarFestivals[0] ?? lunarOtherFestivals[0]

    const jieQi = lunar.getJieQi()

    if (solarFestival) {
      return solarFestival
    }

    if (lunarFestival) {
      return lunarFestival
    }

    if (jieQi) {
      return jieQi
    }

    return lunar.getDay() === 1
      ? `${lunar.getMonthInChinese()}月`
      : lunar.getDayInChinese()
  } catch {
    return `${solar.getDay()}日`
  }
}

export function getMonthCalendar(rawYear: number, rawMonth: number): CalendarDayItem[] {
  const { year, month } = normalizeYearMonth(rawYear, rawMonth)
  const daysInMonth = new Date(year, month, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    try {
      const solar = Solar.fromYmd(year, month, day)
      const lunar = solar ? solar.getLunar() : null

      return {
        day,
        week: solar ? solar.getWeek() : new Date(year, month - 1, day).getDay(),
        bottom: solar ? getBottomLabel(solar) : `${day}日`,
        yi: normalizeActionItems(lunar ? lunar.getDayYi() : []),
        ji: normalizeActionItems(lunar ? lunar.getDayJi() : []),
      }
    } catch {
      return {
        day,
        week: new Date(year, month - 1, day).getDay(),
        bottom: `${day}日`,
        yi: ACTION_EMPTY_TEXT,
        ji: ACTION_EMPTY_TEXT,
      }
    }
  })
}

