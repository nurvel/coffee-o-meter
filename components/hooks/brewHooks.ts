import { useEffect, useState } from "react";

import {
  createBrew,
  getBrews,
  getLatestBrew,
} from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";
import { getThrottle } from "../../common/utilsApi";

// TODO: This is not also in API routes /brew. Remove duplication
const DEFAULT_BREW_THRESHOLD_MINUTES = 5;
const BREW_THRESHOLD_SECONDS =
  process.env.NODE_ENV === "development"
    ? 10000
    : DEFAULT_BREW_THRESHOLD_MINUTES * 60000;

export const useCreateBrew = () => {
  const queryClient = useQueryClient();
  return useMutation(() => createBrew(), {
    onSuccess: (result: Brew | null) => {
      if (result) {
        queryClient.setQueryData("brews", (brews: Brew[] = []) => [
          ...brews,
          result,
        ]);
      }
      queryClient.invalidateQueries("brews");
      queryClient.invalidateQueries("latest_brew");
    },
  });
};

export const useGetBrews = () => {
  return useQuery<Brew[]>("brews", getBrews);
};

export const useGetLatestBrew = () => {
  return useQuery<Brew | null>("latest_brew", getLatestBrew);
};

// const getThrottle = (brew: Brew | null | undefined): number => {
//   if (brew === null || brew === undefined) return 0;
//   const currentDateTime = Date.now();
//   const latestBrewDateTime = brew.dateTime.getTime();
//   return BREW_THRESHOLD_SECONDS - currentDateTime - latestBrewDateTime;
// };

interface UseLatestBrewResult {
  isThrottle: boolean;
  latestBrew: Brew | null | undefined;
  throttlePercentage: string;
  throttleMs: number;
}

// type UseLatestBrew = () => [boolean, Brew | undefined, string, number];

export const useLatestBrew = (): UseLatestBrewResult => {
  const latestBrew = useGetLatestBrew();
  const [throttleMs, setThrottleMs] = useState(getThrottle(latestBrew.data));

  useEffect(() => {
    setThrottleMs(getThrottle(latestBrew.data));
  }, [latestBrew]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (throttleMs > 0) {
        setThrottleMs((current) => current - 100);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [latestBrew.data, throttleMs]);

  const throttlePercentage: number =
    ((BREW_THRESHOLD_SECONDS - throttleMs) / BREW_THRESHOLD_SECONDS) * 100;

  return {
    isThrottle: throttleMs > 0,
    latestBrew: latestBrew.data,
    throttlePercentage: parseFloat(throttlePercentage.toString()).toFixed(),
    throttleMs,
  };
};
