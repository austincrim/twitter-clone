import Button from './Button'
import { useEffect, useRef, useState } from 'react'
import Profile from './Profile'
import { useUser } from '../lib/hooks'

export default function ProfileDropdown() {
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: user } = useUser()
  const dropwdownRef = useRef(null)

  useEffect(() => {
    dropwdownRef.current.onkeydown = (e) => {
      if (e.key === 'Escape') {
        setShowDropdown(false)
      }

      return () => {
        dropwdownRef.current.onkeypress = null
      }
    }
  }, [showDropdown])

  if (user?.username) {
    return (
      <div>
        <Profile />
      </div>
    )
  }

  return (
    <div ref={dropwdownRef}>
      <Button
        buttonStyle='outline'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Log in / Sign up
      </Button>
      <button
        tabIndex={-1}
        className={`fixed inset-0 cursor-default h-full w-full outline-none focus:outline-none ${
          showDropdown ? 'fixed' : 'hidden'
        }`}
        onClick={() => setShowDropdown(false)}
      ></button>
      <div
        className={`absolute mt-1 mr-3 py-6 px-10 top-auto right-0 z-10 bg-white rounded shadow-lg origin-top-right transition ease-out duration-100 ${
          showDropdown
            ? 'transform opacity-100 scale-100'
            : 'transform opacity-0 scale-95 invisible'
        }`}
      >
        <Profile />
      </div>
    </div>
  )
}
