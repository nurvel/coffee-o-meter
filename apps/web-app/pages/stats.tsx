import React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

interface Props {
  stats: string[];
}

const Stats: NextPage<Props> = ({ stats }: Props) => {
  const statsList = stats.map((stat) => <li key={stat.toString()}>{stat}</li>);

  return (
    <div>
      <main className={styles.main}>
        <p>Statistics</p>
        <ul>{statsList}</ul>
      </main>
    </div>
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
