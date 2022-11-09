// API Utils

// import { Brew } from "./api/generated";
import { Brew } from "@prisma/client";

// TODO: make global / configurations
const DEFAULT_BREW_THRESHOLD_MINUTES = 5;
const BREW_THRESHOLD_SECONDS =
  process.env.NODE_ENV === "development"
    ? 10000
    : DEFAULT_BREW_THRESHOLD_MINUTES * 60000;

export const isThrottleBrew = (
  throttleSeconds: number,
  latestBrew: Brew
): boolean => {
  const currentDateTime = Date.now();
  const latestBrewDateTime = new Date(latestBrew.dateTime).getTime();
  return (currentDateTime - latestBrewDateTime) / 1000 < throttleSeconds;
};

export const getThrottle = (brew: Brew | null | undefined): number => {
  // console.log("args:", brew);
  if (!brew) return 0;
  const currentDateTime = Date.now();
  const latestBrewDateTime = new Date(brew.dateTime).getTime(); // TODO: miksi API ei palauta toimivassa Date muodossa jos prisman Brew objekti?
  // console.log("-----");
  // console.log("currentDateTime", currentDateTime);
  // console.log("latestBrewDateTime", latestBrewDateTime);
  // console.log("calc", currentDateTime - latestBrewDateTime);
  // console.log("BREW_THRESHOLD_SECONDS", BREW_THRESHOLD_SECONDS);
  const throttle =
    BREW_THRESHOLD_SECONDS - (currentDateTime - latestBrewDateTime);
  // console.log("throttle", throttle);
  return throttle < 0 ? 0 : throttle;
};
