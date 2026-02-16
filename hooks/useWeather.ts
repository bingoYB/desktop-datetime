import { useMemo } from "react"
import { useRequest } from "ahooks"
import { getLocation } from "@/lib/utils"
import {
  get7DaysWeather,
  getTodayWeather,
  type WeatherForecastDay,
  type WeatherNow,
} from "@/service"

export interface WeatherData {
  today: WeatherNow | null
  forecast: WeatherForecastDay[]
}

export function useLocation() {
  const { data } = useRequest(async () => {
    const location = await getLocation()

    if (!location) {
      return null
    }

    return `${location.longitude},${location.latitude}`
  })

  return data
}

export function useWeather(refreshDeps: Array<string | number> = []) {
  const location = useLocation()

  const { data, loading } = useRequest<WeatherData | null>(
    async () => {
      if (!location) {
        return null
      }

      const [today, forecast] = await Promise.all([
        getTodayWeather(location),
        get7DaysWeather(location),
      ])

      return {
        today,
        forecast,
      }
    },
    {
      ready: Boolean(location),
      refreshDeps: [location ?? "", ...refreshDeps],
    }
  )

  return useMemo(
    () => ({
      weather: data,
      loading,
      hasLocation: Boolean(location),
    }),
    [data, loading, location]
  )
}
