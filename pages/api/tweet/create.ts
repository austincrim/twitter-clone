import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../util/db';

export default async function create(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('tweets');
    const inserted = await collection.insertOne(
        { text: req.body.text, author: req.body.author || 'Austin Crim' },
    );

    res.status(201).send(JSON.stringify(inserted));
}
