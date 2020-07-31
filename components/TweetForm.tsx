import { useState } from 'react';
import { fetcher } from '../util/fetcher';
import { useMutation, queryCache } from 'react-query';
import filter from 'bad-words';
import Button from './Button';
import { useUser } from '../util/hooks';

const createTweet = ({ text, author }) => {
    return fetcher('/api/tweet/create', { text, author });
};

export default function TweetForm() {
    const [tweet, setTweet] = useState('');
    const { data: user } = useUser();
    const [mutate, { isLoading }] = useMutation(createTweet, {
        onSuccess: () => {
            queryCache.invalidateQueries('/api/feed');
        },
    });

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (!tweet) return;
        await mutate({ text: tweet, author: user.username });
        setTweet('');
    }
    return (
        <form
            className='flex w-full lg:w-1/2'
            onSubmit={e => e.preventDefault()}
        >
            <input
                className='w-full bg-gray-100 border rounded mr-3 py-2 px-1'
                type='text'
                value={tweet}
                onChange={e => setTweet(new filter().clean(e.target.value))}
            />
            <Button
                buttonStyle='blue'
                onClick={handleSubmit}
                disabled={!user?.username}
            >
                {isLoading && 'Tweeting...'}
                {!isLoading && 'Tweet'}
            </Button>
        </form>
    );
}
