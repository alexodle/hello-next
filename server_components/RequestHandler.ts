import { NextApiRequest, NextApiResponse } from "next"
import { AuthError } from "../common/auth_utils"
import { NotFoundError } from "./errors"

export interface HandlerFunc {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>
}

export interface HandlerSpec {
  get?: HandlerFunc,
  post?: HandlerFunc,
  put?: HandlerFunc,
  delete?: HandlerFunc,
}

export function createRequestHandler(spec: HandlerSpec) {
  const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const method = (req.method || '').toLowerCase() as 'get' | 'post' | 'put' | 'delete'
    const methodHandler = spec[method]
    if (!methodHandler) {
      return res.status(404).json({ error: `not found: ${req.method}` })
    }
    try {
      await methodHandler(req, res)
    } catch (e) {
      if (e instanceof AuthError) {
        res.status(401).json({ error: e.message || 'unauthorized' })
      } else if (e instanceof NotFoundError) {
        res.status(404).json({ error: 'not found' })
      } else {
        console.error(e)
        if (process.env.NODE_ENV !== 'production') {
          res.status(500).json({ error: e.message })
        } else {
          res.status(500).json({ error: 'error occurred' })
        }
      }
    }
  }
  return handler;
}
