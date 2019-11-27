import { NextApiRequest, NextApiResponse } from "next";
import { seed } from "../../db/seedDev"
import { getRepository } from "../../db/connection";
import { Request } from "../../db/entities/Request";

export interface RequestsResponse {
  requests: Request[]
}

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  // TEMP TEMP
  //seed()

  try {
    const requests = await (await getRepository(Request)).find({ relations: ["owner"] })
    const response: RequestsResponse = { requests }
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({err: e })
  }
}
