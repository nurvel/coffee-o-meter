import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Coffee-o-meter</title>
        <meta
          name="description"
          content="See if there is any coffee and alert if you make any"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>Coffee-o-meter</p>
      </main>
    </div>
  );
};

export default Home;
