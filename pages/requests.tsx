import { RequestsResponse } from "./api/requests";
import Layout from "../components/Layout";
import Link from "next/link";
import { Request } from "./api/requests/types";
import fetchJSON from "../common/fetch";

interface RequestsProps {
  requests: Array<Request>
}

const Requests = (props: RequestsProps) => (
  <Layout>
    <h1>Requests</h1>
    <ul>
      {props.requests.map(req => (
        <li key={req.id}>
          <Link href="/requests/[id]" as={`/requests/${req.id}`}>
            <a>({req.date}) {req.id} - {req.user.name}</a>
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
