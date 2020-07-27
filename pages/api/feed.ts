import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../util/db';

export default async function feed(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('tweets');
    const tweets = await collection.find({}).toArray();
    
    res.send(JSON.stringify(tweets));
}
