import { useFeed } from '../util/hooks';
import Tweet from '../components/Tweet';
import TweetForm from '../components/TweetForm';

export default function Index() {
    const { data: feed, status, error } = useFeed();
    let statusMessage: JSX.Element;
    if (status === 'loading') {
        statusMessage = <div>loading...</div>;
    } else if (status === 'error') {
        statusMessage = <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className='flex flex-col items-center mt-10 space-y-2'>
                <TweetForm />
                {status !== 'success' && statusMessage}
                {status === 'success' &&
                    feed.map(tw => (
                        <Tweet tweet={tw} key={tw.text + tw.author} />
                    ))}
            </div>
        </>
    );
}
