import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../util/db';
import url from 'url';

export default async function del(req: NextApiRequest, res: NextApiResponse) {
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = db
        .db(url.parse(process.env.MONGO_CONNECTION_URI).pathname.substr(1))
        .collection('tweets');
    const count = await collection.deleteOne({
        _id: new ObjectId(req.body.id),
    });

    db.close();
    res.status(200).send(JSON.stringify(count));
}
