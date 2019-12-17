import { putJSON, fetchJSON } from '../../common/fetch'
import { RequestView } from '../../components/RequestView'
import { Request } from '../../db/entities'
import { useState, useContext } from 'react'
import { Button } from '../../components/forms'
import { EnumsResponse } from '../api/enums'
import { EnumContext } from '../../components/EnumContext'
import { AlertContext } from '../../components/Alert'
import { RequestResponse } from '../api/requests/[id]'
import { NextPageContext } from 'next'
import { RequestBuilderProvider } from '../../components/new_request_form/RequestBuilderContext'
import { RequestBuilder } from '../../components/new_request_form/RequestBuilder'

export interface RequestPageProps {
  request: Request
  enums: EnumsResponse
}

export default function RequestPage(props: RequestPageProps) {
  const requestProp = props.request

  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // TODO: HACK - need to be able to update global state cache here, or force pull
  const [request, setRequest] = useState(requestProp)

  const alerter = useContext(AlertContext)

  async function onSaveChanges(newRequest: Partial<Request>) {
    setSaving(true)
    try {
      const resp = await putJSON<Partial<Request>>(`/api/requests/${request.id}`, newRequest)
      alerter.alert('Updated', 'success')
      setRequest(resp.data as Request)
      setIsEditing(false)
    } catch (e) {
      // TODO
      console.error('TODO: ' + e)
    } finally {
      setSaving(false)
    }
  }

  const renderEditor = () => (
    <RequestBuilderProvider initialRequest={request} onSave={onSaveChanges} saving={saving}>
      <RequestBuilder forceExpand saveButtonText='Save changes' />
    </RequestBuilderProvider>
  )

  const { enums } = props
  return (
    <EnumContext.Provider value={enums}>
      <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</Button>
      {isEditing ?
        renderEditor() :
        <RequestView request={request} />
      }
    </EnumContext.Provider>
  )
}

RequestPage.getInitialProps = async function (req: NextPageContext) {
  const [requestResp, enumsResp] = await Promise.all([
    fetchJSON<RequestResponse>(`/api/requests/${req.query.id}`),
    fetchJSON<EnumsResponse>(`/api/enums`),
  ])

  return { request: requestResp.data.request, enums: enumsResp.data }
}
