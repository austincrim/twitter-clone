import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function del(req: NextApiRequest, res: NextApiResponse) {
  const count = await prisma.tweet.delete({
    where: {
      id: req.body.id
    }
  })
  res.status(200).send(JSON.stringify(count))
}
