import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import url from 'url';

let cachedDb = null;

async function connectToDatabase(uri: string) {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(uri, { useNewUrlParser: true });

    const db = client.db(url.parse(uri).pathname.substr(1));

    cachedDb = db;
    return db;
}

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
