// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Brew } from "../../../common/api/generated/models/Brew";

const prisma = new PrismaClient();

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
        const fact = await fetchRandomFact();
        const createdBrew: Brew = await prisma.brew.create({
          data: {
            dateTime: new Date(),
            fact,
          },
        });
        return res.status(201).json(createdBrew);
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
