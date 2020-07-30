import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../util/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import url from 'url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;
    const db = await connectToDatabase(process.env.MONGO_CONNECTION_URI);
    const collection = db
        .db(url.parse(process.env.MONGO_CONNECTION_URI).pathname.substr(1))
        .collection('users');
    if (token) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await collection.findOne({ _id: new ObjectId(id) });
        db.close();
        res.json(user);
    } else {
        db.close();
        res.status(404).json({});
    }
};
