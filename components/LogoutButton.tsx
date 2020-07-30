import Button from './Button';
import { useMutation, queryCache } from 'react-query';
import { fetcher } from '../util/fetcher';

function logoutUser() {
    return fetcher('/api/user/logout');
}

export default function LogoutButton() {
    const [mutate, { data }] = useMutation(logoutUser, {
        onSuccess: () => queryCache.invalidateQueries('/api/user/currentUser'),
    });

    async function handleLogout(e: Event) {
        e.preventDefault();
        await mutate();
    }

    return (
        <Button buttonStyle='link' onClick={handleLogout}>
            Logout
        </Button>
    );
}
