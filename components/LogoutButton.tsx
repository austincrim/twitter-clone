import Button from './Button'
import { useMutation, useQueryClient } from 'react-query'
import { fetcher } from '../lib/fetcher'

function logoutUser() {
  return fetcher('/api/user/logout')
}

export default function LogoutButton() {
  const client = useQueryClient()
  const { mutateAsync } = useMutation(logoutUser, {
    onSuccess: () => client.invalidateQueries('/api/user/currentUser')
  })

  async function handleLogout(e) {
    e.preventDefault()
    await mutateAsync()
  }

  return (
    <button
      className='font-bold text-gray-100 hover:text-gray-300'
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
