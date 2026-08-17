"use client"

import dynamic from "next/dynamic"
import { DesktopSkeleton } from "@/components/DesktopSkeleton"

const DesktopCalendarClock = dynamic(
  () => import("@/components/DesktopCalendarClock").then((mod) => mod.DesktopCalendarClock),
  {
    ssr: false,
    loading: () => <DesktopSkeleton />,
  }
)

export default function Home() {
  return (
    <main className="min-h-screen">
      <DesktopCalendarClock />
    </main>
  )
}
