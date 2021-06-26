import Button from './Button'
import { useState } from 'react'
import { fetcher } from '../lib/fetcher'
import { useMutation, useQueryClient } from 'react-query'

export default function SignupForm() {
  const client = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)

  const createUser = ({ username, password }) => {
    return fetcher(`/api/user/${login ? 'login' : 'signup'}`, {
      username,
      password
    })
  }

  const { mutateAsync, error, status, data, reset } = useMutation(createUser, {
    onSuccess: () => client.invalidateQueries('/api/user/currentUser')
  })

  async function handleAuth(e: Event) {
    e.preventDefault()
    reset()

    if (username && password) {
      await mutateAsync({ username, password })
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form
      className='flex flex-col items-start space-y-2'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-600'>Username</label>
      <input
        className='px-1 py-2 mr-3 bg-gray-100 border rounded'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className='text-gray-600'>Password</label>
      <input
        className='px-1 py-2 mr-3 bg-gray-100 border rounded'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleAuth} buttonStyle='blue'>
        {status === 'loading' && 'Loading...'}
        {status !== 'loading' && (login ? 'Login' : 'Sign Up')}
      </Button>
      <Button onClick={() => setLogin(!login)} buttonStyle='link'>
        {login ? 'Need to sign up?' : 'Already a user? Login here.'}
      </Button>
      <div>
        {error && <span className='text-red-400'>Username already taken.</span>}
      </div>
    </form>
  )
}
