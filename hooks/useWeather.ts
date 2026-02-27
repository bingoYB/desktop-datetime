import { useMemo } from "react"
import { useRequest } from "ahooks"
import { getLocation } from "@/lib/utils"
import {
  get7DaysWeather,
  getTodayWeather,
  getCityList,
  type WeatherForecastDay,
  type WeatherNow,
} from "@/service"

export interface WeatherData {
  today: WeatherNow | null
  forecast: WeatherForecastDay[]
  cityName: string
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
  const weatherPollingInterval = 4 * 60 * 60 * 1000

  const { data, loading } = useRequest(
    async () => {
      if (!location) {
        return null
      }

      const [today, forecast, cityList] = await Promise.all([
        getTodayWeather(location),
        get7DaysWeather(location),
        getCityList(location),
      ])

      const city = cityList[0]
      let cityName = ""
      if (city) {
        cityName = city.adm2 && city.adm2 !== city.name 
          ? `${city.adm2} ${city.name}` 
          : city.name
      }

      return {
        today,
        forecast,
        cityName,
      }
    },
    {
      ready: Boolean(location),
      refreshDeps: [location ?? "", ...refreshDeps],
      pollingInterval: weatherPollingInterval,
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
