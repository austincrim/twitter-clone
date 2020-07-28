import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectToDatabase from '../../../util/db';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('users');

    const user = await collection.findOne({ username: req.body.username });
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
            if (match) {
                return res.status(200).send({ loggedIn: true, user });
            }
            return res
                .status(400)
                .send({ error: 'username or password is incorrect' });
        });
    }

    return res.status(400).send({ error: 'username or password is incorrect' });
}
