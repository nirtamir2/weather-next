import Head from "next/head";

import { useCityCurrentWeather } from "../api";

export function Home() {
  const { data, isLoading, error, isError, isSuccess } = useCityCurrentWeather(
    "London"
  );
  return (
    <div className="container">
      {isSuccess ? JSON.stringify(data) : null}
      {isError ? JSON.stringify(error) : null}
      {isLoading ? "Loading" : null}
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="header">
          <h1>Weather App</h1>
          <button>Add City</button>
        </header>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .header {
          height: 100px;
          width: 100%;
          border-bottom: 1px solid var(--border-color);
        }
      `}</style>
    </div>
  );
}

export default Home;
