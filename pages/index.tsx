import cx from "classnames";
import { css } from "linaria";
import Head from "next/head";
import React from "react";

import { useCityCurrentWeather } from "../api";
import { Layout } from "../components";

const CIRCLE_SIZE = 50;

const containerCss = css`
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  background-color: var(--theme-bg-color);
  overflow: hidden;
`;

const listItemCss = css`
  padding: var(--gutter);

  display: grid;
  grid-gap: var(--gutter);
  align-items: center;
  justify-content: start;
  grid-auto-columns: auto;
  grid-auto-flow: column;

  border-bottom: 2px solid transparent;
`;

const listItemAnimatedCss = css`
  animation: slideUp 0.6s both;
  @keyframes slideUp {
    0% {
      transform: translateY(76px) scale(0.92);
      opacity: 0;
    }
  }
`;

const listCss = css`
  list-style: none;
`;

const contentCss = css`
  display: grid;
  grid-gap: var(--gutter);
  grid-auto-flow: column;
  grid-template-columns: auto 1fr;
`;

const circleCss = css`
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;

  border-radius: var(--border-radius-rounded);
  border: 1px solid var(--border-color);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Home() {
  const { data, isLoading, error, isError, isSuccess } = useCityCurrentWeather(
    "London"
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cities, setCities] = React.useState<string[]>([
    "Tel Aviv",
    "Paris",
    "London",
    "Berlin",
    "New York",
    "Rome",
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _temperatures = cities.reduce(
    (prev, current) => ({
      ...prev,
      [current]: data ? data.base : null,
    }),
    {}
  );

  const [shouldAnimateList, setShouldAnimateList] = React.useState(true);

  return (
    <div className={containerCss}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={contentCss}>
          <ul className={listCss}>
            {cities.map((c, index) => {
              function handleListAnimationEnd(
                e: React.AnimationEvent<HTMLLIElement>
              ) {
                if (e.target === e.currentTarget) {
                  setShouldAnimateList(false);
                }
              }
              return (
                <li
                  key={c}
                  className={cx(listItemCss, {
                    [listItemAnimatedCss]: shouldAnimateList,
                  })}
                  style={{
                    animationDelay: `${index * 0.14}s`,
                    backgroundPositionY: `${index * 100}px`,
                    // backgroundRepeat: "no-repeat",
                    backgroundSize: "auto 1000px",
                    background: `linear-gradient(to bottom, #df3341 0%,#d4f355 50%,#61c0ec 100%)`,
                  }}
                  onAnimationEnd={
                    index === cities.length - 1
                      ? (e) => handleListAnimationEnd(e)
                      : undefined
                  }
                >
                  <div className={circleCss}>icon</div>
                  <div>{c}</div>
                  <div>{25} °C</div>
                </li>
              );
            })}
          </ul>
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
