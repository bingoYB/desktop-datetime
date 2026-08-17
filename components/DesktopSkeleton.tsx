import { cn } from "@/lib/utils"

export function DesktopSkeleton() {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-x-hidden overflow-y-auto transition-colors duration-500 lg:h-screen lg:overflow-hidden",
        "bg-[#040712] text-slate-100"
      )}
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-[-12%] h-72 w-72 rounded-full blur-3xl bg-cyan-400/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18%] right-[-8%] h-96 w-96 rounded-full blur-3xl bg-indigo-500/25"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1680px] flex-col lg:h-screen lg:min-h-0 p-2.5 sm:p-3.5 lg:p-3 xl:p-4 2xl:p-6">
        <main className="grid gap-3 sm:gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)]">
          {/* Left: Calendar Skeleton */}
          <section className="rounded-2xl sm:rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl p-3 sm:p-4 md:p-5 lg:p-4 xl:p-6 flex flex-col justify-between h-full min-h-0">
            {/* Header Skeleton */}
            <div className="mb-2 sm:mb-3 grid grid-cols-[1fr_auto_1fr] items-center shrink-0 gap-1.5 sm:gap-2">
              <div className="flex items-center justify-start">
                <div className="h-6 sm:h-7 w-20 sm:w-28 rounded-lg bg-slate-800 animate-pulse" />
              </div>
              <div className="flex items-center justify-center">
                <div className="h-5 sm:h-6 w-24 sm:w-32 rounded-md bg-slate-800/70 animate-pulse" />
              </div>
              <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-800 animate-pulse" />
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-800 animate-pulse" />
              </div>
            </div>

            {/* Weekdays Skeleton */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2 pb-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-slate-800/60 animate-pulse mx-auto w-6" />
              ))}
            </div>

            {/* Calendar Grid Skeleton */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 min-h-0 my-1 sm:my-1.5 lg:flex-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="min-h-[44px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-0 h-full rounded-lg sm:rounded-xl border border-slate-800/50 bg-slate-800/30 animate-pulse"
                />
              ))}
            </div>

            {/* Yi/Ji Skeleton */}
            <div className="mt-2 sm:mt-3 rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-800/40 p-2.5 sm:p-3 shrink-0">
              <div className="h-3 w-16 rounded bg-slate-800 animate-pulse mb-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="h-4 rounded bg-slate-800/60 animate-pulse" />
                <div className="h-4 rounded bg-slate-800/60 animate-pulse" />
              </div>
            </div>
          </section>

          {/* Right: Clock & Weather Skeleton */}
          <section className="flex flex-col gap-3 sm:gap-4 lg:min-h-0 lg:h-full">
            {/* Clock Panel Skeleton - 左右布局与高度扩展 */}
            <section className="rounded-2xl sm:rounded-3xl border border-slate-700/60 bg-slate-900/75 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl p-4 sm:p-6 md:p-7 lg:p-4.5 xl:p-7 2xl:p-8 shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-6 lg:gap-3 xl:gap-8">
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                    <div className="h-3.5 w-10 sm:w-12 rounded bg-slate-800 animate-pulse" />
                    <div className="h-5 w-14 sm:w-16 rounded-full bg-slate-800 animate-pulse" />
                  </div>
                  <div className="h-7 sm:h-9 w-40 sm:w-56 lg:w-40 xl:w-56 rounded bg-slate-800 animate-pulse" />
                  <div className="mt-1.5 h-5 w-20 sm:w-24 rounded bg-slate-800/60 animate-pulse" />
                </div>
                <div className="shrink-0 flex items-center sm:justify-end">
                  <div className="h-11 sm:h-14 md:h-16 lg:h-10 xl:h-16 2xl:h-20 w-52 sm:w-64 lg:w-48 xl:w-64 2xl:w-80 rounded-lg bg-slate-800 animate-pulse" />
                </div>
              </div>
            </section>

            {/* Weather Panel Skeleton */}
            <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl p-3.5 sm:p-4 md:p-5 lg:p-4 xl:p-5 lg:h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3.5 w-16 rounded bg-slate-800 animate-pulse" />
                <div className="h-4 w-20 rounded bg-slate-800 animate-pulse" />
              </div>
              <div className="mt-2 flex-1 rounded-xl sm:rounded-2xl border border-slate-800/80 bg-slate-800/30 p-4 animate-pulse flex flex-col justify-center items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800" />
                <div className="h-4 w-32 rounded bg-slate-800" />
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  )
}
