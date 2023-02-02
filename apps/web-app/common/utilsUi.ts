import { Brew } from "api";
// import { NavigationOptions } from "./custom-types";

// UI Utils

// export const navigationOptions: NavigationOptions[] = [
//   { displayName: "Home", URL: "/" },
//   { displayName: "Make Coffee", URL: "make-coffee" },
//   { displayName: "Statistics", URL: "stats" },
// ];

export const getLatestBrew = (brews: Brew[] = []): Brew => {
  return brews.reduce((next, prev) =>
    prev.dateTime > next.dateTime ? prev : next
  );
};
