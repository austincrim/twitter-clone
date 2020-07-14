import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default function TweetForm() {
    const [tweet, setTweet] = useState('');

    function handleSubmit() {
        prisma.tweet.create({
            data: {
                text: tweet
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className='bg-gray-100 border rounded mr-3 py-2 px-1' type='text' value={tweet} onChange={e => setTweet(e.target.value)} />
            <button type='submit' className='px-4 py-2 rounded bg-blue-400 text-gray-100'>Tweet</button>
        </form>
    )
}