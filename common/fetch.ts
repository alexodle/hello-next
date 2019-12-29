import fetch from 'isomorphic-unfetch'
import { Authorizor, FetchOptions } from './auth_utils'

export interface FetchResponse<R> {
  data: R;
}

// TODO: figure out how to get hostname
export const BASE_URL = 'http://localhost:3000'

const noopAuthorizer = (opts: FetchOptions): FetchOptions => opts

function fullURL(url: string): string {
  return `${BASE_URL}${url}`
}

async function handleResponse<R>(resp: Response): Promise<FetchResponse<R>> {
  let data = null
  try {
    data = await resp.json()
  } catch (e) {
    throw new Error(`could not parse json: ${resp.status}`)
  }
  if (resp.ok) {
    return { data }
  } else {
    throw new Error(JSON.stringify(data))
  }
}

export async function fetchJSON<R>(url: string, authorizer: Authorizor = noopAuthorizer): Promise<FetchResponse<R>> {
  const resp = await fetch(fullURL(url), authorizer({}))
  return handleResponse(resp)
}

export function postJSON<R>(url: string, body: R, authorizer: Authorizor = noopAuthorizer): Promise<FetchResponse<R>> {
  return sendData('POST', url, body, authorizer)
}

export function putJSON<R>(url: string, body: R, authorizer: Authorizor = noopAuthorizer): Promise<FetchResponse<R>> {
  return sendData('PUT', url, body, authorizer)
}

async function sendData<R>(method: 'POST' | 'PUT', url: string, body: R, authorizer: Authorizor): Promise<FetchResponse<R>> {
  const resp = await fetch(fullURL(url), authorizer({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }))
  return handleResponse(resp)
}
