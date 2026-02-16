"use client"

import type { FormEvent } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkTheme: boolean
  setIsDarkTheme: (isDark: boolean) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  isDarkTheme,
  setIsDarkTheme,
}: SettingsModalProps) {
  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          "w-full max-w-md rounded-3xl border px-5 py-6 shadow-2xl backdrop-blur-xl md:px-6",
          isDarkTheme
            ? "border-slate-700/70 bg-slate-900/95 text-slate-100"
            : "border-amber-200/80 bg-white/95 text-slate-900"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold md:text-2xl">显示设置</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭设置"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              isDarkTheme ? "hover:bg-slate-800" : "hover:bg-slate-100"
            )}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-sm font-medium tracking-[0.14em]">主题</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label
                className={cn(
                  "cursor-pointer rounded-2xl border px-4 py-3 text-sm transition-colors",
                  isDarkTheme
                    ? "border-cyan-300/70 bg-cyan-500/15"
                    : "border-slate-200 bg-white"
                )}
              >
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={isDarkTheme}
                  onChange={() => setIsDarkTheme(true)}
                  className="sr-only"
                />
                暗色主题
              </label>

              <label
                className={cn(
                  "cursor-pointer rounded-2xl border px-4 py-3 text-sm transition-colors",
                  isDarkTheme
                    ? "border-slate-700/70 bg-slate-800"
                    : "border-amber-300/80 bg-amber-50"
                )}
              >
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={!isDarkTheme}
                  onChange={() => setIsDarkTheme(false)}
                  className="sr-only"
                />
                亮色主题
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className={cn(
              "mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
              isDarkTheme
                ? "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                : "bg-slate-900 text-white hover:bg-slate-700"
            )}
          >
            保存设置
          </button>
        </form>
      </div>
    </div>
  )
}
