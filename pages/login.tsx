import { NextPage } from 'next'
import { beginOuathFlow } from '../common/api/auth'

export interface LoginPageProps {
}

const LoginPage: NextPage<LoginPageProps> = ({ }) => null

LoginPage.getInitialProps = async ({ res }): Promise<LoginPageProps> => {
  const { redirectUrl } = await beginOuathFlow()
  if (res) {
    res.writeHead(302, { Location: redirectUrl })
    res.end()
  } else {
    window.location.href = redirectUrl
  }
  return {}
}

export default LoginPage
