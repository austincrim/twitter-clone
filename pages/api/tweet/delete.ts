import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../util/db';

export default async function del(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('tweets');
    const count = await collection.deleteOne({ _id: new ObjectId(req.body.id)});
    res.status(200).send(JSON.stringify(count));
}
