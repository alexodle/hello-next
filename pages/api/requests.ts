import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "../../db/connection";
import { Request } from "../../db/entities/Request";

export interface RequestsResponse {
  requests: Request[]
}

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requests = await (await getRepository(Request)).find({ relations: ["owner"] })
    const response: RequestsResponse = { requests }
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
