import { createBrew, getBrews } from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";
import {
  brewStartedSinceMilliseconds as brewStartedSinceMs,
  getLatestBrew,
} from "../../common/utils";
import { useEffect, useRef, useState } from "react";

// TODO: This is not also in API routes /brew. Remove duplication
const DEFAULT_BREW_THRESHOLD_MINUTES = 10;
const BREW_THRESHOLD_SECONDS =
  process.env.NODE_ENV === "development"
    ? 10000
    : DEFAULT_BREW_THRESHOLD_MINUTES * 60;

export const useCreateBrew = () => {
  const queryClient = useQueryClient();
  return useMutation(() => createBrew(), {
    onSuccess: () => {
      queryClient.invalidateQueries("brews");
    },
  });
};

export const useGetBrews = () => {
  return useQuery<Brew[]>("brews", getBrews);
};

export const useLatestBrew = (): [boolean, Brew, number] => {
  // const timeout = useRef<() => void>();

  const getBrewsHook = useGetBrews();
  const latestBrew: Brew = getLatestBrew(getBrewsHook.data); // TODO: API endpoint for latest brew
  const [throttleMs, setThrottleMs] = useState(
    BREW_THRESHOLD_SECONDS - brewStartedSinceMs(latestBrew)
  );
  // const timerIdRef = useRef<NodeJS.Timeout>();

  console.log("RUNNING HOOK", "throttleMs:", throttleMs, "id:", latestBrew.id);

  // const interval = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const interval = setInterval(() => {
      if (throttleMs > 0) {
        setThrottleMs((current) => current - 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [throttleMs]);

  return [throttleMs > 0, latestBrew, throttleMs];
};
