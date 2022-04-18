import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { Component } from "react";
import "../components/css/toggle.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
