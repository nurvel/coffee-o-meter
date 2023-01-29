import {
  createBrew,
  getBrews,
  getLatestBrew,
} from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";
import { getThrottle } from "../../common/utilsApi";
import React from "react";

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

interface UseLatestBrewResult {
  isThrottle: boolean;
  latestBrew: Brew | null;
  throttlePercentage: string;
}

export const useLatestBrew = (): UseLatestBrewResult => {
  const latestBrew = useGetLatestBrew();
  const [throttleMs, setThrottleMs] = React.useState(0);

  React.useEffect(() => {
    const tr = getThrottle(Date.now(), BREW_THRESHOLD_SECONDS, latestBrew.data);
    setThrottleMs(tr);

    if (tr > 0) {
      const UPDATE_INTERVAL = 500;

      const timer = setInterval(() => {
        setThrottleMs((cur: number): number => {
          return cur - UPDATE_INTERVAL;
        });
      }, UPDATE_INTERVAL);

      setTimeout(() => {
        setThrottleMs(0);
        clearInterval(timer);
      }, tr);

      return () => {
        setThrottleMs(0);
        clearInterval(timer);
      };
    }
  }, [latestBrew.data]);

  return {
    isThrottle: throttleMs > 0,
    latestBrew: latestBrew.data ?? null,
    throttlePercentage: convertToPercentages(throttleMs),
  };
};

const convertToPercentages = (nr: number): string => {
  const percentage: number =
    ((BREW_THRESHOLD_SECONDS - nr) / BREW_THRESHOLD_SECONDS) * 100;
  return nr === 0 ? "0" : parseFloat(percentage.toString()).toFixed();
};
