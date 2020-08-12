import React from "react";
import ContentLoader from "react-content-loader";

export function WeatherLoading() {
  return (
    <ContentLoader
      speed={2}
      width={500}
      height={150}
      viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect y="8" rx="3" ry="3" width="120" height="50" />
      <rect y="86" rx="3" ry="3" width="140" height="60" />
    </ContentLoader>
  );
}
