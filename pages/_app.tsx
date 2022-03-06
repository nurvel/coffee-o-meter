//import Layout from "../components/layout";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider } from "@mantine/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const queryClient = React.useRef(new QueryClient());

  return (
    //    <Layout>
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          {" "}
          {/* Place in cache in all components */}
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "light",
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
    //    </Layout>
  );
}
