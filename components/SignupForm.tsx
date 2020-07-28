import Button from './Button';
import { useState } from 'react';
import { fetcher } from '../util/fetcher';
import { useMutation } from 'react-query';

const createUser = ({ username, password }) => {
    return fetcher('/api/user/create', { username, password });
};

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mutate, { error, isLoading, data, reset }] = useMutation(createUser);

    async function handleSignup(e: Event) {
        e.preventDefault();
        reset();

        if (username && password) {
            await mutate({ username, password });
            setUsername('');
            setPassword('');
        }
    }

    return (
        <form
            className='flex flex-col items-start space-y-2'
            onSubmit={e => e.preventDefault()}
        >
            <label className='text-gray-600'>Username</label>
            <input
                className='bg-gray-100 border rounded mr-3 py-2 px-1'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label className='text-gray-600'>Password</label>
            <input
                className='bg-gray-100 border rounded mr-3 py-2 px-1'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={handleSignup} buttonStyle='link'>
                Sign Up
            </Button>
            <div>
                {error && (
                    <span className='text-red-400'>
                        Username already taken.
                    </span>
                )}
                {data && !isLoading && (
                    <span className='text-green-400'>Account created!</span>
                )}
            </div>
        </form>
    );
}
