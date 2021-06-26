import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../../lib/prisma'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username }
  })

  console.log(user)
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      { username: user.username, id: user.id, time: new Date() },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
    )

    res.json(user)
    return
  } else {
    res.json({ error: 'Incorrect username or password :/' })
    return
  }
}
