// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { appendRow } from '../../src/googleSheets'
import { getAuthenticatedUser } from '../../src/session'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("GOT", req.method, req.body)
    try {
        const user = getAuthenticatedUser(req)
        if (user === null) {
        res.status(401).send("Forbidden");
        } else {
            await appendRow([req.body.path]);
            res.json({ok: true});
        }     
    } catch (e) {
        res.status(500).send("Internal server error");
    }
}