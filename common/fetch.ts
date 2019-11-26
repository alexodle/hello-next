import fetch from 'isomorphic-unfetch'

export interface FetchResponse<R> {
  data: R;
}

export default async function fetchJSON<R>(url: string): Promise<FetchResponse<R>>  {
  const resp = await fetch("http://localhost:3000" + url)
  const data = await resp.json()
  return { data }
}
