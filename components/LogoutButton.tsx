import Button from './Button';
import { useMutation, queryCache } from 'react-query';
import { fetcher } from '../util/fetcher';

function logoutUser() {
    return fetcher('/api/user/logout');
}

export default function LogoutButton() {
    const [mutate] = useMutation(logoutUser, {
        onSuccess: () => queryCache.invalidateQueries('/api/user/currentUser'),
    });

    async function handleLogout(e) {
        e.preventDefault();
        await mutate();
    }

    return (
        <button
            className='text-gray-100 font-bold hover:text-gray-300'
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
