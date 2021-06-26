import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const inserted = await prisma.tweet.create({
    data: {
      text: req.body.text,
      author: req.body.author
    }
  })
  res.status(201).send(JSON.stringify(inserted))
}
