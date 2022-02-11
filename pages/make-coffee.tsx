import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  location: String;
  onClickNewPot: (potSize: string) => void;
}

const MakeCoffee: NextPage<Props> = ({ location, onClickNewPot }: Props) => {
  const [potSize, setPotSize] = useState<string | undefined>(undefined);

  const handleClick = () => {
    potSize ? onClickNewPot(potSize) : undefined; // TODO: handle case if not pot size set
  };

  return (
    <div>
      <main className={styles.main}>
        {/* <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> */}
        <button
          onClick={() => {
            handleClick();
          }}
        >
          I made Coffee
        </button>
      </main>
    </div>
  );
};

export default MakeCoffee;

export async function getServerSideProps() {
  const stats = ["Hello", "There"];

  return {
    props: {
      stats,
    },
  };
}
