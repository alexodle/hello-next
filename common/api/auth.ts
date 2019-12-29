import { postJSON, putJSON } from '../fetch'
import { OuathFlowResponse } from '../../pages/api/auth/begin_oauth'
import { FinalizeLoginFlowResponse } from '../../pages/api/auth/login_flow/[state]'

export const beginOuathFlow = async (): Promise<OuathFlowResponse> => {
  // TODO: refactor fetch json methods to accept Request and Response types separately
  const res = await postJSON('/api/auth/begin_oauth', {})
  return res.data as OuathFlowResponse
}

export const finalizeLoginFlow = async (state: string, code: string): Promise<FinalizeLoginFlowResponse> => {
  const res = await putJSON(`/api/auth/login_flow/${state}`, { code })
  return res.data as any as FinalizeLoginFlowResponse
}
