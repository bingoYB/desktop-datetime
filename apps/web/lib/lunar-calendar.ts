import { Solar } from "lunar-typescript"

export interface CalendarDayItem {
  day: number
  week: number
  bottom: string
  yi: string
  ji: string
}

const ACTION_EMPTY_TEXT = "暂无"

function normalizeActionItems(items: string[]): string {
  const normalized = items.filter((item) => item && item !== "无")
  return normalized.length > 0 ? normalized.join("、") : ACTION_EMPTY_TEXT
}

function getBottomLabel(solar: Solar): string {
  const lunar = solar.getLunar()

  const solarFestival = solar.getFestivals()[0] ?? solar.getOtherFestivals()[0]
  const lunarFestival = lunar.getFestivals()[0] ?? lunar.getOtherFestivals()[0]
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
}

export function getMonthCalendar(year: number, month: number): CalendarDayItem[] {
  const daysInMonth = new Date(year, month, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const solar = Solar.fromYmd(year, month, day)
    const lunar = solar.getLunar()

    return {
      day,
      week: solar.getWeek(),
      bottom: getBottomLabel(solar),
      yi: normalizeActionItems(lunar.getDayYi()),
      ji: normalizeActionItems(lunar.getDayJi()),
    }
  })
}
