import Cors from "micro-cors"
import { NextApiRequest, NextApiResponse } from "next"

export interface HandlerFunc {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>
}

export interface HandlerSpec {
  [key: string]: HandlerFunc
}

export function createRequestHandler(spec: HandlerSpec) {
  const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const methodHandler = spec[req.method || '']
    if (!methodHandler) {
      return res.status(404).json({ message: 'route not found' })
    }
    await methodHandler(req, res)
  }
  return handler;
}
