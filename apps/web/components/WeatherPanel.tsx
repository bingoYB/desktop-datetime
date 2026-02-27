import { cn } from "@/lib/utils"
import type { WeatherData } from "@/hooks/useWeather"
import WeatherIcon from "@/components/WeatherIcon"
import WeatherEffects from "@/components/Weather/WeatherEffects"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WeatherPanelProps {
  weather: WeatherData | null
  loading: boolean
  hasLocation: boolean
  isDarkTheme: boolean
}

export type WeatherScene =
  | "sunny"
  | "clearNight"
  | "partlyCloudy"
  | "cloudy"
  | "rain"
  | "snow"
  | "thunder"
  | "fog"
  | "wind"

export const WEATHER_SCENES: WeatherScene[] = [
  "sunny",
  "clearNight",
  "partlyCloudy",
  "cloudy",
  "rain",
  "snow",
  "thunder",
  "fog",
  "wind",
]

interface WeatherCardTheme {
  shell: string
  surface: string
  overlay: string
  glowTop: string
  glowBottom: string
  texture: string
}

const WEEK_DAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

function toNumber(value: string | undefined): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function getWeekLabel(fxDate: string, index: number): string {
  if (index === 0) {
    return "今天"
  }

  const date = new Date(`${fxDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return `第${index + 1}天`
  }

  return WEEK_DAYS[date.getDay()]
}

function getTempRange(forecast: WeatherData["forecast"]) {
  if (forecast.length === 0) {
    return { min: 0, max: 1, span: 1 }
  }

  const mins = forecast.map((item) => toNumber(item.tempMin))
  const maxs = forecast.map((item) => toNumber(item.tempMax))
  const min = Math.min(...mins)
  const max = Math.max(...maxs)
  const span = Math.max(max - min, 1)

  return { min, max, span }
}

export function resolveWeatherScene(iconCode: string): WeatherScene {
  const weatherCode = Number.parseInt(iconCode, 10)

  if (Number.isNaN(weatherCode)) {
    return "cloudy"
  }

  if (weatherCode === 100 || weatherCode === 900) return "sunny"
  if (weatherCode === 150) return "clearNight"
  if ([101, 102, 103, 151, 152, 153].includes(weatherCode)) return "partlyCloudy"
  if (weatherCode === 104 || weatherCode === 154) return "cloudy"

  if ([302, 303].includes(weatherCode)) return "thunder"
  if ([304, 313, 309, 350, 351].includes(weatherCode)) return "rain"
  if (weatherCode >= 300 && weatherCode < 400) return "rain"

  if ([404, 405, 406].includes(weatherCode)) return "snow"
  if ((weatherCode >= 400 && weatherCode < 500) || weatherCode === 901) return "snow"

  if ([503, 504, 507, 508].includes(weatherCode)) return "wind"
  if (weatherCode >= 500 && weatherCode < 516) return "fog"

  return "cloudy"
}

export function getWeatherCardTheme(scene: WeatherScene, isDarkTheme: boolean): WeatherCardTheme {
  if (isDarkTheme) {
    const darkThemeMap: Record<WeatherScene, WeatherCardTheme> = {
      sunny: {
        shell: "bg-linear-to-br from-sky-500/45 via-blue-500/35 to-amber-500/30",
        surface: "bg-[#1e2d50]/72",
        overlay:
          "bg-[radial-gradient(circle_at_82%_16%,rgba(255,227,150,0.35)_0,rgba(255,227,150,0)_30%),linear-gradient(145deg,rgba(40,70,130,0.52)_0%,rgba(35,65,120,0.48)_52%,rgba(30,55,100,0.56)_100%)]",
        glowTop: "bg-amber-200/40",
        glowBottom: "bg-sky-300/25",
        texture:
          "bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_34%)]",
      },
      clearNight: {
        shell: "bg-linear-to-br from-[#1a2148]/90 via-[#111742]/85 to-[#0d1539]/90",
        surface: "bg-[#1c2454]/75",
        overlay:
          "bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.22)_0,rgba(255,255,255,0)_36%),radial-gradient(circle_at_86%_82%,rgba(210,229,255,0.2)_0,rgba(210,229,255,0)_34%),linear-gradient(145deg,rgba(42,56,120,0.7)_0%,rgba(33,45,103,0.65)_42%,rgba(17,26,64,0.75)_100%)]",
        glowTop: "bg-slate-100/20",
        glowBottom: "bg-indigo-300/25",
        texture: "",
      },
      partlyCloudy: {
        shell: "bg-linear-to-br from-sky-700/70 via-slate-700/65 to-indigo-800/75",
        surface: "bg-[#22315a]/72",
        overlay:
          "bg-[radial-gradient(circle_at_24%_14%,rgba(255,218,150,0.26)_0,rgba(255,218,150,0)_32%),radial-gradient(circle_at_68%_58%,rgba(255,255,255,0.16)_0,rgba(255,255,255,0)_34%),linear-gradient(150deg,rgba(62,86,141,0.62)_0%,rgba(45,63,110,0.56)_50%,rgba(24,37,74,0.64)_100%)]",
        glowTop: "bg-sky-100/24",
        glowBottom: "bg-slate-200/20",
        texture:
          "bg-[linear-gradient(160deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_48%)]",
      },
      cloudy: {
        shell: "bg-linear-to-br from-slate-700/72 via-slate-800/72 to-slate-900/72",
        surface: "bg-[#2a3247]/74",
        overlay:
          "bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.16)_0,rgba(255,255,255,0)_36%),radial-gradient(circle_at_78%_80%,rgba(186,201,223,0.16)_0,rgba(186,201,223,0)_36%),linear-gradient(145deg,rgba(81,97,126,0.5)_0%,rgba(57,70,95,0.58)_55%,rgba(37,47,67,0.62)_100%)]",
        glowTop: "bg-slate-100/20",
        glowBottom: "bg-slate-300/18",
        texture:
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_100%)]",
      },
      rain: {
        shell: "bg-linear-to-br from-slate-800/88 via-blue-950/85 to-indigo-950/85",
        surface: "bg-[#1c2c53]/72",
        overlay:
          "bg-[linear-gradient(150deg,rgba(56,80,132,0.62)_0%,rgba(31,48,92,0.64)_45%,rgba(20,30,58,0.7)_100%)]",
        glowTop: "bg-sky-200/22",
        glowBottom: "bg-blue-300/20",
        texture: "",
      },
      snow: {
        shell: "bg-linear-to-br from-sky-700/65 via-indigo-700/60 to-slate-700/65",
        surface: "bg-[#2a3e69]/68",
        overlay:
          "bg-[linear-gradient(145deg,rgba(117,147,194,0.58)_0%,rgba(81,107,157,0.52)_55%,rgba(55,73,113,0.56)_100%)]",
        glowTop: "bg-white/28",
        glowBottom: "bg-sky-100/26",
        texture: "",
      },
      thunder: {
        shell: "bg-linear-to-br from-indigo-900/85 via-slate-900/86 to-violet-950/88",
        surface: "bg-[#241e4c]/74",
        overlay:
          "bg-[linear-gradient(145deg,rgba(72,55,132,0.62)_0%,rgba(46,40,90,0.62)_48%,rgba(20,19,49,0.72)_100%)]",
        glowTop: "bg-yellow-200/24",
        glowBottom: "bg-violet-300/24",
        texture:
          "bg-[linear-gradient(125deg,rgba(255,238,171,0.16)_12%,rgba(255,238,171,0)_24%,rgba(255,238,171,0.14)_38%,rgba(255,238,171,0)_55%)]",
      },
      fog: {
        shell: "bg-linear-to-br from-slate-600/70 via-slate-700/70 to-slate-800/72",
        surface: "bg-[#2f3a4f]/74",
        overlay:
          "bg-[linear-gradient(145deg,rgba(123,137,161,0.46)_0%,rgba(96,112,136,0.48)_52%,rgba(66,80,100,0.5)_100%)]",
        glowTop: "bg-slate-100/24",
        glowBottom: "bg-slate-200/20",
        texture: "",
      },
      wind: {
        shell: "bg-linear-to-br from-cyan-900/75 via-slate-800/78 to-blue-900/80",
        surface: "bg-[#213956]/72",
        overlay:
          "bg-[linear-gradient(145deg,rgba(80,138,177,0.48)_0%,rgba(47,95,132,0.52)_54%,rgba(27,59,88,0.58)_100%)]",
        glowTop: "bg-cyan-100/24",
        glowBottom: "bg-sky-200/20",
        texture: "",
      },
    }

    return darkThemeMap[scene]
  }

  const lightThemeMap: Record<WeatherScene, WeatherCardTheme> = {
    sunny: {
      shell: "bg-linear-to-br from-sky-200/80 via-blue-100/78 to-amber-100/75",
      surface: "bg-white/78",
      overlay:
        "bg-[radial-gradient(circle_at_82%_16%,rgba(255,220,120,0.4)_0,rgba(255,220,120,0)_32%),linear-gradient(145deg,rgba(170,210,255,0.35)_0%,rgba(190,220,255,0.32)_48%,rgba(210,235,255,0.38)_100%)]",
      glowTop: "bg-amber-100/70",
      glowBottom: "bg-sky-100/60",
      texture:
        "bg-[linear-gradient(130deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_38%)]",
    },
    clearNight: {
      shell: "bg-linear-to-br from-slate-300/72 via-indigo-200/68 to-blue-200/70",
      surface: "bg-white/68",
      overlay:
        "bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.72)_0,rgba(255,255,255,0)_36%),radial-gradient(circle_at_86%_82%,rgba(207,223,255,0.52)_0,rgba(207,223,255,0)_34%),linear-gradient(145deg,rgba(177,194,232,0.45)_0%,rgba(194,209,241,0.44)_42%,rgba(174,197,234,0.5)_100%)]",
      glowTop: "bg-white/78",
      glowBottom: "bg-sky-100/58",
      texture: "",
    },
    partlyCloudy: {
      shell: "bg-linear-to-br from-sky-200/78 via-cyan-100/78 to-blue-100/80",
      surface: "bg-white/72",
      overlay:
        "bg-[radial-gradient(circle_at_22%_14%,rgba(255,212,138,0.4)_0,rgba(255,212,138,0)_34%),radial-gradient(circle_at_70%_62%,rgba(255,255,255,0.56)_0,rgba(255,255,255,0)_36%),linear-gradient(145deg,rgba(182,223,255,0.38)_0%,rgba(196,227,255,0.42)_55%,rgba(206,233,255,0.5)_100%)]",
      glowTop: "bg-white/75",
      glowBottom: "bg-sky-100/62",
      texture:
        "bg-[linear-gradient(160deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_48%)]",
    },
    cloudy: {
      shell: "bg-linear-to-br from-slate-200/82 via-slate-100/82 to-blue-100/80",
      surface: "bg-white/72",
      overlay:
        "bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,0.62)_0,rgba(255,255,255,0)_34%),radial-gradient(circle_at_78%_80%,rgba(225,233,244,0.5)_0,rgba(225,233,244,0)_36%),linear-gradient(145deg,rgba(213,223,237,0.46)_0%,rgba(224,232,242,0.48)_55%,rgba(202,216,236,0.52)_100%)]",
      glowTop: "bg-white/72",
      glowBottom: "bg-slate-100/60",
      texture:
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_100%)]",
    },
    rain: {
      shell: "bg-linear-to-br from-sky-300/78 via-blue-300/74 to-slate-300/78",
      surface: "bg-white/72",
      overlay:
        "bg-[linear-gradient(150deg,rgba(155,192,233,0.48)_0%,rgba(146,183,225,0.5)_45%,rgba(125,164,206,0.56)_100%)]",
      glowTop: "bg-white/70",
      glowBottom: "bg-sky-100/60",
      texture: "",
    },
    snow: {
      shell: "bg-linear-to-br from-sky-200/80 via-indigo-100/75 to-slate-200/80",
      surface: "bg-white/75",
      overlay:
        "bg-[linear-gradient(145deg,rgba(193,221,245,0.48)_0%,rgba(198,223,245,0.46)_55%,rgba(179,208,235,0.5)_100%)]",
      glowTop: "bg-white/80",
      glowBottom: "bg-cyan-50/72",
      texture: "",
    },
    thunder: {
      shell: "bg-linear-to-br from-indigo-300/78 via-violet-300/72 to-slate-300/78",
      surface: "bg-white/70",
      overlay:
        "bg-[linear-gradient(145deg,rgba(178,166,234,0.52)_0%,rgba(185,172,236,0.5)_48%,rgba(163,156,220,0.56)_100%)]",
      glowTop: "bg-yellow-100/62",
      glowBottom: "bg-violet-100/62",
      texture:
        "bg-[linear-gradient(125deg,rgba(255,236,170,0.25)_12%,rgba(255,236,170,0)_24%,rgba(255,236,170,0.22)_38%,rgba(255,236,170,0)_55%)]",
    },
    fog: {
      shell: "bg-linear-to-br from-slate-200/84 via-gray-100/82 to-slate-200/82",
      surface: "bg-white/75",
      overlay:
        "bg-[linear-gradient(145deg,rgba(215,223,236,0.52)_0%,rgba(224,230,240,0.5)_52%,rgba(204,214,230,0.55)_100%)]",
      glowTop: "bg-white/76",
      glowBottom: "bg-slate-100/70",
      texture: "",
    },
    wind: {
      shell: "bg-linear-to-br from-cyan-200/80 via-sky-200/78 to-blue-200/78",
      surface: "bg-white/73",
      overlay:
        "bg-[linear-gradient(145deg,rgba(174,225,241,0.5)_0%,rgba(168,216,235,0.52)_54%,rgba(148,199,222,0.56)_100%)]",
      glowTop: "bg-white/76",
      glowBottom: "bg-cyan-100/66",
      texture: "",
    },
  }

  return lightThemeMap[scene]
}

interface WeatherCardProps {
  weather: WeatherData | null
  hasLocation: boolean
  isDarkTheme: boolean
  sceneOverride?: WeatherScene
}

export function WeatherCard({
  weather,
  hasLocation,
  isDarkTheme,
  sceneOverride,
}: WeatherCardProps) {
  const forecast = weather?.forecast ?? []
  const today = weather?.today
  const todayLow = forecast[0]?.tempMin ?? "-"
  const todayHigh = forecast[0]?.tempMax ?? "-"
  const locationTitle = weather?.cityName || (hasLocation ? "当前位置" : "未定位")
  
  const scene = sceneOverride ?? resolveWeatherScene(today?.icon ?? "")
  const weatherTheme = getWeatherCardTheme(scene, isDarkTheme)

  if (!today && !sceneOverride) return null

  // If we have a scene override but no real data, we might want to mock some display data?
  // But for now let's assume if sceneOverride is present, we render with whatever data we validly have or placeholders if needed.
  // Actually, the card needs today.temp etc.
  // If sceneOverride is present but weather is null, we should probably render a mockup or expect the caller to provide mock weather.
  
  // Safe access for values if weather is missing but scene is forced (preview mode)
  const displayTemp = today?.temp ?? "--"
  const displayIcon = today?.icon ?? "999"
  const displayText = today?.text ?? scene
  const displayHigh = todayHigh
  const displayLow = todayLow

  return (
    <article
      className={cn(
        "relative mt-3 overflow-hidden rounded-[1.95rem]",
        weatherTheme.shell
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.45rem] p-6",
          weatherTheme.surface
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0",
            weatherTheme.overlay
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-85",
            weatherTheme.texture
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-14 -top-12 h-40 w-40 rounded-full blur-3xl",
            weatherTheme.glowTop
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -bottom-10 left-8 h-24 w-56 rounded-full blur-2xl",
            weatherTheme.glowBottom
          )}
        />

        {/* Animated weather effects overlay */}
        <WeatherEffects scene={scene} isDarkTheme={isDarkTheme} />

        <div className="relative z-10 flex min-h-32 flex-col justify-between gap-4 sm:min-h-[150px] sm:gap-5">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div
              className={cn(
                "flex min-w-0 items-center gap-2",
                isDarkTheme ? "text-slate-100" : "text-slate-700"
              )}
            >
              <WeatherIcon
                icon={displayIcon}
                className={cn(
                  "h-8 w-8 shrink-0 sm:h-9 sm:w-9",
                  isDarkTheme ? "text-slate-100/90" : "text-slate-700/80"
                )}
              />
              <p
                className={cn(
                  "truncate text-[clamp(1.05rem,5.6vw,1.8rem)] font-semibold leading-none",
                  isDarkTheme ? "text-slate-50" : "text-slate-800"
                )}
              >
                {displayText}
              </p>
            </div>
            <p className="shrink-0 font-[var(--font-digits)] text-[clamp(1.75rem,9vw,3.1rem)] font-light leading-none tracking-tight">
              {displayTemp}°
            </p>
          </div>

          <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[clamp(0.7rem,3.2vw,0.92rem)] leading-none",
                  isDarkTheme ? "text-slate-200/85" : "text-slate-600"
                )}
              >
                我的位置
              </p>
              <p
                className={cn(
                  "mt-1 truncate text-[clamp(0.82rem,4.2vw,1.2rem)] font-semibold leading-none",
                  isDarkTheme ? "text-slate-50" : "text-slate-800"
                )}
              >
                {locationTitle}
              </p>
            </div>

            <div className="flex max-w-full flex-wrap items-end justify-start gap-x-2.5 gap-y-1.5 sm:w-auto sm:justify-end sm:gap-x-3">
              <div className="flex min-w-0 items-end gap-1 sm:gap-1.5">
                <p
                  className={cn(
                    "whitespace-nowrap text-[clamp(0.72rem,2.8vw,0.9rem)] font-semibold leading-[0.92]",
                    isDarkTheme ? "text-slate-200/90" : "text-slate-600"
                  )}
                >
                  最高
                </p>
                <p className="font-[var(--font-digits)] text-[clamp(1.3rem,6.2vw,2.05rem)] font-light leading-none">
                  {displayHigh}°
                </p>
              </div>
              <div className="flex min-w-0 items-end gap-1 sm:gap-1.5">
                <p
                  className={cn(
                    "whitespace-nowrap text-[clamp(0.72rem,2.8vw,0.9rem)] font-semibold leading-[0.92]",
                    isDarkTheme ? "text-slate-200/90" : "text-slate-600"
                  )}
                >
                  最低
                </p>
                <p className="font-[var(--font-digits)] text-[clamp(1.3rem,6.2vw,2.05rem)] font-light leading-none">
                  {displayLow}°
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function WeatherEmptyState({
  loading,
  hasLocation,
  isDarkTheme,
}: Pick<WeatherPanelProps, "loading" | "hasLocation" | "isDarkTheme">) {
  return (
    <div
      className={cn(
        "mt-3 rounded-[1.5rem] border px-4 py-5 text-sm backdrop-blur-xl",
        isDarkTheme
          ? "border-white/20 bg-sky-900/40 text-slate-100"
          : "border-sky-200 bg-white/70 text-slate-600"
      )}
    >
      {loading
        ? "正在获取天气数据..."
        : hasLocation
          ? "暂无天气数据。"
          : "未获取到定位，请允许浏览器定位权限。"}
    </div>
  )
}

export function WeatherPanel({
  weather,
  loading,
  hasLocation,
  isDarkTheme,
}: WeatherPanelProps) {
  const forecast = weather?.forecast ?? []
  const today = weather?.today
  const tempRange = getTempRange(forecast)
  // const todayLow = forecast[0]?.tempMin ?? "-"
  // const todayHigh = forecast[0]?.tempMax ?? "-"
  // const locationTitle = hasLocation ? "当前位置" : "未定位"
  // const weatherTheme = getWeatherCardTheme(resolveWeatherScene(today?.icon ?? ""), isDarkTheme)

  return (
    <section
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-3xl border px-4 py-5 shadow-2xl backdrop-blur-2xl sm:px-5 sm:py-6 md:px-6 lg:h-full",
        isDarkTheme
          ? "border-slate-700/60 bg-slate-900/70"
          : "border-sky-200/80 bg-white/80"
      )}
    >
      <p className={cn("text-xs tracking-[0.2em]", isDarkTheme ? "text-slate-300" : "text-slate-500")}>
        WEATHER
      </p>

      {!today ? (
        <WeatherEmptyState
          loading={loading}
          hasLocation={hasLocation}
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <>
          <WeatherCard
            weather={weather}
            hasLocation={hasLocation}
            isDarkTheme={isDarkTheme}
          />

          <article
            className={cn(
              "mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] border",
              isDarkTheme
                ? "border-white/20 bg-slate-900/35"
                : "border-sky-200/80 bg-white/65"
            )}
          >
            {forecast.length === 0 ? (
              <div className={cn("px-4 py-4 text-sm", isDarkTheme ? "text-slate-200" : "text-slate-600")}>
                暂无预报数据。
              </div>
            ) : (
              <ScrollArea className="min-h-0 flex-1">
                <div className="divide-y divide-white/10">
                  {forecast.slice(0, 8).map((day, index) => {
                    const min = toNumber(day.tempMin)
                    const max = toNumber(day.tempMax)
                    const barStart = ((min - tempRange.min) / tempRange.span) * 100
                    const barWidth = Math.max(((max - min) / tempRange.span) * 100, 12)

                    return (
                      <article
                        key={day.fxDate}
                        className="grid grid-cols-[40px_24px_minmax(0,1fr)] items-center gap-2 px-4 py-3"
                      >
                        <p className="text-sm font-medium">{getWeekLabel(day.fxDate, index)}</p>
                        <WeatherIcon
                          icon={day.iconDay}
                          className={cn("h-6 w-6", isDarkTheme ? "text-sky-100" : "text-sky-600")}
                        />

                        <div className="flex items-center gap-2">
                          <p className={cn("w-9 text-right text-xs", isDarkTheme ? "text-sky-100/75" : "text-slate-500")}>
                            {day.tempMin}°
                          </p>
                          <div
                            className={cn(
                              "relative h-1.5 flex-1 rounded-full",
                              isDarkTheme ? "bg-slate-700/70" : "bg-sky-100"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-0 h-full rounded-full",
                                isDarkTheme
                                  ? "bg-gradient-to-r from-cyan-300 to-orange-300"
                                  : "bg-gradient-to-r from-sky-400 to-amber-400"
                              )}
                              style={{
                                left: `${Math.max(Math.min(barStart, 100), 0)}%`,
                                width: `${Math.min(barWidth, 100)}%`,
                              }}
                            />
                          </div>
                          <p className="w-9 text-xs font-semibold text-right">{day.tempMax}°</p>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </article>
        </>
      )}
    </section>
  )
}
