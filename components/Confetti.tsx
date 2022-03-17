import { Container } from "@mantine/core";
import React from "react";
import { FunctionComponent } from "react";
import ConfettiExplosion from "react-confetti-explosion";

interface Props {
  isExplode: boolean;
}

const Confetti: FunctionComponent<Props> = ({ isExplode }: Props) => {
  console.log("render: ConfettiExplosion", isExplode);

  return <Container>{isExplode && <ConfettiExplosion />}</Container>;
};

export default React.memo(Confetti);
