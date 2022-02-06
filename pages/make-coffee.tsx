import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Container, Button, Text, Radio, Row, Col } from "@nextui-org/react";

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
    <Container>
      <main className={styles.main}>
        <Radio.Group row onChange={(e) => setPotSize(e.toString())}>
          <Radio value="half">Half Pot</Radio>
          <Radio value="full">Full Pot</Radio>
        </Radio.Group>
        {/* <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> */}
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          I made Coffee
        </Button>
      </main>
    </Container>
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
