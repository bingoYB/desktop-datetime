const ApiHost = "https://hono-date.bingoying666.workers.dev";

export interface SolarTermsResponse {
  status: number;
  msg: string;
  result: {
    now: {
      name: string;
      time: string;
      lunar: [string, string, string, string, number, number, string, number];
    };
    list: {
      jieqiid: number;
      name: string;
      pic: string;
      time: string;
    }[];
    song: string;
  };
  ordersign: {
    userid: string;
    apiid: string;
    nums: string;
  };
}

/**
 * 获取24节气信息
 * @returns
 */
export async function getDate() {
  const res = await fetch(ApiHost + "/calendar/solar-terms");
  const data = await res.json();
  return data as SolarTermsResponse;
}

export interface IDateInfo {
  code: number;
  ynian: string;
  yyue: string;
  yri: string;
  nyue: string;
  nri: string;
  ganzhinian: string;
  ganzhiyue: string;
  ganzhiri: string;
  xingqi: string;
  yi: string;
  ji: string;
  jieri: string;
  shengxiao: string;
  xingzuo: string;
  xiangchong: string;
  jijie: string;
  nianwuxing: string;
  yuewuxing: string;
  riwuxing: string;
  xingxiu: string;
  liuyao: string;
  shiershen: string;
  rulueri: string;
  yisilan: string;
  pengzu: string;
  taishen: string;
  jieqi: string;
  jieqimsg: string;
}

export async function getTodayInfo() {
  const res = await fetch(ApiHost + "/calendar/today");
  const data = await res.json();
  return data as IDateInfo;
}

export interface WeatherResponse {
  code: string;
  updateTime: string;
  fxLink: string;
  now: {
    obsTime: string;
    temp: string;
    feelsLike: string;
    icon: string;
    text: string;
    wind360: string;
    windDir: string;
    windScale: string;
    windSpeed: string;
    humidity: string;
    precip: string;
    pressure: string;
    vis: string;
    cloud: string;
    dew: string;
  };
  refer: {
    sources: string[];
    license: string[];
  };
}

export interface Location {
  name: string;
  id: string;
  lat: string;
  lon: string;
  adm2: string;
  adm1: string;
  country: string;
  tz: string;
  utcOffset: string;
  isDst: string;
  type: string;
  rank: string;
  fxLink: string;
}

export interface Refer {
  sources: string[];
  license: string[];
}

export async function queryCity(location: string): Promise<{
  code: string;
  location: Location[];
  refer: Refer;
}> {
  return fetch(ApiHost + "/city/lookup?location=" + location).then((res) =>
    res.json()
  );
}

export async function getTodayWeather(location: string) {
  const res = await fetch(ApiHost + "/weather/now?location=" + location);
  const data: WeatherResponse = await res.json();
  return data.code === "200" ? data.now : null;
}

export async function getMonth(): Promise<{
  code: number;
  data: IDateInfo[];
}> {
  const date = new Date();
  const month = date.getMonth() >= 12 ? 1 : date.getMonth() + 1;

  return fetch(
    ApiHost + "/month?month=" + `${date.getFullYear()}-${month}`
  ).then((res) => res.json());
}

interface Daily {
  fxDate: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonPhaseIcon: string;
  tempMax: string;
  tempMin: string;
  iconDay: string;
  textDay: string;
  iconNight: string;
  textNight: string;
  wind360Day: string;
  windDirDay: string;
  windScaleDay: string;
  windSpeedDay: string;
  wind360Night: string;
  windDirNight: string;
  windScaleNight: string;
  windSpeedNight: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  uvIndex: string;
}

export function get7DaysWeather(location: string) {
  return fetch(ApiHost + "/weather/7day?location=" + location)
    .then(
      (res) =>
        res.json() as Promise<{
          code: string;
          updateTime: string;
          fxLink: string;
          daily: Daily[];
          refer: Refer;
        }>
    )
    .then((res) => {
      if (res.code === "200") {
        return res.daily;
      }
    });
}
