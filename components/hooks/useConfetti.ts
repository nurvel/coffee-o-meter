import { useEffect, useState } from "react";
import { getThrottle } from "../../common/utilsApi";
import { useLatestBrew } from "./brewHooks";

export const useExplode = () => {
  const { isThrottle, latestBrew } = useLatestBrew();
  const [isExplode, setIsExplode] = useState<boolean>(false);

  const cleanUpAfterConfettiIsFinished = () => {
    setTimeout(() => {
      setIsExplode(false);
    }, 5000);
  };

  useEffect(() => {
    const sinceStartMs = getThrottle(latestBrew); // brewStartedSinceMs

    if (sinceStartMs < 1000) {
      setIsExplode(isThrottle);
      cleanUpAfterConfettiIsFinished();
    }
  }, [isThrottle, latestBrew]);

  return isExplode;
};
