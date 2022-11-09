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

export const useLatestBrew = (): UseLatestBrewResult => {
  const latestBrew = useGetLatestBrew();
  const [throttleMs, setThrottleMs] = React.useState<number>(
    getThrottle(latestBrew.data)
  );
  const [ct, setCt] = React.useState<boolean>(false);
  // const [isThrottle, setIsThrottle] = React.useState<boolean>(false);

  React.useEffect(() => {
    setThrottleMs(getThrottle(latestBrew.data));
  }, [latestBrew]);

  React.useEffect(() => {
    function refreshThrottle() {
      console.log("setThrottle");
      setThrottleMs((cur) => cur - new Date().getTime());
    }

    if (!ct && throttleMs > 0) {
      setCt(true);
      const id = setInterval(refreshThrottle, 100);
      return () => {
        console.log("clear interval");
        clearInterval(id);
        setCt(false);
      };
    }
  }, [throttleMs, ct]);

  return {
    isThrottle: throttleMs > 0,
    latestBrew: latestBrew.data,
    throttlePercentage: convertToPercentages(throttleMs),
  };
};

const convertToPercentages = (nr: number): string => {
  const percentage: number =
    ((BREW_THRESHOLD_SECONDS - nr) / BREW_THRESHOLD_SECONDS) * 100;
  return parseFloat(percentage.toString()).toFixed();
};
