import { useEffect, useState } from "react";

import { createBrew, getBrews } from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";
import { brewStartedSinceMs, getLatestBrew } from "../../common/utils";

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
        queryClient.setQueryData("brews", (brews: any) => [...brews, result]);
      }
      queryClient.invalidateQueries("brews");
    },
  });
};

export const useGetBrews = () => {
  return useQuery<Brew[]>("brews", getBrews);
};

export const useLatestBrew = (): [boolean, Brew, string, number] => {
  const getBrewsHook = useGetBrews();
  const latestBrew: Brew = getLatestBrew(getBrewsHook.data); // TODO: API endpoint for latest brew
  const [throttleMs, setThrottleMs] = useState(
    BREW_THRESHOLD_SECONDS - brewStartedSinceMs(latestBrew)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (throttleMs > 0) {
        setThrottleMs((current) => current - 100);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [latestBrew, throttleMs]);

  useEffect(() => {
    setThrottleMs(BREW_THRESHOLD_SECONDS - brewStartedSinceMs(latestBrew));
  }, [latestBrew]);

  const isThrottle = throttleMs > 0;
  const throttlePercentage: number =
    ((BREW_THRESHOLD_SECONDS - throttleMs) / BREW_THRESHOLD_SECONDS) * 100;

  return [
    isThrottle,
    latestBrew,
    parseFloat(throttlePercentage.toString()).toFixed(),
    throttleMs,
  ];
};
