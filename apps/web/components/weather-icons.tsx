import type { ReactElement, ReactNode } from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"

export type LocalWeatherIconName =
  | "sunny"
  | "clearNight"
  | "partlyCloudyDay"
  | "partlyCloudyNight"
  | "cloudy"
  | "rain"
  | "drizzle"
  | "thunder"
  | "hail"
  | "snow"
  | "fog"
  | "wind"
  | "tornado"

interface WeatherIconSvgProps {
  className?: string
}

interface IconShellProps {
  className?: string
  children: ReactNode
}

const SOFT_STROKE = "rgba(255,255,255,.28)"
const SOFT_STROKE_STRONG = "rgba(255,255,255,.36)"

function TopGlossLayer() {
  return (
    <g opacity="0.9">
      <ellipse cx="30" cy="14" rx="18" ry="8" fill="rgba(255,255,255,.2)" />
      <ellipse cx="26" cy="17" rx="14" ry="6" fill="rgba(255,255,255,.11)" />
    </g>
  )
}

function IconShell({ className, children }: IconShellProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
      <TopGlossLayer />
    </svg>
  )
}

function CloudShape({ gradientId }: { gradientId: string }) {
  return (
    <>
      <path
        d="M14 44h34c6.6 0 12-5.2 12-11.4 0-5.9-4.7-10.8-10.8-11.3C47.7 13.6 40.8 8 32.5 8c-9 0-16.5 6.6-17.9 15.2h-.4C7.5 23.2 2 28.4 2 34.8 2 40 7.4 44 14 44Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M14 44h34c6.6 0 12-5.2 12-11.4 0-5.9-4.7-10.8-10.8-11.3C47.7 13.6 40.8 8 32.5 8c-9 0-16.5 6.6-17.9 15.2h-.4C7.5 23.2 2 28.4 2 34.8 2 40 7.4 44 14 44Z"
        stroke={SOFT_STROKE}
        strokeWidth="1.15"
      />
      <path
        d="M17 24c2.8-6.1 8.7-10.2 15.3-10.2 5.6 0 10.6 2.9 13.5 7.4"
        stroke={SOFT_STROKE_STRONG}
        strokeWidth="0.95"
      />
    </>
  )
}

function SunnyIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const sunGradientId = `${id}-sun`

  const rays = [
    [32, 5, 32, 13],
    [32, 51, 32, 59],
    [5, 32, 13, 32],
    [51, 32, 59, 32],
    [11, 11, 17, 17],
    [47, 47, 53, 53],
    [11, 53, 17, 47],
    [47, 17, 53, 11],
  ] as const

  return (
    <IconShell className={cn("drop-shadow-[0_2px_6px_rgba(255,176,32,.5)]", className)}>
      <defs>
        <radialGradient id={sunGradientId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(13)">
          <stop stopColor="#FFE78A" />
          <stop offset="1" stopColor="#FF9D2F" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="12" fill={`url(#${sunGradientId})`} stroke={SOFT_STROKE} strokeWidth="1" />
      {rays.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1}-${y1}-${x2}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#FFCFA0"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </IconShell>
  )
}

function ClearNightIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const moonGradientId = `${id}-moon`

  return (
    <IconShell className={cn("drop-shadow-[0_2px_6px_rgba(83,139,255,.45)]", className)}>
      <defs>
        <linearGradient id={moonGradientId} x1="18" y1="12" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4E3FF" />
          <stop offset="1" stopColor="#7AA5FF" />
        </linearGradient>
      </defs>
      <path
        d="M40 10c-8.9 1.6-15.6 9.3-15.6 18.7 0 9.9 7.9 18 17.7 18.4-2.9 4.2-7.8 6.9-13.4 6.9-8.9 0-16.1-6.8-16.7-15.6-.6-9.4 6.1-17.4 15.2-18.9 4.2-.6 8.2.3 11.4 2.2.6.4 1.4-.1 1.4-.8v-10Z"
        fill={`url(#${moonGradientId})`}
        stroke={SOFT_STROKE}
        strokeWidth="1"
      />
      <circle cx="47" cy="20" r="2" fill="#DCE6FF" />
      <circle cx="50.5" cy="15.5" r="1.3" fill="#DCE6FF" />
    </IconShell>
  )
}

function CloudyIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EEF5FF" />
          <stop offset="1" stopColor="#8FA8CC" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
    </IconShell>
  )
}

function PartlyCloudyDayIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const sunGradientId = `${id}-sun`
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <radialGradient id={sunGradientId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21 20) rotate(90) scale(12)">
          <stop stopColor="#FFE78A" />
          <stop offset="1" stopColor="#FF9D2F" />
        </radialGradient>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3F8FF" />
          <stop offset="1" stopColor="#9AB1D1" />
        </linearGradient>
      </defs>
      <circle cx="21" cy="20" r="11" fill={`url(#${sunGradientId})`} stroke={SOFT_STROKE} strokeWidth="1" />
      <CloudShape gradientId={cloudGradientId} />
    </IconShell>
  )
}

function PartlyCloudyNightIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const moonGradientId = `${id}-moon`
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={moonGradientId} x1="16" y1="10" x2="37" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4E3FF" />
          <stop offset="1" stopColor="#7AA5FF" />
        </linearGradient>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3F8FF" />
          <stop offset="1" stopColor="#9AB1D1" />
        </linearGradient>
      </defs>
      <path
        d="M34 10c-7.2 1.3-12.5 7.5-12.5 15 0 3.6 1.3 6.8 3.5 9.3l7.8-12.2c.6-.9 1.8-1.1 2.7-.5l7 4.7c1.3-1.9 2.1-4.3 2.1-6.8 0-3.7-1.6-7.1-4.2-9.5.4.8.6 1.8.6 2.8 0 3.4-2.8 6.2-6.2 6.2-1.5 0-2.9-.5-4-1.5-.6-.5-.3-1.5.5-1.6.9-.1 1.8-.5 2.4-1.2 1.8-1.8 1.6-4.7-.3-6.2-.4-.3-.2-1 .3-1.1.1 0 .2 0 .3 0Z"
        fill={`url(#${moonGradientId})`}
        stroke={SOFT_STROKE}
        strokeWidth="1"
      />
      <CloudShape gradientId={cloudGradientId} />
    </IconShell>
  )
}

function RainIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF4FF" />
          <stop offset="1" stopColor="#8CA6C7" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
      {[14, 28, 42].map((x) => (
        <path
          key={x}
          d={`M${x} 47c1.8 2.7 1.8 5.4 0 8.1-.9 1.2-2.8 1.2-3.6 0-1.8-2.7-1.8-5.4 0-8.1.8-1.2 2.7-1.2 3.6 0Z`}
          fill="#5EB9FF"
          stroke="rgba(255,255,255,.25)"
          strokeWidth=".75"
        />
      ))}
    </IconShell>
  )
}

function DrizzleIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF4FF" />
          <stop offset="1" stopColor="#8CA6C7" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
      {[14, 24, 34, 44].map((x) => (
        <circle key={x} cx={x} cy="52" r="2" fill="#73C5FF" stroke="rgba(255,255,255,.24)" strokeWidth=".7" />
      ))}
    </IconShell>
  )
}

function ThunderIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`
  const boltGradientId = `${id}-bolt`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF4FF" />
          <stop offset="1" stopColor="#8CA6C7" />
        </linearGradient>
        <linearGradient id={boltGradientId} x1="26" y1="40" x2="38" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE37C" />
          <stop offset="1" stopColor="#FF9C2A" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
      <path
        d="M31 40h10l-7 9h7l-12 13 3-10h-7l6-12Z"
        fill={`url(#${boltGradientId})`}
        stroke="rgba(255,255,255,.24)"
        strokeWidth=".8"
      />
    </IconShell>
  )
}

function HailIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF4FF" />
          <stop offset="1" stopColor="#8CA6C7" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
      {[14, 24, 34, 44].map((x) => (
        <circle key={x} cx={x} cy="52" r="2.8" fill="#D7E3F8" stroke="rgba(255,255,255,.22)" strokeWidth=".8" />
      ))}
    </IconShell>
  )
}

function SnowIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF4FF" />
          <stop offset="1" stopColor="#8CA6C7" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
      {[16, 30, 44].map((x) => (
        <g key={x} transform={`translate(${x} 52)`}>
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#CDE3FF" strokeWidth="1.35" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#CDE3FF" strokeWidth="1.35" />
          <line x1="-2.2" y1="-2.2" x2="2.2" y2="2.2" stroke="#CDE3FF" strokeWidth="1.15" />
          <line x1="-2.2" y1="2.2" x2="2.2" y2="-2.2" stroke="#CDE3FF" strokeWidth="1.15" />
        </g>
      ))}
    </IconShell>
  )
}

function FogIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const cloudGradientId = `${id}-cloud`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={cloudGradientId} x1="8" y1="13" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDF4FF" />
          <stop offset="1" stopColor="#8CA6C7" />
        </linearGradient>
      </defs>
      <CloudShape gradientId={cloudGradientId} />
      <line x1="10" y1="50" x2="52" y2="50" stroke="#B6CAE3" strokeWidth="1.9" />
      <line x1="14" y1="55" x2="48" y2="55" stroke="#B6CAE3" strokeWidth="1.9" />
    </IconShell>
  )
}

function WindIcon({ className }: WeatherIconSvgProps) {
  return (
    <IconShell className={className}>
      <path d="M8 24h30c4 0 7-3 7-6s-3-6-7-6c-3 0-5.4 1.8-6.5 4.3" stroke="#C9E0FF" strokeWidth="2.5" />
      <path d="M6 34h42c4.4 0 8 3.2 8 7s-3.6 7-8 7c-3.3 0-6.2-1.8-7.4-4.5" stroke="#A7CDFF" strokeWidth="2.5" />
      <path d="M10 44h20" stroke="#D9EAFF" strokeWidth="2.5" />
    </IconShell>
  )
}

function TornadoIcon({ className }: WeatherIconSvgProps) {
  const id = useId()
  const coneGradientId = `${id}-cone`

  return (
    <IconShell className={className}>
      <defs>
        <linearGradient id={coneGradientId} x1="16" y1="8" x2="31" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFE0F7" />
          <stop offset="1" stopColor="#7D9AC0" />
        </linearGradient>
      </defs>
      <path
        d="M8 12h48L40 28H22L36 40H27l8 10h-7l6 8h-4l-5-8h-6l7-10h-9l12-12H16L8 12Z"
        fill={`url(#${coneGradientId})`}
        stroke={SOFT_STROKE}
        strokeWidth="1"
      />
      <path d="M11 18h42M19 28h25M24 40h12" stroke={SOFT_STROKE_STRONG} strokeWidth="1.2" />
    </IconShell>
  )
}

const ICON_RENDERERS: Record<LocalWeatherIconName, (props: WeatherIconSvgProps) => ReactElement> = {
  sunny: SunnyIcon,
  clearNight: ClearNightIcon,
  partlyCloudyDay: PartlyCloudyDayIcon,
  partlyCloudyNight: PartlyCloudyNightIcon,
  cloudy: CloudyIcon,
  rain: RainIcon,
  drizzle: DrizzleIcon,
  thunder: ThunderIcon,
  hail: HailIcon,
  snow: SnowIcon,
  fog: FogIcon,
  wind: WindIcon,
  tornado: TornadoIcon,
}

export function GeneratedWeatherIcon({
  name,
  className,
}: {
  name: LocalWeatherIconName
  className?: string
}) {
  const Icon = ICON_RENDERERS[name]
  return <Icon className={className} />
}
