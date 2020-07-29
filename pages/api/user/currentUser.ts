import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = await db.collection('users');

    if (token) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await collection.findOne({ _id: new ObjectId(id) });
        res.json(user);
    } else {
        res.status(404).json({});
    }
};
