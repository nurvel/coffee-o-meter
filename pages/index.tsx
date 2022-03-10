import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Text, Container, Title, createStyles } from "@mantine/core";
import { DehydratedState, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { fetchBrewsServerSide } from "./api/v1/brews";
import coffeeMascotImg from "../public/coffee-mascot.jpeg";
import { useCreateBrew, useGetBrews } from "../components/hooks/brewHooks";

const useStyles = createStyles((theme, _params) => {
  return {
    app: {
      textAlign: "center",
    },
    mascotImage: {
      border: 0,
      padding: "30px",
      maxWidth: "340px",
      height: "auto",
      margin: "auto",
      marginTop: "50px",
    },
    title: {
      margin: "5px",
    },
    ingress: {
      margin: "10px",
    },
    button: {
      margin: "40px",
    },
  };
});

interface Props {
  dehydratedState: DehydratedState;
}

const Home: NextPage<Props> = ({ dehydratedState }: Props) => {
  const myStyles = useStyles().classes;
  const getBrewsHook = useGetBrews();
  const createBrewHook = useCreateBrew();

  const handleClick = () => {
    createBrewHook.mutate();
  };

  console.log("NODE_ENV", process.env.NODE_ENV);
  console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
  console.log(
    "SERVER API URL",
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/v1/brews`
  );

  return (
    <Container size="xs" className={myStyles.app}>
      <Head>
        <title>Coffee-o-meter</title>
        <meta
          name="description"
          content="Let your colleagues know you made coffee"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={myStyles.mascotImage}>
        <Image alt="Coffee mascot" src={coffeeMascotImg} />
      </div>
      <Title className={myStyles.title}>Did you make coffee?</Title>
      <Text className={myStyles.ingress}>
        Brilliant! Let your colleagues know about it in Slack channel{" "}
        <b>#coffee-o-meter</b>. Just press the button below.
      </Text>
      <Button
        className={myStyles.button}
        mx={20}
        size="xl"
        color="orange"
        radius="md"
        onClick={() => {
          handleClick();
        }}
        loading={createBrewHook.isLoading}
      >
        Yes, I made coffee
      </Button>

      {getBrewsHook.data?.map((d) => (
        <li key={d.id}>{d.dateTime}</li>
      ))}
    </Container>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("brews", fetchBrewsServerSide);
  console.log("GET brews: server");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
