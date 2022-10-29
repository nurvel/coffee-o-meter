import { useEffect, useState } from "react";
import { brewStartedSinceMs } from "../../common/utils";
import { useLatestBrew } from "./brewHooks";

export const useExplode = () => {
  const [isThrottle, latestBrew] = useLatestBrew();
  const [isExplode, setIsExplode] = useState<boolean>(false);

  const cleanUpAfterConfettiIsFinished = () => {
    setTimeout(() => {
      setIsExplode(false);
    }, 5000);
  };

  useEffect(() => {
    const sinceStartMs = brewStartedSinceMs(latestBrew);

    if (sinceStartMs < 1000) {
      setIsExplode(isThrottle);
      cleanUpAfterConfettiIsFinished();
    }
  }, [isThrottle, latestBrew]);

  return isExplode;
};
