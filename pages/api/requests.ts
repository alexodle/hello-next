import { NextApiResponse } from "next";
import { getRepository } from "../../db/connection";
import { Request } from "../../db/entities/Request";
import { pick } from "lodash";
import { createRequestHandler } from "../../server_components/RequestHandler";
import { AuthenticatedNextApiRequest, withAuth } from "../../server_components/auth/authorize";

export interface RequestsResponse {
  requests: Request[]
}

async function get(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  const { user } = req
  const requests = await (await getRepository(Request)).find({
    where: { owner: user },
    relations: ["owner", "neighborhood", "price_range"]
  })
  const response: RequestsResponse = { requests }
  res.status(200).json(response)
}

async function post(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  const { body, user } = req
  const request: Request = await (await getRepository(Request)).save({
    owner: user,
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
}

export default createRequestHandler({
  get: withAuth(get),
  post: withAuth(post),
})
