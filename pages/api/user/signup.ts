import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import url from 'url';
import connectToDatabase from '../../../util/db';

export default async function create(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = db
        .db(url.parse(process.env.MONGO_CONNECTION_URI).pathname.substr(1))
        .collection('users');
    let inserted;

    try {
        inserted = await collection.insertOne({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
        });
    } catch (error) {
        res.json({ error: 'A user with that username already exists.' });
        return;
    }
    const token = jwt.sign(
        {
            username: req.body.username,
            id: inserted.insertedId,
            time: new Date(),
        },
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
    res.json(inserted);
    return;
}
