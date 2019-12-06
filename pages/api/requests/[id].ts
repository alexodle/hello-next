import { NextApiRequest, NextApiResponse } from "next"
import { getRepository } from "../../../db/connection"
import { Request } from "../../../db/entities/Request"

export interface RequestResponse {
  request: Request
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id } } = req
  try {
    const request = await (await getRepository(Request)).findOne(id as string, { relations: [
      "owner",
      "price_range",
      "neighborhood",
      "contacts",
      // Hiding "itinerary_items" for now
    ]})
    if (!request) {
      res.status(404).json({})
    } else {
      const response: RequestResponse = { request }
      res.status(200).json(response)
    }
  } catch (e) {
    res.status(500).json({err: e })
  }
}
