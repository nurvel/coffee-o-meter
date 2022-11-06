// API Utils

import { Brew } from "@prisma/client";

export const isThrottleBrew = (
  throttleSeconds: number,
  latestBrew: Brew
): boolean => {
  const currentDateTime = Date.now();
  const latestBrewDateTime = latestBrew.dateTime;
  return (
    (currentDateTime - latestBrewDateTime.getTime()) / 1000 < throttleSeconds
  );
};

export const brewStartedSinceMs = (brew: Brew) => {
  const currentDateTime = Date.now();
  const latestBrewDateTime = brew.dateTime.getTime();
  return currentDateTime - latestBrewDateTime;
};
