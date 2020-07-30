import { useFeed } from '../util/hooks';
import Tweet from '../components/Tweet';
import TweetForm from '../components/TweetForm';
import SignupForm from '../components/SignupForm';
import Profile from '../components/Profile';
import Button from '../components/Button';
import { useState, useRef } from 'react';

export default function Index() {
    const { data: feed, status, error } = useFeed();
    const [showDropdown, setShowDropdown] = useState(false);

    let statusMessage: JSX.Element;
    if (status === 'loading') {
        statusMessage = <div>loading...</div>;
    } else if (status === 'error') {
        statusMessage = <div>Error: {error.message}</div>;
    }
    return (
        <>
            <nav className='flex justify-between items-center bg-blue-300 py-3 px-10'>
                <span className='text-2xl text-white font-bold tracking-wide'>
                    Tweeter
                </span>
                <div>
                    <Button
                        buttonStyle='outline'
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Log in / Sign up
                    </Button>
                    <button
                        tabIndex={-1}
                        className={`fixed inset-0 cursor-default h-full w-full outline-none border-none ${
                            showDropdown ? 'fixed' : 'hidden'
                        }`}
                        onClick={() => setShowDropdown(false)}
                    ></button>
                    <div
                        className={`absolute mt-1 mr-3 py-6 px-10 top-auto right-0 z-10 bg-white rounded shadow-lg origin-top-right ${
                            showDropdown ? 'animate-fadeIn' : 'animate-fadeOut'
                        }`}
                    >
                        <Profile />
                    </div>
                </div>
            </nav>
            <div className='flex flex-col items-center md:flex-row md:items-start mt-10 space-y-8'>
                <div className='flex flex-col items-center md:items-start w-full px-4 md:px-10 space-y-4'>
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
