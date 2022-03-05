// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Brew } from "../../../common/api/generated/models/Brew";
import { createBrew, getAllBrews, getLatestBrew } from "./_brewService";
import { postToSlackChannel } from "./_slackService";
import { isThrottleBrew } from "../../../common/utils";
import { getRandomFact } from "./_factService";

const DEFAULT_BREW_THRESHOLD_MINUTES = 10;
const BREW_THRESHOLD_SECONDS =
  process.env.NODE_ENV === "development"
    ? 0
    : DEFAULT_BREW_THRESHOLD_MINUTES * 60;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Brew | Brew[] | ApiError>
) {
  switch (req.method) {
    case "GET": {
      try {
        const brews: Brew[] = await getAllBrews();
        return res.status(200).json(brews);
      } catch (e) {
        console.log(e);
        return res.status(404).json(new ApiError(404, JSON.stringify(e)));
      }
    }
    case "POST": {
      try {
        const latestBrew = await getLatestBrew();
        if (isThrottleBrew(BREW_THRESHOLD_SECONDS, latestBrew)) {
          return res
            .status(425)
            .json(new ApiError(425, "Too early for a new brew!"));
        }

        return getRandomFact()
          .then((fact) => createBrew(fact))
          .then((createdBrew) =>
            postToSlackChannel(createdBrew.fact).then(() =>
              res.status(201).json(createdBrew)
            )
          );
      } catch (e) {
        console.log(e);
        res.status(404).json(new ApiError(404, JSON.stringify(e)));
      }
      break;
    }
    default: {
      res.status(501);
      break;
    }
  }
}
