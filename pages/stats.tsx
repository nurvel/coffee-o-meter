import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Container, Text, Row, Col } from "@nextui-org/react";

interface Props {
  stats: String[];
}

const Stats: NextPage<Props> = ({ stats }: Props) => {
  const statsList = stats.map((stat) => <li key={stat.toString()}>{stat}</li>);


  return (
    <Container>
      <main className={styles.main}>
        <Text>Statistics</Text>
        <ul>{statsList}</ul>
      </main>
    </Container>
  );
};

export default Stats;

export async function getServerSideProps() {
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();
  const stats = ["Hello", "There"];

  return {
    props: {
      stats,
    },
  };
}
