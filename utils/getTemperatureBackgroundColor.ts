import { transformRange } from "./index";

export function getTemperatureBackgroundColor(temperature: number) {
  const MIN_TEMP = -5;
  const MAX_TEMP = 40;

  const MIN_HUE = 155;
  const MAX_HUE = 355;

  const hue = transformRange({
    value: temperature,
    inputRange: [MIN_TEMP, MAX_TEMP],
    outputRange: [MIN_HUE, MAX_HUE],
  });

  return `hsl(${360 - hue},80%,60%)`;
}
