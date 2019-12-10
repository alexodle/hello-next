import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "../../db/connection";
import { Neighborhood, PriceRange } from "../../db/entities";

export interface EnumsResponse {
  neighborhoods: Neighborhood[]
  priceRanges: PriceRange[]
}

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [neighborhoods, priceRanges] = await Promise.all([
      (await getRepository(Neighborhood)).find(),
      (await getRepository(PriceRange)).find(),
    ])
    const response: EnumsResponse = { neighborhoods, priceRanges }
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
