import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  Mutation,
} from "react-query";
import { Button, Text, Container, Title, createStyles } from "@mantine/core";

import coffeeMascotImg from "../public/coffee-mascot.jpeg";
import { createBrew, getBrews } from "../common/api/uiApiUtils";
import { Brew } from "../common/api/generated";

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

const Home: NextPage = () => {
  const myStyles = useStyles().classes;

  // const { data, isLoading, isFetching, error } = useQuery<Brew[]>(
  //   "brews",
  //   getBrews
  // );
  // console.log("brews ", data);

  const { mutate, isLoading, isSuccess, isError, error } = useMutation((data) =>
    createBrew()
  );

  console.log(isLoading, isSuccess, isError, error);

  const handleClick = () => {
    console.log("Brew initiated!");
    mutate();
    // createBrew();
  };

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
        // loading={true}
      >
        Yes, I made coffee
      </Button>

      {/* <Button
        className="my-button"
        style={{ backgroundColor: "#000" }}
        mx={20}
        size="xl"
        onClick={getBrews}
      >
        Get brews
      </Button> */}
    </Container>
  );
};

export default Home;

// getStaticProps  - only in build time
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Brew[]>("brews", getBrews);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
