import Cookies from 'cookies'
import JWT from "jsonwebtoken"
import { getEnv } from '../src/env'
import { UserInfo } from './googleAuth'
import { IncomingMessage, ServerResponse } from 'http'

const secret = getEnv("GOOGLE_OAUTH_CLIENT_SECRET")

// Get / set authenticated user stored in cookies

export function getAuthenticatedUser(req: IncomingMessage): UserInfo | null {
  const userCookie = new Cookies(req, null as any).get("user")
  if (userCookie) {        
      try {
          JWT.verify(userCookie, secret)
          return JWT.decode(userCookie) as UserInfo
      } catch (e) {
          console.warn("Token verification failed", userCookie, e)
      }
  }
  return null
}

export function setAuthenticatedUser(req: IncomingMessage, res: ServerResponse, userInfo: UserInfo) {
    const jwt = JWT.sign(userInfo, secret) 
    new Cookies(req, res).set("user", jwt, { maxAge: 24 * 3600 * 1000 } ) // Max 24 hours
}