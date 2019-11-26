import { Request } from '../api/requests/types'
import { NextPageContext } from 'next'
import { RequestResponse } from '../api/requests/[id]'
import Layout from '../../components/Layout'
import fetchJSON from '../../common/fetch'

export interface RequestProps {
  request: Request
}

export default function RequestPage(props: RequestProps) {
  return (
    <Layout>
      <h1>Request: {props.request.id}</h1>
      <code>
        {JSON.stringify(props.request, null, 2)}
      </code>
    </Layout>
  )
}

RequestPage.getInitialProps = async function(req: NextPageContext) {
  const res = await fetchJSON<RequestResponse>(`/api/requests/${req.query.id}`)
  return { request: res.data.request }
}
