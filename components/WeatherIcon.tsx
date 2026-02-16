import { cn } from "@/lib/utils"
import {
  GeneratedWeatherIcon,
  type LocalWeatherIconName,
} from "@/components/weather-icons"

function resolveWeatherIconName(code: string): LocalWeatherIconName {
  const weatherCode = Number.parseInt(code, 10)

  if (Number.isNaN(weatherCode)) {
    return "cloudy"
  }

  if (weatherCode === 100 || weatherCode === 900) return "sunny"
  if (weatherCode === 150) return "clearNight"
  if ([101, 102, 103].includes(weatherCode)) return "partlyCloudyDay"
  if ([151, 152, 153].includes(weatherCode)) return "partlyCloudyNight"
  if (weatherCode === 104 || weatherCode === 154) return "cloudy"

  if ([302, 303].includes(weatherCode)) return "thunder"
  if ([304, 313].includes(weatherCode)) return "hail"
  if ([309, 350, 351].includes(weatherCode)) return "drizzle"
  if (weatherCode >= 300 && weatherCode < 400) return "rain"

  if ([404, 405, 406].includes(weatherCode)) return "snow"
  if ((weatherCode >= 400 && weatherCode < 500) || weatherCode === 901) return "snow"

  if ([503, 504].includes(weatherCode)) return "wind"
  if ([507, 508].includes(weatherCode)) return "tornado"
  if (weatherCode >= 500 && weatherCode < 516) return "fog"

  return "cloudy"
}

export default function WeatherIcon({
  icon,
  className,
}: {
  icon: string
  className: string
}) {
  return (
    <span
      role="img"
      aria-label={`天气图标 ${icon}`}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <GeneratedWeatherIcon
        name={resolveWeatherIconName(icon)}
        className="h-full w-full"
      />
    </span>
  )
}
