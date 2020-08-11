import { css } from "linaria";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import { useCityCurrentWeather } from "../api";
import { Layout } from "../components";

const FavoritesList = dynamic(
  async () => {
    const { ClientOnlyFavoritesList } = await import(
      "../components/client-only/ClientOnlyFavoritesList"
    );
    return ClientOnlyFavoritesList;
  },
  { ssr: false }
);

const containerCss = css`
  min-height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  background-color: var(--theme-bg-color);
  overflow: hidden;
`;

const contentCss = css`
  display: grid;
  grid-gap: var(--gutter);
  grid-auto-flow: column;
  grid-template-columns: auto 1fr;
`;

const CITIES = [
  "Tel Aviv",
  "Paris",
  "London",
  "Berlin",
  "New York",
  "Rome",
  "Dublin",
  "Madrid",
  "Barcelona",
  "Bat Yam",
  "Jerusalem",
];

export function Home() {
  const { data, isLoading, error, isError, isSuccess } = useCityCurrentWeather(
    "London"
  );

  const [cities, setCities] = React.useState<string[]>(CITIES);

  function handleChangeCities(cities: string[]) {
    setCities(cities);
  }

  return (
    <div className={containerCss}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={contentCss}>
          <FavoritesList cities={cities} onChangeCities={handleChangeCities} />
          <div>
            <div>Map</div>
            <div>
              {isSuccess ? JSON.stringify(data) : null}
              {isError ? JSON.stringify(error) : null}
              {isLoading ? "Loading" : null}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
