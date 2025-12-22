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
  /** 状态码 */
  code: number;
  /** 日期ID，格式：YYYYMMDD */
  id: string;

  // ========== 阳历信息 ==========
  /** 阳历年 */
  ynian: string;
  /** 阳历月 */
  yyue: string;
  /** 阳历日 */
  yri: string;
  /** 星期几（数字：1-7） */
  WEEKJ: string;
  /** 星期几（中文：一、二、三...） */
  xingqi: string;
  /** 是否闰年 */
  YLLEAP: string;
  /** 节日 */
  jieri: string;
  /** 星座 */
  xingzuo: string;
  /** 当年第几周（ISO标准） */
  YLWEEKNOR: string;
  /** 当年第几周 */
  YLWEEKNOY: string;
  /** 全年天数 */
  DAYSOFYEAR: string;
  /** 当年第几天 */
  DAYSINYEAR: string;

  // ========== 农历信息 ==========
  /** 农历年（数字） */
  YIYEAR: string;
  /** 农历年（中文） */
  nnian: string;
  /** 农历月（数字） */
  YIMONTH: string;
  /** 农历月（中文） */
  nyue: string;
  /** 农历日（数字） */
  YIDAY: string;
  /** 农历日（中文） */
  nri: string;
  /** 农历节日 */
  YIFESTIVAL: string;

  // ========== 干支信息 ==========
  /** 年干支 */
  YEARGANZHI: string;
  /** 年干支 */
  ganzhinian: string;
  /** 年干支（精确） */
  YEARINGANZHIEXACT: string;
  /** 月干支 */
  ganzhiyue: string;
  /** 月干支（精确） */
  MONTHINGANZHIEXACT: string;
  /** 日干支 */
  ganzhiri: string;
  /** 日干支（精确） */
  DAYINGANZHIEXACT: string;
  /** 日干支（精确2） */
  DAYINGANZHIEXACT2: string;
  /** 日禄 */
  DAYLU: string;
  /** 日生肖 */
  DAYSHENGXIAO: string;

  // ========== 节气信息 ==========
  /** 节气（中文描述） */
  JIEQICN: string;
  /** 节气名称 */
  jieqi: string;
  /** 节气第几天 */
  JIEQIDAYS: string;
  /** 物候 */
  WUHOU: string;
  /** 数九 */
  SHUJIU: string;
  /** 伏 */
  FU: string;
  /** 节气详细信息 */
  jieqimsg: string;

  // ========== 六曜信息 ==========
  /** 六曜 */
  liuyao: string;
  /** 六曜2 */
  LIUYAO2: string;

  // ========== 星宿信息 ==========
  /** 星宿 */
  XIU: string;
  /** 星宿对应动物 */
  XIUANIMAL: string;
  /** 星宿吉凶 */
  XIULUCK: string;
  /** 星宿歌诀 */
  XIUSONG: string;
  /** 星宿（详细） */
  xingxiu: string;
  /** 政 */
  ZHENG: string;
  /** 宫 */
  GONG: string;
  /** 兽/七曜 */
  SHOU: string;

  // ========== 彭祖百忌 ==========
  /** 彭祖百忌（干） */
  PENGZUGAN: string;
  /** 彭祖百忌（支） */
  PENGZUZHI: string;
  /** 彭祖百忌（完整） */
  pengzu: string;

  // ========== 方位信息 ==========
  /** 喜神方位 */
  DAYPOSITIONXI: string;
  /** 阳贵神方位 */
  DAYPOSITIONYANGGUI: string;
  /** 阴贵神方位 */
  DAYPOSITIONYINGUI: string;
  /** 福神方位 */
  DAYPOSITIONFU: string;
  /** 财神方位 */
  DAYPOSITIONCAI: string;
  /** 胎神方位（月） */
  MONTHPOSITIONTAI: string;
  /** 胎神方位 */
  taishen: string;
  /** 太岁方位 */
  DAYPOSITIONTAISUI: string;

  // ========== 冲煞信息 ==========
  /** 冲煞描述 */
  DAYCHONGDESC: string;
  /** 冲煞干 */
  DAYCHONGGAN: string;
  /** 冲煞干贴 */
  DAYCHONGGANTIE: string;
  /** 相冲 */
  xiangchong: string;

  // ========== 纳音五行 ==========
  /** 日纳音 */
  DAYNAYIN: string;
  /** 年五行 */
  nianwuxing: string;
  /** 月五行 */
  yuewuxing: string;
  /** 日五行 */
  riwuxing: string;

  // ========== 旬空信息 ==========
  /** 日旬 */
  DAYXUN: string;
  /** 日旬（精确） */
  DAYXUNEXACT: string;
  /** 日旬空 */
  DAYXUNKONG: string;
  /** 日旬空（精确） */
  DAYXUNKONGEXACT: string;

  // ========== 建除十二神 ==========
  /** 执位 */
  ZHIXING: string;
  /** 十二神 */
  shiershen: string;

  // ========== 天神信息 ==========
  /** 日天神 */
  DAYTIANSHEN: string;
  /** 日天神类型（黄道/黑道） */
  DAYTIANSHENTYPE: string;
  /** 日天神吉凶 */
  DAYTIANSHENLUCK: string;

  // ========== 宜忌信息 ==========
  /** 宜（用|分隔） */
  yi: string;
  /** 忌（用|分隔） */
  ji: string;
  /** 日吉神 */
  DAYJISHEN: string;
  /** 日凶煞 */
  DAYXIONGSHA: string;

  // ========== 其他信息 ==========
  /** 月相 */
  YUEXIANG: string;
  /** 日九星 */
  DAYNINESTAR: string;
  /** 佛历 */
  FOTO: string;
  /** 道历 */
  TAO: string;
  /** 季节 */
  jijie: string;
  /** 儒略日 */
  rulueri: string;
  /** 伊斯兰历 */
  yisilan: string;
  /** 生肖 */
  shengxiao: string;
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
        return res.daily.map(item=>({
          ...item,
          date: item.fxDate.slice(5, 10),
        }));
      }
    });
}
