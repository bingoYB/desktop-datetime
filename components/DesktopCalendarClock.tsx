"use client";

import { useMemo, useState } from "react";
import { Maximize, Minimize, Settings } from "lucide-react";
import { SettingsModal } from "./SettingsModal";
import { useCalendar } from "@/hooks/useCalendar";
import { useWeather } from "@/hooks/useWeather";
import WeatherIcon from "./WeatherIcon";

// 星期几
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
const weekDaysFull = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

export function DesktopCalendarClock() {
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { calendars, currentTime, todayInfo } = useCalendar();
  console.log(".calendars", todayInfo);
  const { year, month, date, hours, minutes, seconds, day } = currentTime;

  const emptyEl = useMemo(() => {
    const arr = [];
    if (calendars?.length) {
      const firstDay = calendars?.[0]?.week;

      for (let i = 1; i < firstDay; i++) {
        arr.push(
          <div
            key={i}
            className={`flex flex-col items-center justify-center py-[0.5vh] invisible`}
          ></div>
        );
      }
    }
    return arr;
  }, [calendars]);

  const weather = useWeather();

  // 获取时间段
  const getPeriod = () => {
    if (hours < 12) return "上午";
    return "下午";
  };

  // 添加点击处理函数
  const toggleControls = () => {
    setShowControls((prev) => !prev);
  };

  // 添加全屏处理函数
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch((err) => {
            console.error(
              `Error attempting to exit fullscreen: ${err.message}`
            );
          });
      }
    }
  };

  // 修改toggleTheme函数为openSettings函数
  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <>
      <div
        className={`relative h-full w-full overflow-hidden rounded-lg ${
          isDarkTheme ? "bg-black text-white" : "bg-white text-black"
        } shadow-xl`}
        onClick={toggleControls}
      >
        <div className='flex h-full flex-col md:flex-row'>
          {/* 左侧日历部分 */}
          <div
            className={`w-full p-[2vh] md:w-1/2 md:border-r ${
              isDarkTheme ? "md:border-gray-700" : "md:border-gray-300"
            }`}
          >
            <div className='mb-[2vh] mt-[1vh]'>
              <div className='text-[2.5vh] font-bold'>
                {year}年{month}月{date}日 {weekDaysFull[day]}
              </div>
            </div>

            {/* 星期标题 */}
            <div className='mb-[1vh] grid grid-cols-7 text-center'>
              {weekDays.map((day, index) => (
                <div key={index} className='text-[1.8vh]'>
                  {day}
                </div>
              ))}
            </div>

            {/* 日历网格 */}
            <div className='grid grid-cols-7 gap-1 text-center'>
              {emptyEl}
              {calendars?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center py-[0.5vh]
                    ${
                      item.day === date
                        ? "bg-red-600 font-bold"
                        : isDarkTheme
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-200"
                    }
                    ${day === null ? "invisible" : ""}
                  `}
                >
                  {item && (
                    <>
                      <div className='text-[1.8vh]'>{item.day}</div>
                      <div
                        className={`text-[1.2vh] ${
                          isDarkTheme ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.bottom}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* 今日宜忌 */}
            <div className='mt-[2vh] space-y-[1vh]'>
              <div className='text-[1.8vh] font-bold'>今日宜忌</div>
              <div className='text-[1.5vh]'>
                <div>
                  <span className='text-green-500'>宜：</span>
                  {todayInfo?.yi}
                </div>
                <div>
                  <span className='text-red-500'>忌：</span>
                  {todayInfo?.ji}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧时间和天气部分 */}
          <div className='w-full p-[2vh] md:w-1/2'>
            {/* 时间显示 - 调整大小并使秒与分钟相同大小 */}
            <div className='mb-[3vh] flex items-end justify-between'>
              <div className='flex items-baseline'>
                <span className='text-[10vh] font-bold'>
                  {hours}:{minutes}:{seconds}
                </span>
              </div>
              <div className='text-[3vh]'>{getPeriod()}</div>
            </div>

            {/* 当前天气 */}
            <div className='mb-[2vh] flex items-center justify-between'>
              <div>
                <div
                  className={`text-[1.8vh] ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  温度: {weather?.forecast?.[0]?.tempMin} ~{" "}
                  {weather?.forecast?.[0]?.tempMax}°C
                </div>
                <div
                  className={`text-[1.8vh] ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  风力等级: {weather?.today?.windScale}
                </div>
                <div
                  className={`text-[1.8vh] ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  风速: {weather?.today?.windSpeed}
                </div>
              </div>
              <div className='flex items-center gap-[1vh]'>
                <div className='flex flex-col items-end'>
                  <div className='text-[4vh] font-bold'>
                    {weather?.today?.temp}°C
                  </div>
                  <div className='text-[1.8vh]'>
                    湿度 {weather?.today?.humidity}%
                  </div>
                </div>
                {weather?.today?.icon && (
                  <WeatherIcon
                    icon={weather?.today?.icon}
                    className='w-[6vh]'
                  />
                )}
              </div>
            </div>

            {/* 天气预报 */}
            <div className='grid grid-cols-3 gap-[1vh]'>
              {weather?.forecast?.map((day, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center rounded-lg ${
                      isDarkTheme ? "bg-gray-900" : "bg-gray-100"
                    } p-[1vh]`}
                  >
                    <div className='text-[1.8vh]'>{day.fxDate}</div>
                    <div className='text-[1.8vh]'>{day.textDay}</div>
                    <WeatherIcon icon={day.iconDay} className='w-[4vh]' />

                    <div className='text-[1.5vh]'>
                      {day.tempMin}-{day.tempMax}°C
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 控制面板 */}
        {showControls && (
          <div
            className='absolute bottom-[2vh] right-[2vh] flex gap-[1vh]'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`flex h-[6vh] w-[6vh] items-center justify-center rounded-full ${
                isDarkTheme
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={openSettings}
              title='打开设置'
            >
              <Settings className='h-[3vh] w-[3vh]' />
            </button>
            <button
              className={`flex h-[6vh] w-[6vh] items-center justify-center rounded-full ${
                isDarkTheme
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={toggleFullscreen}
              title={isFullscreen ? "退出全屏" : "进入全屏"}
            >
              {isFullscreen ? (
                <Minimize className='h-[3vh] w-[3vh]' />
              ) : (
                <Maximize className='h-[3vh] w-[3vh]' />
              )}
            </button>
          </div>
        )}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />
    </>
  );
}
