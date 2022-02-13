import type { NextPage } from "next";
import Head from "next/head";
import { Button, Paper, Text, Container, Title } from "@mantine/core";
import { createBrew, getBrews } from "../common/api/uiApiUtis";

const Home: NextPage = () => {
  const handeClick = () => {
    console.log("Brew initiated!");
    createBrew();
  };

  return (
    <Container>
      <Head>
        <title>Coffee-o-meter</title>
        <meta
          name="description"
          content="See if there is any coffee and alert if you make any"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Paper padding="md" shadow="xs">
          <Container>
            <Title>Coffee-o-meter</Title>
            <Text>Let your colleges know in Slack </Text>
          </Container>
          <Button
            className="my-button"
            style={{ backgroundColor: "#000" }}
            mx={20}
            size="xl"
            onClick={() => {
              handeClick();
            }}
          >
            I made coffee
          </Button>

          <Button
            className="my-button"
            style={{ backgroundColor: "#000" }}
            mx={20}
            size="xl"
            onClick={getBrews}
          >
            Get brews
          </Button>
        </Paper>
      </main>
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
