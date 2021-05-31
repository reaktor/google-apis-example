// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getGoogleAccountFromCode } from '../../src/googleAuth'
import Cookies from 'cookies'
import { setAuthenticatedUser } from '../../src/session'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code as string
    console.log("Verifying google auth", code)
    try {
        const userInfo = await getGoogleAccountFromCode(code)
        setAuthenticatedUser(res, userInfo)
        const redirectCookie = req.cookies.redirect        
        res.redirect(redirectCookie ?? "/")
    } catch (e) {
        console.error(e)
        res.status(500).send("Internal error")
    }
}