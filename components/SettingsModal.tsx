"use client"

import React from "react"
import { X } from "lucide-react"

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

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`w-full max-w-md rounded-lg ${isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"} p-[3vh] shadow-xl`}
      >
        <div className="mb-[2vh] flex items-center justify-between">
          <h2 className="text-[3vh] font-bold">设置</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-[3vh] w-[3vh]" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-[2vh]">
            <label className="mb-[1vh] block text-[2vh] font-bold">主题</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={isDarkTheme}
                  onChange={() => setIsDarkTheme(true)}
                  className="mr-[1vh] h-[2vh] w-[2vh]"
                />
                <span className="text-[2vh]">暗色</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={!isDarkTheme}
                  onChange={() => setIsDarkTheme(false)}
                  className="mr-[1vh] h-[2vh] w-[2vh]"
                />
                <span className="text-[2vh]">亮色</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded-md ${
              isDarkTheme ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
            } px-[2vh] py-[1.5vh] text-[2vh] font-bold`}
          >
            保存设置
          </button>
        </form>
      </div>
    </div>
  )
}

