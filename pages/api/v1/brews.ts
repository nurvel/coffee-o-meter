// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Brew } from "../../../common/api/generated/models/Brew";
import { mockData } from "../../../common/mockData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Brew | Brew[]>
) {
  switch (req.method) {
    case "GET": {
      res.status(200).json(mockData.brews);
      break;
    }
    case "POST": {
      res.status(201).json(mockData.brew);
      break;
    }
    default: {
      res.status(501);
      break;
    }
  }
}
