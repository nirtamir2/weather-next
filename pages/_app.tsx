import App, { AppProps } from "next/app";
import React from "react";

import "../styles/variables.css";
import "../styles/global.css";

export default class MyApp extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
