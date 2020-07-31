import SignupForm from './SignupForm';
import LogoutButton from './LogoutButton';
import { useUser } from '../util/hooks';

export default function Profile() {
    const { data: user } = useUser();

    if (!user) return null;

    return (
        <div>
            {!user.username ? (
                <SignupForm />
            ) : (
                <div className='flex flex-col items-start'>
                    <span className='text-white'>
                        Logged in as: <strong>{user.username}</strong>
                    </span>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
}
