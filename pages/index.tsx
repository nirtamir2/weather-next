import { css } from "linaria";
import Head from "next/head";

import { useCityCurrentWeather } from "../api";

const containerCss = css`
  height: 100vh;
  max-width: 1600px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  background-color: var(--theme-bg-color);
  overflow: hidden;
`;

const headerCss = css`
  height: 80px;
  padding: var(--gutter);

  display: grid;
  grid-gap: var(--gutter);
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--border-color);
`;

const headerTitleCss = css`
  margin: 0;
  font-size: 22px;
  color: var(--body-color);
`;

const buttonCss = css`
  border-radius: var(--gutter);
  padding: var(--gutterSmall);
  background-color: var(--button-bg-color);
  outline: none;

  border: 1px solid transparent;

  color: var(--button-color);
  font-size: inherit;
  font-family: inherit;

  transition-duration: var(--transition-fast);
  transition-property: border-color, background-color;

  &:hover {
    background-color: var(--body-bg-color);
    border-color: var(--button-color);
  }

  &:focus {
    border-color: var(--button-color);
  }

  &:focus:not(:active) {
    transform: translateY(-1px);
  }
`;

export function Home() {
  const { data, isLoading, error, isError, isSuccess } = useCityCurrentWeather(
    "London"
  );
  return (
    <div className={containerCss}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <header className={headerCss}>
          <h1 className={headerTitleCss}>Weather App</h1>
          <button className={buttonCss}>Add City</button>
        </header>

      <main>

        {isSuccess ? JSON.stringify(data) : null}
        {isError ? JSON.stringify(error) : null}
        {isLoading ? "Loading" : null}
      </main>
    </div>
  );
}

export default Home;
