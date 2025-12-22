import { useEffect, useMemo, useState } from "react";
import { useRequest } from "ahooks";
import { getMonth } from "@/service";

const weekDaysFull = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化日期和时间
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const date = currentTime.getDate();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const day = currentTime.getDay();

  return {
    currentTime,
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    day,
  };
}

export function useCalendar() {
  const currentTime = useCurrentTime();

  const { data: calendars } = useRequest(async () => {
    const res = await getMonth();

    const calendarDate = res.data.map((date) => {
      // 24节气
      const jieqi = date.jieqimsg.includes("第1天") ? date.jieqi : "";
      // 节日
      const jieri = date.jieri.split("|")[0];

      return {
        day: Number(date.yri),
        week: +date.WEEKJ,
        bottom:
          (jieri?.length > 5 ? "" : jieri) || // 节日
          jieqi ||
          (date.nri === "初一" ? date.nyue : date.nri), // 初一展示月份
        yi: date.yi.split("|").join("，"),
        ji: date.ji.split("|").join("， "),
      };
    });

    return calendarDate;
  }, {
    refreshDeps: [currentTime.month],
  });

  const todayInfo = useMemo(() => {
    return calendars?.find((item) => item.day === currentTime?.date);
  }, [calendars, currentTime?.date]);

  return {
    calendars,
    currentTime,
    todayInfo,
  };
}
