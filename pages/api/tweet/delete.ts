import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function del(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const deletedTweet = await prisma.tweet.delete({
        where: {
            id: req.body.id
        }
    });
    res.send(JSON.stringify(deletedTweet));
}
