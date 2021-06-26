import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function feed(req: NextApiRequest, res: NextApiResponse) {
  const tweets = await prisma.tweet.findMany()
  return res.send(JSON.stringify(tweets))
}
