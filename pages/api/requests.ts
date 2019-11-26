import { NextApiRequest, NextApiResponse } from "next";
import { Request } from "./requests/types";

export interface RequestsResponse {
  requests: Array<Request>
}

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const response: RequestsResponse = {
    requests: [
      {id: "1", user:{name:"Alex"}, date:new Date(), meta:{}},
      {id: "2", user:{name:"Kara"}, date:new Date(), meta:{}},
    ]
  }
  setTimeout((() => res.status(200).json(response)), 2000)
}
