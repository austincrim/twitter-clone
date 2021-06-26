import { useFeed, useUser } from '../lib/hooks'
import Tweet from '../components/Tweet'
import TweetForm from '../components/TweetForm'
import ProfileDropdown from '../components/ProfileDropdown'

export default function Index() {
  const { data: feed, status, error } = useFeed()
  const { data: user } = useUser()

  let statusMessage: JSX.Element
  if (status === 'loading') {
    statusMessage = <div>loading...</div>
  } else if (status === 'error') {
    statusMessage = <div>Error: {error.message}</div>
  }
  return (
    <>
      <nav className='flex justify-between items-center bg-blue-400 py-3 px-10'>
        <span className='text-2xl text-white font-bold tracking-wide'>
          Tweeter
        </span>
        <ProfileDropdown />
      </nav>
      <div className='flex flex-col items-center md:flex-row md:items-start mt-10 space-y-8'>
        <div className='flex flex-col items-center md:items-start w-full px-4 md:px-10 space-y-4'>
          <TweetForm />
          {status !== 'success' && statusMessage}
          {status === 'success' &&
            feed.map((tw) => <Tweet tweet={tw} key={tw.text + tw.author} />)}
        </div>
      </div>
    </>
  )
}
