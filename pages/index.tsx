import type { NextPage } from "next";
import Head from "next/head";
import { Button, Paper, Text, Container, Title } from "@mantine/core";

const Home: NextPage = () => {
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
            <Text>Paper is the most basic ui component</Text>
            <Text>
              Use it to create cards, dropdowns, modals and other components
              that require background with shadow
            </Text>
          </Container>
          <Button
            className="my-button"
            style={{ backgroundColor: "#000" }}
            mx={20}
            size="xl"
          >
            I made coffee
          </Button>
        </Paper>
      </main>
    </Container>
  );
};

export default Home;
