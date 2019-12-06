import { NextPageContext } from 'next'
import { RequestResponse } from '../api/requests/[id]'
import Layout from '../../components/Layout'
import fetchJSON from '../../common/fetch'
import RequestView from '../../components/RequestView'
import { Request } from '../../db/entities'

export interface RequestPageProps {
  request: Request
}

export default function RequestPage(props: RequestPageProps) {
  const { request } = props
  return (
    <Layout>
      <RequestView request={request} />
      <code>
        {JSON.stringify(props.request, null, 2)}
      </code>
    </Layout>
  )
}

RequestPage.getInitialProps = async function (req: NextPageContext) {
  const res = await fetchJSON<RequestResponse>(`/api/requests/${req.query.id}`)
  return { request: res.data.request }
}
