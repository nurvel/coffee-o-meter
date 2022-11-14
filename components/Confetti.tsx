import React, { FunctionComponent } from "react";
import { Container } from "@mantine/core";
import ConfettiExplosion from "react-confetti-explosion";
import { useViewportSize } from "./hooks/useviewportSize";

interface Props {
  isExplode: boolean;
}

const Confetti: FunctionComponent<Props> = ({ isExplode }: Props) => {
  const { height } = useViewportSize();

  return (
    <Container>
      {isExplode && <ConfettiExplosion floorHeight={height} />}
    </Container>
  );
};

export default React.memo(Confetti);
