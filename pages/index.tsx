import { useFeed } from '../util/hooks';
import Tweet from '../components/Tweet';
import TweetForm from '../components/TweetForm';
import SignupForm from '../components/SignupForm';
import Profile from '../components/Profile';

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
            <div className='flex flex-col items-center md:flex-row md:items-start space-y-8'>
                <div className='mt-2 py-6 px-10'>
                    <Profile />
                </div>
                <div className='flex flex-col items-center md:items-start w-full md:px-10 space-y-4'>
                    <TweetForm />
                    {status !== 'success' && statusMessage}
                    {status === 'success' &&
                        feed.map(tw => (
                            <Tweet tweet={tw} key={tw.text + tw.author} />
                        ))}
                </div>
            </div>
        </>
    );
}
