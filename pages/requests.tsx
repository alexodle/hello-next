import { RequestsResponse } from "./api/requests";
import Layout from "../components/Layout";
import Link from "next/link";
import fetchJSON from "../common/fetch";
import { Request } from "../db/entities/Request";

interface RequestsProps {
  requests: Request[]
}

const Requests = (props: RequestsProps) => (
  <Layout>
    <h1>Requests</h1>
    <ul>
      {props.requests.map(req => (
        <li key={req.id}>
          <Link href="/requests/[id]" as={`/requests/${req.id}`}>
            <a>({req.start_window} - {req.end_window}) {req.id} - {req.owner.display_name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Requests.getInitialProps = async function() {
  const res = await fetchJSON<RequestsResponse>('/api/requests')
  return { requests: res.data.requests }
}

export default Requests
