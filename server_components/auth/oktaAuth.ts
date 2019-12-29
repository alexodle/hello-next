import uuid from 'uuid'
import { BASE_URL } from '../../common/fetch'
import { buildURL } from '../../common/util'
import { getRepository } from '../../db/connection'
import { LoginFlow, User } from '../../db/entities'
import { BeginOauthResult, OAuth, RetrieveTokenParams, RetrieveTokenResult } from './types'

function validate(v: string | undefined, k: string): string {
  if (!v || !v.trim()) {
    throw new Error(`empty config: ${k}`)
  }
  return v.trim()
}

function authDigest() {
  const { oktaClientID, oktaClientSecret } = oktaConfig
  const secret = Buffer.from(`${oktaClientID}:${oktaClientSecret}`).toString('base64')
  return `Basic ${secret}`
}

const oktaConfig = {
  oktaDomain: validate(process.env.OKTA_DOMAIN, 'OKTA_DOMAIN'),
  oktaClientID: validate(process.env.OKTA_CLIENT_ID, 'OKTA_CLIENT_ID'),
  oktaClientSecret: validate(process.env.OKTA_CLIENT_SECRET, 'OKTA_CLIENT_SECRET'),
}

interface OktaResponse {
  access_token: string,
  token_type: 'Bearer',
  expires_in: number,
  scope: 'openid',
  id_token: string,
}

export class OktaAuth implements OAuth {
  async beginOauth(): Promise<BeginOauthResult> {
    const { oktaDomain, oktaClientID } = oktaConfig
    const state = `state-${uuid()}`

    const loginFlowRepo = await getRepository(LoginFlow)
    await loginFlowRepo.save({ oauth_state: state, timestamp: new Date() })

    const redirectUrl = buildURL(`https://${oktaDomain}/oauth2/default/v1/authorize`, {
      client_id: oktaClientID,
      response_type: 'code',
      scope: 'openid',
      redirect_uri: `${BASE_URL}/auth/callback`,
      state,
    }).toString()

    return { redirectUrl }
  }

  async retrieveOauthToken({ code, state }: RetrieveTokenParams): Promise<RetrieveTokenResult> {
    const { oktaDomain } = oktaConfig

    const loginFlowRepo = await getRepository(LoginFlow)
    const loginFlow = await loginFlowRepo.findOne({ oauth_state: state })
    if (!loginFlow) {
      throw new Error(`invalid auth callback state: ${state}`)
    }

    await loginFlowRepo.delete(loginFlow.id)

    const url = `https://${oktaDomain}/oauth2/default/v1/token`
    const headers = {
      Accept: 'application/json',
      Authorization: authDigest(),
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const callbackURL = `${BASE_URL}/auth/callback`
    const data = [
      'grant_type=authorization_code',
      `redirect_uri=${encodeURIComponent(callbackURL)}`,
      `code=${code}`,
    ].join('&')

    const oktaResponse = await fetch(url, {
      method: 'POST',
      headers,
      body: data,
    })
    const auth: OktaResponse = await oktaResponse.json()
    if (!oktaResponse.ok) {
      if (process.env.NODE_ENV !== 'production') {
        try {
          console.log('error response from okta:')
          console.dir(auth)
        } catch (e) { }
      }
      throw new Error(`error getting tokens from okta: ${oktaResponse.status}`)
    }

    return { token: auth.access_token }
  }

  async userFromToken(_token: string): Promise<User> {
    throw new Error('TODO')
  }
}
