import { ICityCurrentWeather } from "../../types";

export async function fetchCityCurrentWeather(
  _: "cityCurrentWeather",
  cityName: string
) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}&q=${cityName}&units=metric&`
  );
  const responseData: ICityCurrentWeather = await response.json();
  return responseData;
}
