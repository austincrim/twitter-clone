import { useState } from 'react'
import { fetcher } from '../lib/fetcher'
import { useMutation, useQueryClient } from 'react-query'
import filter from 'bad-words'
import Button from './Button'
import { useUser } from '../lib/hooks'

const createTweet = ({ text, author }) => {
  return fetcher('/api/tweet/create', { text, author })
}

export default function TweetForm() {
  const client = useQueryClient()
  const [tweet, setTweet] = useState('')
  const { data: user } = useUser()
  const { mutateAsync, isLoading } = useMutation(createTweet, {
    onSuccess: () => {
      client.invalidateQueries('/api/feed')
    }
  })

  async function handleSubmit(e: Event) {
    e.preventDefault()
    if (!tweet) return
    await mutateAsync({ text: tweet, author: user.username })
    setTweet('')
  }
  return (
    <form className='flex w-full lg:w-1/2' onSubmit={(e) => e.preventDefault()}>
      <input
        className='w-full px-1 py-2 mr-3 bg-gray-100 border rounded'
        type='text'
        value={tweet}
        onChange={(e) => setTweet(new filter().clean(e.target.value))}
      />
      <Button
        buttonStyle='blue'
        onClick={handleSubmit}
        disabled={!user?.username}
      >
        {isLoading && 'Tweeting...'}
        {!isLoading && 'Tweet'}
      </Button>
    </form>
  )
}
