import { Brew } from "./api/generated";
import { NavigationOptions } from "./custom-types";

// UI Utils

export const navigationOptions: NavigationOptions[] = [
  { displayName: "Home", URL: "/" },
  { displayName: "Make Coffee", URL: "make-coffee" },
  { displayName: "Statistics", URL: "stats" },
];

// API Utils

export const isThrottleBrew = (
  throttleSeconds: number,
  latestBrew: Brew
): boolean => {
  const currentDateTime = new Date();
  const latestBrewDateTime = latestBrew.dateTime;
  return (
    (currentDateTime.getTime() - latestBrewDateTime.getTime()) / 1000 <
    throttleSeconds
  );
};
