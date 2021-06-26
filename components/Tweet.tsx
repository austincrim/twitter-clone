import { useMutation, useQueryClient } from 'react-query'
import { fetcher } from '../lib/fetcher'
import Button from './Button'
import { useUser } from '../lib/hooks'

const deleteTweet = ({ id }) => {
  return fetcher('/api/tweet/delete', { id })
}

export default function Tweet({ tweet }) {
  const client = useQueryClient()
  const { text, author, id } = tweet
  const { data: user } = useUser()

  const { mutateAsync, isLoading } = useMutation(deleteTweet, {
    onSuccess: () => {
      client.invalidateQueries('/api/feed')
    }
  })
  async function handleDelete() {
    await mutateAsync({ id })
  }
  const deleteButton = (
    <Button buttonStyle='red' onClick={handleDelete}>
      {isLoading && 'Deleting...'}
      {!isLoading && 'Delete'}
    </Button>
  )
  return (
    <div className='flex justify-between w-full px-6 py-5 bg-gray-100 border-b border-blue-300 md:1/2'>
      <div className='flex flex-col justify-between'>
        <div className='text-lg'>{text}</div>
        <div className='text-sm text-gray-600'>{author}</div>
      </div>
      {user?.username === author && deleteButton}
    </div>
  )
}
