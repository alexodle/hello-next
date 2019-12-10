import fetch from 'isomorphic-unfetch'

export interface FetchResponse<R> {
  data: R;
}

// TODO: figure out how to get hostname
const BASE_URL = 'http://localhost:3000'

function fullURL(url: string): string {
  return `${BASE_URL}${url}`
}

export async function fetchJSON<R>(url: string): Promise<FetchResponse<R>> {
  const resp = await fetch(fullURL(url))
  const data = await resp.json()
  return { data }
}

export function postJSON<R>(url: string, body: R): Promise<FetchResponse<R>> {
  return sendData('POST', url, body)
}

export function putJSON<R>(url: string, body: R): Promise<FetchResponse<R>> {
  return sendData('PUT', url, body)
}

async function sendData<R>(method: 'POST' | 'PUT', url: string, body: R): Promise<FetchResponse<R>> {
  const resp = await fetch(fullURL(url), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await resp.json()
  return { data }
}
