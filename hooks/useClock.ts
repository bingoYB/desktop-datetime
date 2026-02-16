import { useEffect, useMemo, useState } from "react"

export interface ClockState {
  now: Date
  year: number
  month: number
  date: number
  day: number
  hours: string
  minutes: string
  seconds: string
  hour24: number
}

export function useClock(): ClockState {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const hour24 = now.getHours()

    return {
      now,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
      day: now.getDay(),
      hours: hour24.toString().padStart(2, "0"),
      minutes: now.getMinutes().toString().padStart(2, "0"),
      seconds: now.getSeconds().toString().padStart(2, "0"),
      hour24,
    }
  }, [now])
}
