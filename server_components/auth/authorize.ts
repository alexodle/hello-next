import { auth } from './'
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../db/entities';
import { HandlerFunc } from '../RequestHandler';
import { UnauthenticatedError } from '../../common/auth_utils';

const BEARER_TOKEN_RE = /^[B|b]earer\s+(.*)/

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user: User
}

export interface AuthenticatedHandlerFunc {
  (req: AuthenticatedNextApiRequest, res: NextApiResponse): Promise<void>
}

async function authorize(req: NextApiRequest, _res: NextApiResponse) {
  const authHeader = req.headers.authorization || ''
  const match = BEARER_TOKEN_RE.exec(authHeader)
  if (!match) {
    throw new UnauthenticatedError('invalid auth header')
  }

  const token = match[1]
  let user: User
  try {
    user = await auth.userFromToken(token)
  } catch (e) {
    throw new UnauthenticatedError('invalid token')
  }

  const authedReq = req as AuthenticatedNextApiRequest
  authedReq.user = user
}

// TODO: micro-ize
export function withAuth(cb: AuthenticatedHandlerFunc): HandlerFunc {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await authorize(req, res)
    await cb(req as AuthenticatedNextApiRequest, res)
  }
}
