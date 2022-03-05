// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Brew } from "../../../common/api/generated/models/Brew";

const prisma = new PrismaClient();

const DEFAULT_BREW_THRESHOLD_MINUTES = 10;
const BREW_THRESHOLD_MINUTES =
  process.env.NODE_ENV === "development" ? 0 : DEFAULT_BREW_THRESHOLD_MINUTES;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Brew | Brew[] | ApiError>
) {
  switch (req.method) {
    case "GET": {
      try {
        const brews: Brew[] = await prisma.brew.findMany();
        return res.status(200).json(brews);
      } catch (e) {
        console.log(e);
        res.status(404).json(new ApiError(404, JSON.stringify(e)));
      }
      break;
    }
    case "POST": {
      try {
        const throttleBrew = await isThrottleBrew(BREW_THRESHOLD_MINUTES);
        if (throttleBrew)
          return res
            .status(425)
            .json(new ApiError(425, "Too early for a new brew!"));

        const fact = await fetchRandomFact();
        const createdBrew: Brew = await prisma.brew.create({
          data: {
            dateTime: new Date(),
            fact,
          },
        });

        // const response = await postToSlackChannel(fact);

        return postToSlackChannel(fact).then(() =>
          res.status(201).json(createdBrew)
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

const fetchRandomFact = async (): Promise<string> => {
  const RANDOM_FACT_URL = "https://useless-facts.sameerkumar.website/api";
  return fetch(RANDOM_FACT_URL)
    .then((res) => res.json())
    .then((json) => json.data)
    .catch((err) => {
      console.log("API error fetching random fact", err);
      return "I ran out of facts. This time you could discuss the weather";
    });
};

const findLatestBrew = async () => {
  return await prisma.brew.findFirst({
    orderBy: {
      dateTime: "desc",
    },
    take: 1,
  });
};

const isThrottleBrew = async (minutes: number): Promise<boolean> => {
  const currentDateTime = new Date();
  const latestBrewDateTime = (await findLatestBrew()).dateTime;

  const throttleSeconds = minutes * 60;
  return (
    (currentDateTime.getTime() - latestBrewDateTime.getTime()) / 1000 <
    throttleSeconds
  );
};

const postToSlackChannel = async (message: string): Promise<Response> => {
  const URL = "https://slack.com/api/chat.postMessage";

  const payload = JSON.stringify({
    channel: process.env.SLACK_CHANNEL_ID,
    text: `:coffee: Fresh coffee is coming up in 5 minutes! Here is a random fact that you can discuss over coffee: "${message}"`,
  });

  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_OAUTH_TOKEN}`,
    },
    body: payload,
  });
};
