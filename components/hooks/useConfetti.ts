import { useEffect, useRef, useState } from "react";
import { brewStartedSinceMs } from "../../common/utils";
import { useLatestBrew } from "./brewHooks";

export const useExplode = () => {
  const [isThrottle, latestBrew] = useLatestBrew();
  const [isExplode, setIsExplode] = useState<boolean>(false);

  useEffect(() => {
    const sinceStartMs = brewStartedSinceMs(latestBrew);

    if (sinceStartMs < 1000) {
      setIsExplode(isThrottle);
      setTimeout(() => {
        setIsExplode(false);
      }, 5000);
    }
  }, [isThrottle]);

  return isExplode;
};
