import Button from './Button';
import { useState } from 'react';

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            className='flex flex-col items-start space-y-2'
            onSubmit={e => e.preventDefault()}
        >
            <label className='text-gray-700'>Username</label>
            <input
                className='bg-gray-100 border rounded mr-3 py-2 px-1'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label className='text-gray-700'>Password</label>
            <input
                className='bg-gray-100 border rounded mr-3 py-2 px-1'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button buttonStyle='link'>Sign Up</Button>
        </form>
    );
}
