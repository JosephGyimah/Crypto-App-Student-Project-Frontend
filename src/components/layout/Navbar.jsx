import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../api'
import coinbaseLogo from '../../assets/logo/coinbaseLogo-4.svg'

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await auth.profile()
        setIsAuthenticated(result != null)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await auth.logout()
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setIsAuthenticated(false)
      navigate('/signin')
    }
  }

  return (
    <header className='border-b border-slate-200 bg-white'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <nav className='flex flex-wrap items-center gap-4 py-4 text-black'>
          <Link to='/' className='flex items-center'>
            <img src={coinbaseLogo} alt='Coinbase' className='h-8 w-auto' />
          </Link>
          <Link to='/' className='text-base font-bold'>
            Home
          </Link>
          <Link to='/explore' className='text-base font-bold'>
            Explore
          </Link>
          <Link to='/learn' className='text-base font-bold'>
            Learn
          </Link>
          <div className='ml-auto flex items-center gap-2'>
            {!loading && isAuthenticated ? (
              <>
                <Link
                  to='/profile'
                  className='rounded-full bg-slate-100 px-4 py-1.5 text-base font-bold text-black hover:bg-slate-200'
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className='rounded-full bg-red-600 px-4 py-1.5 text-base font-bold text-white hover:bg-red-700'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/signin'
                  className='rounded-full bg-slate-100 px-4 py-1.5 text-base font-bold text-black hover:bg-slate-200'
                >
                  Sign in
                </Link>
                <Link
                  to='/signup'
                  className='rounded-full bg-blue-600 px-4 py-1.5 text-base font-bold text-white hover:bg-blue-700'
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
