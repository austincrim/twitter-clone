import { Tweet } from '@prisma/client'
import { useQuery } from 'react-query'
import { fetcher } from './fetcher'

export function useFeed() {
  const { status, data, error } = useQuery<Tweet[], Error>('/api/feed', () =>
    fetcher('/api/feed')
  )
  return { data, status, error }
}

export function useUser() {
  const { status, data, error } = useQuery('/api/user/currentUser', () =>
    fetcher('/api/user/currentUser')
  )
  return { status, data, error }
}
