import React, { FunctionComponent } from "react";
import SizedConfetti from "react-confetti";
import { Brew } from "../common/api/generated";
import { useViewportSize } from "./hooks/useviewportSize";

interface Props {
  isThrottle: boolean;
  latestBrew?: Brew | null;
}

const Confetti: FunctionComponent<Props> = ({ isThrottle }: Props) => {
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
    run: isThrottle,
    recycle: false,
    friction: 1,
    tweenDuration: 10,
    initialVelocityX: 12,
    initialVelocityY: 12,
    numberOfPieces: 100,
    gravity: 0.3,
  };

  return <>{isThrottle && <SizedConfetti {...confettiProps} />}</>;
};

export default React.memo(Confetti, (prevProps, nextProps) => {
  return (
    prevProps.latestBrew?.id == nextProps.latestBrew?.id &&
    prevProps.isThrottle == nextProps.isThrottle
  );
});
