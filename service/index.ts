const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST ??
  "https://hono-date.bingoying666.workers.dev"

export interface WeatherNow {
  obsTime: string
  temp: string
  feelsLike: string
  icon: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  dew: string
}

interface WeatherNowResponse {
  code: string
  now: WeatherNow
}

interface WeatherDailyRaw {
  fxDate: string
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moonPhase: string
  moonPhaseIcon: string
  tempMax: string
  tempMin: string
  iconDay: string
  textDay: string
  iconNight: string
  textNight: string
  wind360Day: string
  windDirDay: string
  windScaleDay: string
  windSpeedDay: string
  wind360Night: string
  windDirNight: string
  windScaleNight: string
  windSpeedNight: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  uvIndex: string
}

interface Weather7DayResponse {
  code: string
  daily: WeatherDailyRaw[]
}

export interface WeatherForecastDay extends WeatherDailyRaw {
  date: string
}

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_HOST}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function getTodayWeather(location: string): Promise<WeatherNow | null> {
  const data = await requestJson<WeatherNowResponse>(
    `/weather/now?location=${encodeURIComponent(location)}`
  )

  return data.code === "200" ? data.now : null
}

export async function get7DaysWeather(location: string): Promise<WeatherForecastDay[]> {
  const data = await requestJson<Weather7DayResponse>(
    `/weather/7day?location=${encodeURIComponent(location)}`
  )

  if (data.code !== "200") {
    return []
  }

  return data.daily.map((item) => ({
    ...item,
    date: item.fxDate.slice(5, 10),
  }))
}
