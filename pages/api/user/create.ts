import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectToDatabase from '../../../util/db';

export default async function create(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('users');
    const SALT_ROUNDS = 8;
    let inserted;

    const user = await collection.findOne({ username: req.body.username });
    if (user?.username === req.body.username) {
        return res.status(400).send('username already exists');
    }

    bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
        if (err) {
            return res.status(500).send(`big error: ${err}`);
        }
        inserted = collection.insertOne({
            username: req.body.username,
            password: hash,
        });
        return res.status(201).json({message: `user ${req.body.username} created`});
    });

}
