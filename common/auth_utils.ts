import { parseCookies } from 'nookies'
import { NextPageContext } from 'next'
import Router from 'next/router'

export class AuthError extends Error { }

export class UnauthenticatedError extends AuthError { }

export class UnauthorizedError extends AuthError { }

export interface FetchOptions {
  [key: string]: any
}

export interface Authorizor {
  (fetchOptions: FetchOptions): FetchOptions
}

// TODO: define elsewhere?
export interface GetInitialPropsFunc<T> {
  (ctx: NextPageContext): Promise<T>
}

export interface AuthedGetInitialPropsFunc<T> {
  (ctx: NextPageContext, authorizer: Authorizor): Promise<T>
}

export function requireAuth<T>(cb: (AuthedGetInitialPropsFunc<T>)): GetInitialPropsFunc<T> {
  return async (ctx: NextPageContext): Promise<T> => {
    try {
      return cb(ctx, createAuthorizer(ctx))
    } catch (e) {
      if (e instanceof AuthError) {
        const { res } = ctx
        if (res) {
          res.writeHead(302, { Location: '/login' })
          res.end()
        } else {
          Router.push('/login')
        }
        return null as any as T
      } else {
        throw e
      }
    }
  }
}

export function getToken(ctx?: NextPageContext): string | null {
  const { token } = parseCookies(ctx)
  return token || null
}

export function createAuthorizer(ctx?: NextPageContext): Authorizor {
  const token = getToken(ctx)
  if (!token) {
    throw new UnauthenticatedError()
  }
  return function (fetchOptions: FetchOptions): FetchOptions {
    fetchOptions.headers = fetchOptions.headers || {}
    fetchOptions.headers.authorization = `Bearer ${token}`
    return fetchOptions
  }
}
