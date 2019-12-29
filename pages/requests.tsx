import Layout from "../components/Layout";
import Link from "next/link";
import { Request } from "../db/entities/Request";
import { fetchRequests } from "../common/api";
import { NextPageContext, NextPage } from "next";
import { createAuthorizer, requireAuth, Authorizor } from "../common/auth_utils";

interface RequestsProps {
  requests: Request[]
}

const Requests: NextPage<RequestsProps> = ({ requests }) => (
  <Layout>
    <h1>Requests</h1>
    <ul>
      {requests.map(req => (
        <li key={req.id}>
          <Link href="/requests/[id]" as={`/requests/${req.id}`}>
            <a>({req.start_window} - {req.end_window}) {req.id} - {req.owner.display_name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Requests.getInitialProps = requireAuth(async (_ctx: NextPageContext, authorizer: Authorizor): Promise<RequestsProps> => {
  const requests = await fetchRequests(authorizer)
  return { requests }
})

export default Requests
