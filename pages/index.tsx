import { css } from "linaria";
import Head from "next/head";

import { useCityCurrentWeather } from "../api";
import { Layout } from "../components";

const containerCss = css`
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  background-color: var(--theme-bg-color);
  overflow: hidden;
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
      <Layout>
        <div>
          {isSuccess ? JSON.stringify(data) : null}
          {isError ? JSON.stringify(error) : null}
          {isLoading ? "Loading" : null}
        </div>
      </Layout>
    </div>
  );
}

export default Home;
