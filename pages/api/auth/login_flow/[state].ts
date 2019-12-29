import { createRequestHandler } from "../../../../server_components/RequestHandler"
import { NextApiRequest, NextApiResponse } from "next"
import { auth } from "../../../../server_components/auth"

export interface FinalizeLoginFlowProps {
  code: string
}

export interface FinalizeLoginFlowQueryParams {
  state: string
}

export interface FinalizeLoginFlowResponse {
  token: string
}

async function finalizeLoginFlow(req: NextApiRequest, res: NextApiResponse) {
  const query: Partial<FinalizeLoginFlowQueryParams> = req.query
  if (!query.state) {
    throw new Error('invalid auth callback: missing state')
  }
  const { state } = query

  const params: Partial<FinalizeLoginFlowProps> = req.body
  if (!params.code) {
    throw new Error('invalid auth callback: missing code')
  }
  const { code } = params

  const result = await auth.retrieveOauthToken({ code, state })
  const resp: FinalizeLoginFlowResponse = { token: result.token }
  res.status(200).send(resp)
}

export default createRequestHandler({
  put: finalizeLoginFlow,
})
