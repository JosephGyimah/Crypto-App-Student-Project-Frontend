import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await auth.profile()
        setUser(data.user)
      } catch (err) {
        setError(err.message)
        if (err.status === 401) {
          // Redirect to signin if not authenticated
          navigate('/signin')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await auth.logout()
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      navigate('/signin')
    }
  }

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-lg'>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='rounded-lg bg-red-50 p-4 text-red-800'>
          <p>Error: {error}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-lg'>No user data available</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-md'>
        <div className='rounded-lg bg-white p-8 shadow-lg'>
          <h1 className='mb-6 text-center text-3xl font-bold text-gray-900'>
            User Profile
          </h1>

          <div className='space-y-6'>
            <div className='border-b border-gray-200 pb-4'>
              <label className='text-sm font-semibold text-gray-600'>Name</label>
              <p className='mt-2 text-lg text-gray-900'>{user.name}</p>
            </div>

            <div className='border-b border-gray-200 pb-4'>
              <label className='text-sm font-semibold text-gray-600'>Email</label>
              <p className='mt-2 text-lg text-gray-900'>{user.email}</p>
            </div>

            <div className='border-b border-gray-200 pb-4'>
              <label className='text-sm font-semibold text-gray-600'>
                Member Since
              </label>
              <p className='mt-2 text-lg text-gray-900'>
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className='mt-8 w-full rounded-full bg-red-600 px-4 py-2.5 text-base font-bold text-white hover:bg-red-700 transition'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
