import { QueryOptions, useQuery } from "react-query";

import { CityT, ICityCurrentWeather } from "../types";
import { fetchCityCurrentWeather } from "./fetch/fetchCityCurrentWeather";

export function useCityCurrentWeather(
  cityName: CityT,
  config?: QueryOptions<ICityCurrentWeather>
) {
  return useQuery<ICityCurrentWeather, ["cityCurrentWeather", CityT]>({
    queryKey: ["cityCurrentWeather", cityName],
    queryFn: fetchCityCurrentWeather,
    config,
  });
}
