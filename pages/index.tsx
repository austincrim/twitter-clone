import { useFeed } from '../util/hooks';
import Tweet from '../components/Tweet';
import TweetForm from '../components/TweetForm';
import Button from '../components/Button';

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
            <div className='grid grid-cols-3 gap-20'>
                <div className='mt-2 w-1/2 py-6 px-10'>
                    <form className='flex flex-col items-start space-y-2'>
                        <label className='text-gray-700'>Username</label>
                        <input className='bg-gray-100 border rounded mr-3 py-2 px-1' type='text' />
                        <label className='text-gray-700'>Password</label>
                        <input className='bg-gray-100 border rounded mr-3 py-2 px-1' type='password' />
                        <Button buttonStyle='link' type='button'>
                            Sign Up
                        </Button>
                    </form>
                </div>
                <div className='flex flex-col col-span-2 items-start mt-10 space-y-2'>
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
