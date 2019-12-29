import { Request } from '../../db/entities'
import { RequestResponse } from '../../pages/api/requests/[id]'
import { RequestsResponse } from '../../pages/api/requests'
import { fetchJSON, putJSON } from '../fetch'
import { Authorizor } from '../auth_utils'

export function normalizeRequest(r: Request): Request {
  // in-place for efficiency
  r.end_window = new Date(r.end_window)
  r.start_window = new Date(r.start_window)
  return r
}

export async function fetchRequest(id: number | string, authorizer: Authorizor): Promise<Request> {
  const resp = await fetchJSON<RequestResponse>(`/api/requests/${id}`, authorizer)
  if (typeof window !== 'undefined') {
    return normalizeRequest(resp.data.request)
  }
  return resp.data.request
}

export async function fetchRequests(authorizer: Authorizor): Promise<Request[]> {
  const resp = await fetchJSON<RequestsResponse>(`/api/requests`, authorizer)
  if (typeof window !== 'undefined') {
    return resp.data.requests.map(normalizeRequest)
  }
  return resp.data.requests
}

export async function updateRequest(id: number | string, newRequest: Partial<Request>, authorizer: Authorizor): Promise<Request> {
  const resp = await putJSON<Partial<Request>>(`/api/requests/${id}`, newRequest, authorizer)
  return resp.data as Request
}
