// API Utils

import { Brew } from "@prisma/client";

export const isThrottleBrew = (
  throttleMilliseconds: number,
  latestBrew: Brew,
  dateNow: number
): boolean => {
  const latestBrewDateTime = new Date(latestBrew.dateTime).getTime();
  return dateNow - latestBrewDateTime < throttleMilliseconds;
};

export const getThrottle = (
  currentDateTime: number,
  throttleMilliseconds: number,
  brew?: Brew | null
): number => {
  if (!brew) return 0;
  const latestBrewDateTime = new Date(brew.dateTime).getTime(); // TODO: miksi API ei palauta toimivassa Date muodossa jos prisman Brew objekti?
  const throttle =
    throttleMilliseconds - (currentDateTime - latestBrewDateTime);
  return throttle < 0 ? 0 : throttle;
};
