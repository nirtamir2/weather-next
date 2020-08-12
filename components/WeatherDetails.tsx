import { css } from "linaria";
import React from "react";

import { ICityCurrentWeather } from "../types";
import { getTemperatureBackgroundColor } from "./getTemperatureBackgroundColor";

interface IProps {
  data: ICityCurrentWeather;
}

const containerCSS = css`
  height: 150px;
`;
const temperatureCss = css`
  font-size: var(--font-size-huge);
`;

const cityNameCss = css`
  font-size: var(--font-size-large);
`;

export function WeatherDetails(props: IProps) {
  const { data } = props;
  return (
    <div className={containerCSS}>
      <div className={cityNameCss}>{data.name}</div>
      <div
        className={temperatureCss}
        style={{
          color: getTemperatureBackgroundColor(data.main.temp),
        }}
      >
        {data.main.temp}°
      </div>
    </div>
  );
}
