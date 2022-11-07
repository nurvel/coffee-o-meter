import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Brew } from "@prisma/client";
import { getLatestBrew } from "../_brewService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Brew | Brew[] | ApiError>
) {
  switch (req.method) {
    case "GET": {
      console.log("GET /brews/latest"); // TODO: replace these with actual logs

      try {
        return getLatestBrew().then((brew) => {
          if (brew) {
            return res.status(200).json(brew);
          }
          return res.status(204);
        });
      } catch (e) {
        console.log(e);
        return res.status(404).json(new ApiError(404, JSON.stringify(e)));
      }
    }

    default: {
      res.status(501);
      break;
    }
  }
}
