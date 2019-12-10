import { NextApiRequest, NextApiResponse } from "next"
import { getRepository, getConnection } from "../../../db/connection"
import { Request } from "../../../db/entities/Request"
import { createRequestHandler } from "../../../server_components/RequestHandler"
import { pick } from 'lodash'
import { Contact } from "../../../db/entities"
import { EntityManager } from "typeorm"

export interface RequestResponse {
  request: Request
}

async function getRequest(id: string | number | string[]): Promise<Request | undefined> {
  return await (await getRepository(Request)).findOne(id as string, {
    relations: [
      "owner",
      "price_range",
      "neighborhood",
      "contacts",
      // Hiding "itinerary_items" for now
    ]
  })
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  try {
    const request = await getRequest(id)
    if (!request) {
      res.status(404).json({})
    } else {
      const response: RequestResponse = { request }
      res.status(200).json(response)
    }
  } catch (e) {
    res.status(500).json({ err: e })
  }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  const body = req.body
  try {
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
    res.status(200).json(await getRequest(id))
  } catch (e) {
    res.status(500).json({ err: e.message })
  }
}

export default createRequestHandler({
  'GET': get,
  'PUT': put,
})
