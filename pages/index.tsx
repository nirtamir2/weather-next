import GoogleMapReact from "google-map-react";
import { css } from "linaria";
import Head from "next/head";
import React from "react";
import Select from "react-select";

import { useCityCurrentWeather } from "../api";
import StarIcon from "../assets/star-24px.svg";
import StarOutlineIcon from "../assets/star_outline-24px.svg";
import { Layout } from "../components";
import { ButtonIcon } from "../components/ButtonIcon";
import { FavoritesList } from "../components/FavoritesList";
import { Marker } from "../components/Marker";
import { WeatherDetails } from "../components/WeatherDetails";
import { WeatherLoading } from "../components/WeatherLoading";
import { getTemperatureBackgroundColor } from "../components/getTemperatureBackgroundColor";
import { ICityCurrentWeather } from "../types";

const containerCss = css`
  display: flex;
  flex-direction: column;

  background-color: var(--theme-bg-color);
`;

const contentCss = css`
  height: 100%;

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 400px 1fr;
`;

const CITIES = [
  { value: "Tel Aviv", label: "Tel Aviv" },
  { value: "Paris", label: "Paris" },
  { value: "London", label: "London" },
  { value: "Berlin", label: "Berlin" },
  { value: "New York", label: "New York" },
  { value: "Rome", label: "Rome" },
  { value: "Madrid", label: "Madrid" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Moscow", label: "Moscow" },
  { value: "Beijing", label: "Beijing" },
  { value: "New Delhi", label: "New Delhi" },
  { value: "Brasília", label: "Brasília" },
  { value: "Bat Yam", label: "Bat Yam" },
  { value: "Jerusalem", label: "Jerusalem" },
];

const detailsCss = css`
  border-radius: var(--border-radius);
  padding: var(--gutter);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--theme-bg-color);
`;

const selectContainerCss = css`
  display: grid;
  grid-gap: var(--gutter);
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
`;

const selectCss = css`
  width: 200px;
`;

const mapCss = css`
  height: 100%;
`;

const markerCss = css`
  height: 50px;
  width: 50px;
  padding: var(--gutter);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-rounded);
  background-color: var(--theme-bg-color);
`;

export function Home() {
  const [selectedCity, setSelectedCity] = React.useState(CITIES[0]);
  const [favoriteCities, setFavoriteCities] = React.useState<
    ICityCurrentWeather[]
  >([]);
  const { data, error, isLoading, isSuccess, isError } = useCityCurrentWeather(
    selectedCity.value
  );

  const isFavoriteCity = favoriteCities.some(
    (c) => c.name === selectedCity.value
  );

  function addToFavorites() {
    if (!isSuccess || data == null) {
      return;
    }
    setFavoriteCities((c) => [...c, data]);
  }

  function removeFromFavorites() {
    if (!isSuccess || data == null) {
      return;
    }
    setFavoriteCities((c) => c.filter((c) => c.id !== data.id));
  }

  function handleChangeCities(cities: ICityCurrentWeather[]) {
    setFavoriteCities(cities);
  }

  function handleChangeSelectedCity(c: { value: string; label: string }) {
    return setSelectedCity(c);
  }

  return (
    <div className={containerCss}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={contentCss}>
          <FavoritesList
            cities={favoriteCities}
            onChangeCities={handleChangeCities}
          />
          <div className={detailsCss}>
            <div className={selectContainerCss}>
              <div className={selectCss}>
                <Select
                  name="color"
                  options={CITIES}
                  value={selectedCity}
                  onChange={handleChangeSelectedCity}
                />
              </div>
              <ButtonIcon
                onClick={isFavoriteCity ? removeFromFavorites : addToFavorites}
              >
                {isFavoriteCity ? (
                  <StarIcon height={24} width={24} />
                ) : (
                  <StarOutlineIcon height={24} width={24} />
                )}
              </ButtonIcon>
            </div>
            <div>
              {isLoading ? <WeatherLoading /> : null}
              {isSuccess ? <WeatherDetails data={data} /> : null}
              {isError ? <div>{JSON.stringify(error)}</div> : null}
            </div>
            <div className={mapCss}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
                }}
                defaultCenter={{ lat: 32.017136, lng: 34.745441 }}
                defaultZoom={2}
              >
                {favoriteCities.map((c) => {
                  const { lat, lon } = c.coord;
                  return (
                    <Marker key={c.id} lat={lat} lng={lon}>
                      <div
                        className={markerCss}
                        style={{
                          backgroundColor: getTemperatureBackgroundColor(
                            c.main.temp
                          ),
                        }}
                      >
                        {c.name}
                      </div>
                    </Marker>
                  );
                })}
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
