import { createBrew, getBrews } from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";
import {
  brewStartedSinceMilliseconds,
  getLatestBrew,
} from "../../common/utils";
import { useEffect, useRef, useState } from "react";

// TODO: This is not also in API routes /brew. Remove duplication
const DEFAULT_BREW_THRESHOLD_MINUTES = 10;
const BREW_THRESHOLD_SECONDS =
  process.env.NODE_ENV === "development"
    ? 10
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
  const timeout = useRef<() => void>();

  const getBrewsHook = useGetBrews();
  const latestBrew: Brew = getLatestBrew(getBrewsHook.data); // TODO: API endpoint for latest brew
  const throttleMilliseconds =
    BREW_THRESHOLD_SECONDS * 1000 - brewStartedSinceMilliseconds(latestBrew); // TODO: use milliseconds everywhere, not seconds
  const [isThrottle, setIsThrottle] = useState(throttleMilliseconds > 0);

  useEffect(() => {
    setIsThrottle(throttleMilliseconds > 0);
  }, [throttleMilliseconds]);

  useEffect(() => {
    timeout.current = () => setIsThrottle(false);
  }, [isThrottle]);

  if (isThrottle) {
    setTimeout(() => {
      if (timeout.current) {
        console.log("Cleared Throttle!");
        return timeout.current();
      }
      return null;
    }, throttleMilliseconds);
  }

  return [isThrottle, latestBrew, throttleMilliseconds];
};
