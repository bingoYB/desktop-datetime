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
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let intervalId: ReturnType<typeof setInterval> | null = null

    // 精确对齐到每秒的000毫秒边缘触发更新，消除时间漂移和跳秒延迟
    const syncAndStartTimer = () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)

      const update = () => setNow(new Date())
      update()

      const nowMs = new Date().getMilliseconds()
      const delay = Math.max(0, 1000 - nowMs)

      timeoutId = setTimeout(() => {
        update()
        intervalId = setInterval(update, 1000)
      }, delay)
    }

    syncAndStartTimer()

    // 页面切回前台（从休眠唤醒、切换标签页等）时立即校准时间
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncAndStartTimer()
      }
    }

    const handleFocus = () => {
      syncAndStartTimer()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
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

