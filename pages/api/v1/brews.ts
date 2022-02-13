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
        res.status(200).json(brews);
        console.log("returned brews");
      } catch (e) {
        console.log(e);
        res.status(404).json(new ApiError(404, JSON.stringify(e)));
      }
      break;
    }
    case "POST": {
      const createdBrew: Brew = await prisma.brew.create({
        data: {
          dateTime: new Date(),
        },
      });
      res.status(201).json(createdBrew);
      break;
    }
    default: {
      res.status(501);
      break;
    }
  }
}
