import { useState } from 'react';
import { fetcher } from '../util/fetcher';
import { useMutation, queryCache } from 'react-query';
import Button from './Button';

const createTweet = ({ text }) => {
    return fetcher('/api/tweet/create', { text });
};

export default function TweetForm() {
    const [tweet, setTweet] = useState('');
    const [mutate, { isLoading }] = useMutation(createTweet, {
        onSuccess: () => {
            queryCache.invalidateQueries('/api/feed');
        },
    });

    async function handleSubmit(e) {
        e.preventDefault();
        if (!tweet) return;
        await mutate({ text: tweet });
        setTweet('');
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <input
                className='bg-gray-100 border rounded mr-3 py-2 px-1'
                type='text'
                value={tweet}
                onChange={e => setTweet(e.target.value)}
            />
            <Button style='blue' onClick={handleSubmit}>
                {isLoading && 'Tweeting...'}
                {!isLoading && 'Tweet'}
            </Button>
        </form>
    );
}
