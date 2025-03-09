import { getLocation } from "@/lib/utils";
import { get7DaysWeather, getTodayWeather, queryCity } from "@/service";
import { useRequest } from "ahooks";

export function useLocation() {
  const { data: location } = useRequest(async () => {
    const location = await getLocation();

    // const cityInfo = await queryCity(`${location?.longitude},${location?.latitude}`);

    return {
      // city: cityInfo.location,
      location: `${location?.longitude},${location?.latitude}`,
    };
  });

  return location;
}

export function useWeather() {
  const location = useLocation();

  const { data: weather } = useRequest(
    async () => {
      if (location) {
        const [today, forecast ] = await Promise.all([
          getTodayWeather(location.location),
          get7DaysWeather(location.location),
        ]);

        return {today, forecast };
      }
    },
    {
      refreshDeps: [location],
    }
  );

  return weather;
}
