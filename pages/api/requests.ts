import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "../../db/connection";
import { Request } from "../../db/entities/Request";
import { pick } from "lodash";
import { createRequestHandler } from "../../server_components/RequestHandler";

export interface RequestsResponse {
  requests: Request[]
}

async function get(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const requests = await (await getRepository(Request)).find({ relations: ["owner"] })
    const response: RequestsResponse = { requests }
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  try {
    const request = await (await getRepository(Request)).save({
      owner: { id: 1 },
      ...pick(body, [
        'n_people',
        'start_window',
        'end_window',
        'notes',
        'neighborhood',
        'price_range',
        'contacts',
      ]),
    })
    res.status(200).json(request)
  } catch (e) {
    res.status(500).json({ err: e })
  }
}

export default createRequestHandler({
  'GET': get,
  'POST': post,
})
