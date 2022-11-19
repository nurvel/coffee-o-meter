// API Utils

import { Brew } from "@prisma/client";

// TODO: make global / configurations
const DEFAULT_BREW_THRESHOLD_MINUTES = 5;
const BREW_THRESHOLD_SECONDS =
  process.env.NODE_ENV === "development"
    ? 10000
    : DEFAULT_BREW_THRESHOLD_MINUTES * 60000;

export const isThrottleBrew = (
  throttleSeconds: number,
  latestBrew: Brew,
  dateNow: number
): boolean => {
  const latestBrewDateTime = new Date(latestBrew.dateTime).getTime();
  return (dateNow - latestBrewDateTime) / 1000 < throttleSeconds;
};

export const getThrottle = (brew: Brew | null | undefined): number => {
  if (!brew) return 0;
  const currentDateTime = Date.now();
  const latestBrewDateTime = new Date(brew.dateTime).getTime(); // TODO: miksi API ei palauta toimivassa Date muodossa jos prisman Brew objekti?
  const throttle =
    BREW_THRESHOLD_SECONDS - (currentDateTime - latestBrewDateTime);
  return throttle < 0 ? 0 : throttle;
};
