import { clamp } from "ramda";

export function transformRange(params: {
  value: number;
  inputRange: [number, number];
  outputRange: [number, number];
}) {
  const { value, inputRange, outputRange } = params;

  const [startInput, endInput] = inputRange;
  const [startOutput, endOutput] = outputRange;
  const clampedValue = clamp(startInput, endInput, value);

  const slope = (clampedValue - startInput) / (endInput - startInput);

  return startOutput + slope * (endOutput - startOutput);
}
