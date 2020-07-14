import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function feed(req: NextApiRequest, res: NextApiResponse) {
    // const feed = await prisma.tweet.findMany({
    //     orderBy: { createdAt:  'desc' }
    // })
    
    const feed = [
        {
            text: 'hello',
            author: 'austin'
        }
    ]

    res.send(JSON.stringify(feed));
}