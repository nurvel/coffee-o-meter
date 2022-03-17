import { useEffect, useState } from "react";
import { useLatestBrew } from "./brewHooks";

export const useExplode = () => {
  const [isThrottle] = useLatestBrew();
  const [isExplode, setIsExplode] = useState<boolean>(false);

  if (isExplode) {
    setTimeout(() => {
      setIsExplode(false);
    }, 5000);
  }

  useEffect(() => {
    setIsExplode(isThrottle);
  }, [isThrottle]);

  return isExplode;
};
