import React, { FunctionComponent } from "react";
import SizedConfetti from "react-confetti";
import { useViewportSize } from "./hooks/useviewportSize";

interface Props {
  isExplode: boolean;
}

const Confetti: FunctionComponent<Props> = ({ isExplode }: Props) => {
  const { height, width } = useViewportSize();

  const confettiProps = {
    width,
    height,
    confettiSource: {
      w: 10,
      h: 10,
      x: width / 2,
      y: 500,
    },
    run: isExplode,
    recycle: false,
    friction: 1,
    tweenDuration: 10,
    initialVelocityX: 12,
    initialVelocityY: 12,
    numberOfPieces: 100,
    gravity: 0.3,
  };

  return <>{isExplode && <SizedConfetti {...confettiProps} />}</>;
};

export default React.memo(Confetti);
