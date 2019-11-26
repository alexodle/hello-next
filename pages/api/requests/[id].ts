import { NextApiRequest, NextApiResponse } from "next"
import { Request } from "./types"

export interface RequestResponse {
  request: Request
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id } } = req
  const response: RequestResponse = {
    request: {id: (id as string), user:{name:"Alex"}, date:new Date(), meta:{}}
  }
  setTimeout((() => res.status(200).json(response)), 2000)
}
