import { QueryOptions, useQuery } from "react-query";

import { ICityCurrentWeather } from "../types";
import { fetchCityCurrentWeather } from "./fetch/fetchCityCurrentWeather";

export function useCityCurrentWeather(
  cityName: string,
  config?: QueryOptions<ICityCurrentWeather>
) {
  return useQuery<ICityCurrentWeather, ["cityCurrentWeather", string]>({
    queryKey: ["cityCurrentWeather", cityName],
    queryFn: fetchCityCurrentWeather,
    config,
  });
}
