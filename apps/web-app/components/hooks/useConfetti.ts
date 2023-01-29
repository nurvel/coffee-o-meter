import { useEffect, useState } from "react";
import { useLatestBrew } from "./brewHooks";

export const useExplode = () => {
  const { isThrottle, throttlePercentage } = useLatestBrew();
  const [isExplode, setIsExplode] = useState<boolean>(false);

  const cleanUpAfterConfettiIsFinished = () => {
    setTimeout(() => {
      setIsExplode(false);
    }, 5000);
  };

  useEffect(() => {
    if (isThrottle && coffeeJustStarted(throttlePercentage)) {
      setIsExplode(true);
      cleanUpAfterConfettiIsFinished();
    }
  }, [isThrottle, throttlePercentage]);

  return isExplode;
};

const coffeeJustStarted = (throttlePercentage: string): boolean => {
  return Number.parseInt(throttlePercentage) < 10;
};
