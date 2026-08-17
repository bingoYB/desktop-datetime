"use client"

import type { FormEvent } from "react"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type ContentPaddingLevel = "compact" | "default" | "spacious"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkTheme: boolean
  setIsDarkTheme: (isDark: boolean) => void
  contentPaddingLevel: ContentPaddingLevel
  setContentPaddingLevel: (level: ContentPaddingLevel) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  isDarkTheme,
  setIsDarkTheme,
  contentPaddingLevel,
  setContentPaddingLevel,
}: SettingsModalProps) {
  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onClose()
  }

  const paddingOptions: Array<{
    value: ContentPaddingLevel
    label: string
    description: string
  }> = [
    { value: "compact", label: "紧凑", description: "更高信息密度" },
    { value: "default", label: "标准", description: "默认推荐" },
    { value: "spacious", label: "宽松", description: "更留白舒适" },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          "w-full max-w-md rounded-3xl border p-5 sm:p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300",
          isDarkTheme
            ? "border-slate-700/80 bg-slate-900/95 text-slate-100 shadow-[0_16px_48px_0_rgba(0,0,0,0.6)]"
            : "border-amber-200/90 bg-white/95 text-slate-900 shadow-[0_16px_48px_0_rgba(0,0,0,0.12)]"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">显示与布局设置</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭设置"
            className={cn(
              "inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-colors",
              isDarkTheme ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
            )}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400">
              主题风格
            </legend>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:gap-3">
              <label
                className={cn(
                  "cursor-pointer rounded-2xl border p-3 sm:p-3.5 text-sm transition-all flex items-center justify-between",
                  isDarkTheme
                    ? "border-cyan-400/80 bg-cyan-500/15 shadow-sm ring-1 ring-cyan-400/30 text-slate-100"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
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
                <span className="font-medium">暗色主题</span>
                {isDarkTheme && <Check className="h-4 w-4 text-cyan-400" />}
              </label>

              <label
                className={cn(
                  "cursor-pointer rounded-2xl border p-3 sm:p-3.5 text-sm transition-all flex items-center justify-between",
                  !isDarkTheme
                    ? "border-amber-400/90 bg-amber-500/15 shadow-sm ring-1 ring-amber-400/30 text-amber-950 font-semibold"
                    : "border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700"
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
                <span className="font-medium">亮色主题</span>
                {!isDarkTheme && <Check className="h-4 w-4 text-amber-600" />}
              </label>
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400">
              内容留白密度
            </legend>
            <div className="mt-2.5 grid grid-cols-3 gap-2 sm:gap-2.5">
              {paddingOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-2.5 sm:p-3 text-center transition-all",
                    contentPaddingLevel === option.value
                      ? isDarkTheme
                        ? "border-cyan-400/80 bg-cyan-500/15 ring-1 ring-cyan-400/30 text-slate-100"
                        : "border-amber-400/90 bg-amber-500/15 ring-1 ring-amber-400/30 text-amber-950"
                      : isDarkTheme
                        ? "border-slate-800 bg-slate-800/50 text-slate-300 hover:border-slate-700"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                  )}
                >
                  <input
                    type="radio"
                    name="contentPadding"
                    value={option.value}
                    checked={contentPaddingLevel === option.value}
                    onChange={() => setContentPaddingLevel(option.value)}
                    className="sr-only"
                  />
                  <p className="font-medium text-xs sm:text-sm">{option.label}</p>
                  <p className="mt-0.5 text-[10px] sm:text-xs opacity-75">{option.description}</p>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className={cn(
              "mt-6 w-full rounded-2xl py-3 text-sm font-semibold shadow-lg transition-all active:scale-[0.99]",
              isDarkTheme
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-cyan-500/20"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-orange-500/20"
            )}
          >
            完成
          </button>
        </form>
      </div>
    </div>
  )
}

