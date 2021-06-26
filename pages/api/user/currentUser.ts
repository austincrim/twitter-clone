import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies
  if (token) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    res.json(user)
  } else {
    res.status(404).json({})
  }
}
