import { useQuery } from 'react-query';
import { fetcher } from './fetcher';

export function useFeed() {
    const { status, data, error } = useQuery('/api/feed', fetcher);
    return { data, status, error };
}

export function useUser() {
    const { status, data, error } = useQuery('/api/user/currentUser', fetcher);
    return { status, data, error };
}
