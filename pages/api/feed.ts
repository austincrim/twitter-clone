import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../util/db';
import { MongoClient } from 'mongodb';
import url from 'url';

export default async function feed(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = db
        .db(url.parse(process.env.MONGO_CONNECTION_URI).pathname.substr(1))
        .collection('tweets');
    const tweets = await collection.find({}).toArray();
    db.close();

    return res.send(JSON.stringify(tweets));
}
