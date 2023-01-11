import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <Head>
        <title>Health Recoder</title>
        <meta charSet="utf-8" />
        <meta name="description" content="健康管理アプリ" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}
