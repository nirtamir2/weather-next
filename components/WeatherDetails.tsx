import { css } from "linaria";
import React from "react";

import { ICityCurrentWeather } from "../types";
import { getTemperatureBackgroundColor } from "./getTemperatureBackgroundColor";

interface IProps {
  data: ICityCurrentWeather;
}

const temperatureCss = css`
  font-size: 60px;
`;

const cityNameCss = css`
  font-size: 40px;
`;
export function WeatherDetails(props: IProps) {
  const { data } = props;
  return (
    <div>
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
