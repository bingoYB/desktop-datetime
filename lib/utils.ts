import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocation(): Promise<{ latitude: number; longitude: number } | null> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return null
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      () => resolve(null),
      {
        maximumAge: 5 * 60 * 1000,
        timeout: 8 * 1000,
      }
    )
  })
}
