import { Brew } from "./api/generated";
import { NavigationOptions } from "./custom-types";

// UI Utils

export const navigationOptions: NavigationOptions[] = [
  { displayName: "Home", URL: "/" },
  { displayName: "Make Coffee", URL: "make-coffee" },
  { displayName: "Statistics", URL: "stats" },
];

export const getLatestBrew = (brews: Brew[] = []): Brew => {
  return brews.reduce((next, prev) =>
    prev.dateTime > next.dateTime ? prev : next
  );
};

// API Utils

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
  const latestBrewDateTime = Date.parse(brew.dateTime);
  return currentDateTime - latestBrewDateTime;
};
