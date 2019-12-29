import { OAuth } from './types'
import { OktaAuth } from './oktaAuth'
import { StubAuth } from './stubAuth'

let auth: OAuth
if (process.env.NODE_ENV !== 'production' && process.env.STUB_AUTH) {
  console.log('====== DEV: USING STUB AUTH ======')
  auth = new StubAuth()
} else {
  auth = new OktaAuth()
}

export { auth }
