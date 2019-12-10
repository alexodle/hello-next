import { NextPageContext } from 'next'
import { RequestResponse } from '../api/requests/[id]'
import Layout from '../../components/Layout'
import { fetchJSON, postJSON, putJSON } from '../../common/fetch'
import RequestView from '../../components/RequestView'
import { Request } from '../../db/entities'
import { useState } from 'react'
import { RequestForm } from '../../components/RequestForm'
import { Button } from '../../components/forms'
import { EnumsResponse } from '../api/enums'
import EnumContext from '../../components/EnumContext'
import { useRouter } from 'next/router'

export interface RequestPageProps {
  request: Request
  enums: EnumsResponse
}

export default function RequestPage(props: RequestPageProps) {
  const router = useRouter()
  const { request } = props;

  const [isEditing, setIsEditing] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  async function onUpdate(newRequest: Partial<Request>) {
    setIsPosting(true)
    try {
      await putJSON<Partial<Request>>(`/api/requests/${request.id}`, newRequest)
      router.replace(router.asPath)
    } catch (e) {
      console.error('TODO: ' + e)
      setIsPosting(false)
    }
  }

  const { enums } = props
  return (
    <EnumContext.Provider value={enums}>
      <Layout>
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</Button>
        {isEditing ?
          <RequestForm request={request} onSubmit={onUpdate} isPosting={isPosting} /> :
          <RequestView request={request} />
        }
      </Layout>
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
