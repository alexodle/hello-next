import { pick } from 'lodash'
import { NextApiResponse } from "next"
import { EntityManager } from "typeorm"
import { UnauthorizedError } from "../../../common/auth_utils"
import { getConnection, getRepository } from "../../../db/connection"
import { Contact } from "../../../db/entities"
import { Request } from "../../../db/entities/Request"
import { AuthenticatedNextApiRequest, withAuth } from "../../../server_components/auth/authorize"
import { NotFoundError } from "../../../server_components/errors"
import { createRequestHandler } from "../../../server_components/RequestHandler"

export interface RequestResponse {
  request: Request
}

async function getRequestAndEnsureAuthz(req: AuthenticatedNextApiRequest): Promise<Request> {
  const id = req.query.id
  const request = await (await getRepository(Request)).findOne(id as string, {
    relations: [
      "owner",
      "price_range",
      "neighborhood",
      "contacts",
      // Hiding "itinerary_items" for now
    ]
  })
  if (!request) {
    throw new NotFoundError()
  }
  if (req.user.id !== request.owner.id) {
    throw new UnauthorizedError()
  }
  return request
}

async function get(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  const request = await getRequestAndEnsureAuthz(req)
  const response: RequestResponse = { request }
  res.status(200).json(response)
}

async function put(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  await getRequestAndEnsureAuthz(req)

  const id = req.query.id
  const body = req.body

  const conn = await getConnection()
  await conn.transaction(async (entityMgr: EntityManager) => {
    const newRequest: Partial<Request> = {
      fulfilled: false,
      ...pick(body, [
        'n_people',
        'start_window',
        'end_window',
        'notes',
        'neighborhood',
        'price_range',
        'cancelled',
      ]),
    }
    await entityMgr.delete(Contact, { request: { id } })
    await Promise.all([
      body.contacts.length ?
        entityMgr.insert(Contact, body.contacts.map((c: Contact) => ({ ...c, request: { id } }))) :
        null,
      entityMgr.update(Request, id, newRequest)
    ])
  })

  res.status(200).json(await getRequestAndEnsureAuthz(req))
}

export default createRequestHandler({
  'get': withAuth(get),
  'put': withAuth(put),
})
