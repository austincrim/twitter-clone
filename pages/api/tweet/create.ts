import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../util/db';
import url from 'url';

export default async function create(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = db
        .db(url.parse(process.env.MONGO_CONNECTION_URI).pathname.substr(1))
        .collection('tweets');
    const inserted = await collection.insertOne({
        text: req.body.text,
        author: req.body.author,
    });

    db.close();
    res.status(201).send(JSON.stringify(inserted));
}
