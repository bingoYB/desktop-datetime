"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"

import {
  WEATHER_SCENES,
  WeatherCard,
  type WeatherScene,
} from "@/components/WeatherPanel"
import type { WeatherData } from "@/hooks/useWeather"
import { cn } from "@/lib/utils"

export default function WeatherPreviewPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const scenes = WEATHER_SCENES

  return (
    <div
      className={cn(
        "min-h-screen p-8 transition-colors duration-300",
        isDarkTheme ? "bg-slate-900" : "bg-slate-50"
      )}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <h1
            className={cn(
              "text-3xl font-bold",
              isDarkTheme ? "text-slate-100" : "text-slate-900"
            )}
          >
            Weather Card Previews
          </h1>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={cn(
              "rounded-full p-2 transition-colors",
              isDarkTheme
                ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                : "bg-white text-slate-700 shadow-sm hover:bg-slate-100"
            )}
          >
            {isDarkTheme ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {scenes.map((scene) => (
            <div key={scene} className="flex flex-col gap-4">
              <h2
                className={cn(
                  "text-xl font-semibold capitalize",
                  isDarkTheme ? "text-slate-300" : "text-slate-700"
                )}
              >
                {scene}
              </h2>
              <div className="h-[200px]">
                <WeatherCard
                  weather={getMockWeather(scene)}
                  hasLocation={true}
                  isDarkTheme={isDarkTheme}
                  sceneOverride={scene}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getMockWeather(scene: WeatherScene): WeatherData {
  const iconMap: Record<WeatherScene, string> = {
    sunny: "100",
    clearNight: "150",
    partlyCloudy: "101",
    cloudy: "104",
    rain: "305",
    snow: "400",
    thunder: "302",
    fog: "501",
    wind: "503",
  }

  const textMap: Record<WeatherScene, string> = {
    sunny: "晴",
    clearNight: "晴",
    partlyCloudy: "多云",
    cloudy: "阴",
    rain: "小雨",
    snow: "小雪",
    thunder: "雷阵雨",
    fog: "雾",
    wind: "大风",
  }

  return {
    today: {
      temp: "25",
      icon: iconMap[scene] || "100",
      text: textMap[scene] || scene,
      windDir: "东北风",
      windScale: "3",
      humidity: "45",
      vis: "30",
      pressure: "1012",
      obsTime: "2023-10-01T12:00",
    } as any,
    forecast: [
      {
        fxDate: "2023-10-01",
        tempMax: "28",
        tempMin: "18",
        iconDay: iconMap[scene] || "100",
        textDay: textMap[scene] || scene,
        windDirDay: "东北风",
        windScaleDay: "3",
        humidity: "45",
        precip: "0.0",
        uvIndex: "5",
      } as any,
    ],
  }
}
