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
  latestBrew: Brew | null | undefined;
  throttlePercentage: string;
}

let counterId = 0;

export const useLatestBrew = (): UseLatestBrewResult => {
  const latestBrew = useGetLatestBrew();
  const [throttleMs, setThrottleMs] = React.useState(0);

  // console.log(
  //   "calling hook: useLatestBrew",
  //   throttleMs,
  //   getThrottle(latestBrew.data),
  //   latestBrew,
  //   latestBrew.data?.id
  // );

  React.useEffect(() => {
    console.log("setting latest brew");
    const tr = getThrottle(latestBrew.data);
    setThrottleMs(tr);

    if (tr > 0) {
      counterId++;
      const UPDATE_INTERVAL = 1000;

      const timer = setInterval(() => {
        setThrottleMs((cur: number): number => {
          console.log(`interval: counterID ${counterId} CurrentCount:${cur}`);
          return cur - UPDATE_INTERVAL;
        });
      }, UPDATE_INTERVAL);

      setTimeout(() => {
        console.log("clear interval: timeout");
        setThrottleMs(0);
        clearInterval(timer);
      }, tr);

      return () => {
        console.log("clear interval: unmount");
        setThrottleMs(0);
        clearInterval(timer);
      };
    }
  }, [latestBrew.data]);

  return {
    isThrottle: throttleMs > 0,
    latestBrew: latestBrew.data,
    throttlePercentage: convertToPercentages(throttleMs),
  };
};

const convertToPercentages = (nr: number): string => {
  const percentage: number =
    ((BREW_THRESHOLD_SECONDS - nr) / BREW_THRESHOLD_SECONDS) * 100;
  return nr === 0 ? "0" : parseFloat(percentage.toString()).toFixed();
};
