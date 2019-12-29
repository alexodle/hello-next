import { OAuth, BeginOauthResult, RetrieveTokenResult } from './types'
import { BASE_URL } from '../../common/fetch'
import { User } from '../../db/entities'
import { getRepository } from '../../db/connection'

export class StubAuth implements OAuth {

  async beginOauth(): Promise<BeginOauthResult> {
    return { redirectUrl: `${BASE_URL}/auth/callback?code=12345&state=12345` }
  }

  async retrieveOauthToken({ }): Promise<RetrieveTokenResult> {
    return { token: 'stub-token-12345' }
  }

  async userFromToken(token: string): Promise<User> {
    if (token !== 'stub-token-12345') {
      throw new Error('invalid token, empty')
    }
    const userRepo = await getRepository(User)
    return await userRepo.findOneOrFail({ username: 'alexodle' })
  }

}
