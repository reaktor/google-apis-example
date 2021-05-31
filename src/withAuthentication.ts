import Cookies from 'cookies'
import { GetServerSideProps } from 'next'
import { googleAuthPageURL } from '../src/googleAuth'
import { getAuthenticatedUser } from '../src/session'

// Wrapper for a Next.js GetServerSideProps function, requiring an authenticated user
export const withAuthentication: (getProps: GetServerSideProps) => GetServerSideProps = getProps => async (context) => {
  const cookies = new Cookies(context.req, context.res)
  const user = getAuthenticatedUser(context.req)
  if (user === null) {
    console.log("Redirect to google, return to", context.req.url)
    cookies.set("redirect", context.req.url)
    return {
      redirect: {
        destination: googleAuthPageURL(),
        permanent: false
      }
    }
  }
  return await getProps(context)
}