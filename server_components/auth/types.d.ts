import { User } from "../../db/entities";

export interface BeginOauthResult {
  redirectUrl: string
}

export interface RetrieveTokenParams {
  code: string
  state: string
}

export interface RetrieveTokenResult {
  token: string
}

export interface OAuth {
  beginOauth(): Promise<BeginOauthResult>
  retrieveOauthToken(params: RetrieveTokenParams): Promise<RetrieveTokenResult>
  userFromToken(token: string): Promise<User>
}
