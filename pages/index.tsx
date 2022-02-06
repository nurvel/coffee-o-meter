import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Container, Text, Row, Col } from "@nextui-org/react";

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
      <main className={styles.main}>
        <Text>Coffee-o-meter</Text>
      </main>
    </Container>
  );
};

export default Home;
