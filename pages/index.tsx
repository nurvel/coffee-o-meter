import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Text, Container, Title, createStyles } from "@mantine/core";
import { createBrew } from "../common/api/uiApiUtis";
import coffeeMascotImg from "../public/coffee-mascot.jpeg";

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
      marginTop: "50px"
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

  const handleClick = () => {
    console.log("Brew initiated!");
    createBrew();
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
      <Title className={myStyles.title}>Just made coffee?</Title>
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
        I made coffee
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

// export async function getStaticProps() {
//   const handleCreateBrew = createBrew;
//   return {
//     props: {
//       handleCreateBrew,
//     },
//   };
// }
