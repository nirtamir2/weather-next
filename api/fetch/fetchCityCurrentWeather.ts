import { CityT, ICityCurrentWeather } from "../../types";

export async function fetchCityCurrentWeather(
  _: "cityCurrentWeather",
  cityName: CityT
) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
  );
  const responseData: ICityCurrentWeather = await response.json();
  return responseData;
}
