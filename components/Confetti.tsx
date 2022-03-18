import React, { FunctionComponent } from "react";
import { Container } from "@mantine/core";
import ConfettiExplosion from "react-confetti-explosion";

interface Props {
  isExplode: boolean;
}

const Confetti: FunctionComponent<Props> = ({ isExplode }: Props) => {
  console.log("render: ConfettiExplosion", isExplode);

  return <Container>{isExplode && <ConfettiExplosion />}</Container>;
};

export default React.memo(Confetti);
