import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
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
export default async function del(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('tweets');
    const count = await collection.deleteOne({ _id: ObjectId(req.body.id)});
    res.status(200).send(JSON.stringify(count));
}
