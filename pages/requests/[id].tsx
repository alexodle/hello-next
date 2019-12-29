
import { NextPageContext } from 'next'
import { useContext, useState } from 'react'
import { fetchEnums, fetchRequest, updateRequest } from '../../common/api'
import { createAuthorizer } from '../../common/auth_utils'
import { AlertContext } from '../../components/Alert'
import { EnumContext } from '../../components/EnumContext'
import { Button, SubmitButton } from '../../components/forms'
import { DateForm } from '../../components/new_request_form/DateForm'
import { DetailsForm } from '../../components/new_request_form/DetailsForm'
import { RequestForm } from '../../components/new_request_form/RequestBuilderContext'
import { RequestView } from '../../components/RequestView'
import { Request } from '../../db/entities'
import { EnumsResponse } from '../api/enums'

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
      const updatedRequest = await updateRequest(request.id, newRequest, createAuthorizer())
      alerter.alert('Updated', 'success')
      setRequest(updatedRequest)
      setIsEditing(false)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(e)
      }
      alerter.alert('Unknown error occurred. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const renderEditor = () => (
    <RequestForm initialRequest={request} onSubmit={onSaveChanges} saving={saving}>
      <DateForm />
      <DetailsForm />
      <SubmitButton>Save changes</SubmitButton>
    </RequestForm>
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

RequestPage.getInitialProps = async function (ctx: NextPageContext) {
  const [request, enums] = await Promise.all([
    fetchRequest(ctx.query.id as string, createAuthorizer(ctx)),
    fetchEnums(),
  ])
  return { request, enums }
}
