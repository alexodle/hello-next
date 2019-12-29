import { NextApiRequest, NextApiResponse } from "next";
import { createRequestHandler } from "../../../server_components/RequestHandler";
import { auth } from '../../../server_components/auth'

export interface OuathFlowResponse {
  redirectUrl: string
}

async function createOuathFlow(_req: NextApiRequest, res: NextApiResponse) {
  const result = await auth.beginOauth()
  const response: OuathFlowResponse = { redirectUrl: result.redirectUrl }
  res.status(200).send(response)
}

export default createRequestHandler({
  post: createOuathFlow,
})
