import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocation(): Promise<{ latitude: number; longitude: number } | undefined> {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject();
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
