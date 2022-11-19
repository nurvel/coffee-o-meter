import React, { Fragment, FunctionComponent } from "react";
import SizedConfetti from "react-confetti";
import { useViewportSize } from "./hooks/useviewportSize";

interface Props {
  isExplode: boolean;
}

const Confetti: FunctionComponent<Props> = ({ isExplode }: Props) => {
  const { height, width } = useViewportSize();

  const cleanUp = () => {
    console.log("running cleanup");
    //    setIsRunning(false);
  };

  const confettiProps = {
    width,
    height,
    confettiSource: {
      w: 10,
      h: 10,
      x: width / 2,
      y: height / 2,
    },
    run: isExplode,
    recycle: false,
    tweenDuration: 200,
    initialVelocityX: 12,
    initialVelocityY: 12,
    numberOfPieces: 100,
    gravity: 0.2,
    onConfettiComplete: cleanUp,
  };

  return <>{isExplode && <SizedConfetti {...confettiProps} />}</>;
};

export default React.memo(Confetti);
