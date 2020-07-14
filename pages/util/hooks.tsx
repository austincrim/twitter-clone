import { useQuery } from 'react-query'
import { fetcher } from './fetcher';

export function useFeed() {
    const { status, data, error } = useQuery('/api/feed', () => fetcher('/api/feed'));

    return { data, status, error };
}