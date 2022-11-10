import {
  createBrew,
  getBrews,
  getLatestBrew,
} from "../../common/api/uiApiUtils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Brew } from "../../common/api/generated";
import { getThrottle } from "../../common/utilsApi";
import React from "react";

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
        queryClient.setQueryData("brews", (brews: Brew[] = []) => [
          ...brews,
          result,
        ]);
      }
      queryClient.invalidateQueries("brews");
      queryClient.invalidateQueries("latest_brew");
    },
  });
};

export const useGetBrews = () => {
  return useQuery<Brew[]>("brews", getBrews);
};

export const useGetLatestBrew = () => {
  return useQuery<Brew | null>("latest_brew", getLatestBrew);
};

interface UseLatestBrewResult {
  isThrottle: boolean;
  latestBrew: Brew | null | undefined;
  throttlePercentage: string;
}

let counterId = 0;

export const useLatestBrew = (): UseLatestBrewResult => {
  const latestBrew = useGetLatestBrew();
  const [throttleMs, setThrottleMs] = React.useState(0);

  console.log(
    "calling hook: useLatestBrew",
    throttleMs,
    getThrottle(latestBrew.data),
    latestBrew,
    latestBrew.data?.id
  );

  React.useEffect(() => {
    console.log("setting latest brew");
    const tr = getThrottle(latestBrew.data);
    setThrottleMs(tr);

    if (tr > 0) {
      counterId++;
      const timer = setInterval(() => {
        setThrottleMs((cur: number): number => {
          console.log(`interval: counterID ${counterId} CurrentCount:${cur}`);
          return cur - 1000;
        });
      }, 1000);

      setTimeout(() => {
        console.log("clear interval: timeout");
        setThrottleMs(0);
        clearInterval(timer);
      }, tr);

      return () => {
        console.log("clear interval: unmount");
        setThrottleMs(0);
        clearInterval(timer);
      };
    }
  }, [latestBrew.data]);

  return {
    isThrottle: throttleMs > 0,
    latestBrew: latestBrew.data,
    throttlePercentage: convertToPercentages(throttleMs),
  };
};

// export const useLatestBrew = (): UseLatestBrewResult => {
//   const latestBrew = useGetLatestBrew();
//   const [throttleMs, setThrottleMs] = React.useState<number>(0);
//   // const [isThrottle, setIsThrottle] = React.useState<boolean>(false);

//   console.log(
//     "calling hook: useLatestBrew",
//     throttleMs,
//     latestBrew,
//     latestBrew.data?.id
//   );

//   // React.useEffect(() => {
//   //   // console.log("setThrottleMs(getThrottle(latestBrew.data)); ");
//   //   setThrottleMs(getThrottle(latestBrew.data));
//   // }, [latestBrew]);

//   React.useCallback(() => {
//     counterId++;

//     console.log("useCallBack called");
//     setThrottleMs(getThrottle(latestBrew.data));

//     const id = setInterval(() => {
//       console.log(`interval: counterID ${counterId}`);
//       setThrottleMs((cur) => (cur > 0 ? cur - 1000 : 0));
//     }, 1000);

//     return () => {
//       console.log("clear interval");
//       clearInterval(id);
//     };
//   }, [latestBrew]);

//   return {
//     isThrottle: throttleMs > 0,
//     latestBrew: latestBrew.data,
//     throttlePercentage: convertToPercentages(throttleMs),
//   };
// };

const convertToPercentages = (nr: number): string => {
  const percentage: number =
    ((BREW_THRESHOLD_SECONDS - nr) / BREW_THRESHOLD_SECONDS) * 100;
  console.log(
    `${BREW_THRESHOLD_SECONDS} - ${nr} / ${BREW_THRESHOLD_SECONDS} = ${percentage}`
  );
  return percentage === 100 ? "0" : parseFloat(percentage.toString()).toFixed();
};
