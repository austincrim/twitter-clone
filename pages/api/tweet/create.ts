import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function create(req: NextApiRequest, res: NextApiResponse) {
    const createdTweet = await prisma.tweet.create({
        data: {
            text: req.body.text
        }
    });
    res.send(JSON.stringify(createdTweet));
}