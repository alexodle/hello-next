import { NextPageContext, NextPage } from 'next'
import { finalizeLoginFlow } from '../../common/api/auth'
import { setCookie } from 'nookies'

const COOKIE_AGE = 60 * 60 * 24 * 7 // 1 week

export interface CallbackPageProps {
}

interface ExpectedQuery {
  code: string
  state: string
}

const CallbackPage: NextPage<CallbackPageProps> = () => null

CallbackPage.getInitialProps = async (ctx: NextPageContext): Promise<CallbackPageProps> => {
  const res = ctx.res
  if (!res) {
    throw new Error('invalid callback')
  }

  const query: Partial<ExpectedQuery> = ctx.query
  if (!query || !query.code || !query.state) {
    throw new Error('invalid query params')
  }

  const auth = await finalizeLoginFlow(query.state, query.code)
  setCookie(ctx, 'token', auth.token, {
    maxAge: COOKIE_AGE,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  res.writeHead(302, { Location: '/' })
  res.end()

  return {}
}

export default CallbackPage
