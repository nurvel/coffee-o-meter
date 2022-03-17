import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Text, Container, createStyles } from "@mantine/core";
import { DehydratedState, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { fetchBrewsServerSide } from "./api/v1/brews";
import coffeeMascotImg from "../public/coffee-mascot.jpeg";
import { CoffeeContent } from "../components/CoffeeContent";
import Confetti from "../components//Confetti";
import { useExplode } from "../components/hooks/useConfetti";

const useStyles = createStyles((theme, _params) => {
  return {
    app: {
      textAlign: "center",
      height: "100vh",
    },
    header: {
      position: "absolute",
      margin: "5px",
      right: "0",
    },
    mascotImage: {
      border: 0,
      padding: "30px",
      maxWidth: "340px",
      height: "auto",
      margin: "auto",
      paddingTop: "100px",
    },
    title: {
      margin: "5px",
    },
    ingress: {
      margin: "20px",
    },
    progressBar: {
      margin: "30px 20px 10px 20px",
    },
    button: {
      margin: "20px 20px 10px 20px",
    },
    confetti: {
      position: "fixed",
      left: "50%",
      marginTop: "50px",
      zIndex: "1000",
    },
    // footer: {
    //   position: "fixed",
    //   left: "50%",
    //   bottom: "5px",
    //   transform: "translate(-50%, -50%)",
    //   margin: "0 auto"
    // },
  };
});

interface Props {
  dehydratedState: DehydratedState;
}

const Home: NextPage<Props> = ({ dehydratedState }: Props) => {
  const myStyles = useStyles().classes;
  const isExplode = useExplode();

  // console.log("NODE_ENV", process.env.NODE_ENV);
  // console.log("NEXT_PUBLIC_VERCEL_ENV", process.env.NEXT_PUBLIC_VERCEL_ENV);
  // console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);

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
      <Container className={myStyles.header}>
        <Text
          component="a"
          href="https://github.com/nurvel/coffee-o-meter/releases"
          target="_blank"
          variant="gradient"
          gradient={{ from: "orange", to: "pink", deg: 45 }}
          size="md"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif" }}
        >
          coffee-o-meter
        </Text>
      </Container>

      <div className={myStyles.mascotImage}>
        <Image alt="Coffee mascot" src={coffeeMascotImg} priority={true} />
      </div>
      <div className={myStyles.confetti}>
        <Confetti isExplode={isExplode} />
      </div>
      <CoffeeContent />
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
