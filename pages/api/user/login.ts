import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import connectToDatabase from '../../../util/db';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('users');

    const user = await collection.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            { username: user.username, id: user._id, time: new Date() },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', token, {
                httpOnly: true,
                maxAge: 6 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            })
        );

        res.json(user);
    } else {
        res.json({ error: 'Incorrect username or password :/' });
        return;
    }

    return res.status(400).send({ error: 'username or password is incorrect' });
}
