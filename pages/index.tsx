import GoogleMapReact from "google-map-react";
import { css } from "linaria";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import { ConditionallyRender, Layout } from "../components";

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
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  background-color: var(--theme-bg-color);
`;

const contentCss = css`
  display: grid;
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

function Marker({
  children,
}: {
  lat: number;
  lng: number;
  children: JSX.Element;
}) {
  return children;
}

export function Home() {
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
          <ConditionallyRender client>
            <FavoritesList
              cities={cities}
              onChangeCities={handleChangeCities}
            />
          </ConditionallyRender>
          <div>
            <ConditionallyRender client>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
                }}
                defaultCenter={{ lat: 32.017136, lng: 34.745441 }}
                defaultZoom={7}
              >
                {cities.map((c) => {
                  return (
                    <Marker key={c} lat={32} lng={34.74}>
                      <div>{c}</div>
                    </Marker>
                  );
                })}
              </GoogleMapReact>
            </ConditionallyRender>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
