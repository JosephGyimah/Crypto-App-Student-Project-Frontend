import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../api'
import coinbaseLogo from '../assets/logo/coinbaseLogo-4.svg'

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    setError(null)
    try {
      await auth.login({ email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
      setSubmitted(false)
    }
  }

  return (
    <section className='relative min-h-screen w-full px-4 sm:px-6'>
      <div className='absolute left-4 top-4 sm:left-6 sm:top-6'>
        <Link to='/' aria-label='Go to homepage' className='inline-flex'>
          <img src={coinbaseLogo} alt='Coinbase' className='h-8 w-8 [filter:brightness(0)_invert(1)]' />
        </Link>
      </div>

      <div className='mx-auto flex min-h-screen w-full max-w-[420px] items-center py-16'>
        <div className='w-full text-left'>
          <h1 className='whitespace-nowrap text-2xl font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-4xl'>
            Sign in to Coinbase
          </h1>
          <p className='mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-200'>
            Demo app – do not use your real password.
          </p>

          <form className='mt-7 flex min-h-[440px] flex-col gap-4' onSubmit={handleSubmit}>
            <label htmlFor='signin-email' className='block'>
              <span className='mb-2 block text-sm font-semibold text-white'>Email</span>
              <input
                id='signin-email'
                name='email'
                type='email'
                value={form.email}
                onChange={handleChange}
                placeholder='Your email address'
                className='h-12 w-full rounded-lg border border-slate-600 bg-[#05070d] px-4 text-base text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none'
              />
            </label>

            <label htmlFor='signin-password' className='block'>
              <span className='mb-2 block text-sm font-semibold text-white'>Password</span>
              <input
                id='signin-password'
                name='password'
                type='password'
                value={form.password}
                onChange={handleChange}
                placeholder='Your password'
                className='h-12 w-full rounded-lg border border-slate-600 bg-[#05070d] px-4 text-base text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none'
              />
            </label>

            <button type='submit' className='h-12 w-full rounded-full bg-[#2f4b87] text-base font-medium text-white hover:bg-[#375699]'>
              Continue
            </button>

            <div className='flex items-center gap-3 pt-2 text-sm text-slate-400'>
              <span className='h-px flex-1 bg-slate-700' />
              OR
              <span className='h-px flex-1 bg-slate-700' />
            </div>

            <button
              type='button'
              className='relative h-12 w-full rounded-full bg-[#2a303b] text-base font-medium text-white hover:bg-[#343b47]'
            >
              <span className='absolute left-5 top-1/2 -translate-y-1/2 text-white' aria-hidden='true'>
                <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
                  <path d='M9.5 12.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5ZM3.25 17.1c0-2.06 1.67-3.73 3.73-3.73h5.04c.66 0 1.29.17 1.83.47l-1.02 1.84a2 2 0 0 0-.81-.17H6.98A1.73 1.73 0 0 0 5.25 17.1v.15h7.61v2.1H3.25v-2.25Zm14.42-8.85a.75.75 0 0 1 .75.75v1.09h1.08a.75.75 0 0 1 0 1.5h-1.08v1.08a.75.75 0 0 1-1.5 0V11.6h-1.08a.75.75 0 0 1 0-1.5h1.08V9a.75.75 0 0 1 .75-.75Zm-1.83 5.88h4.34a1.57 1.57 0 0 1 1.57 1.57v3.65h-7.48V15.7a1.57 1.57 0 0 1 1.57-1.57Zm0 1.5a.07.07 0 0 0-.07.07v2.15h4.48V15.7a.07.07 0 0 0-.07-.07h-4.34Z' />
                </svg>
              </span>
              <span>Sign in with Passkey</span>
            </button>
            <button
              type='button'
              className='relative h-12 w-full rounded-full bg-[#2a303b] text-base font-medium text-white hover:bg-[#343b47]'
            >
              <span className='absolute left-5 top-1/2 -translate-y-1/2 text-white' aria-hidden='true'>
                <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
                  <path d='M21.35 12.24c0-.72-.06-1.42-.2-2.09H12v3.96h5.23a4.49 4.49 0 0 1-1.94 2.95v2.45h3.14c1.84-1.7 2.92-4.2 2.92-7.27ZM12 21.75c2.63 0 4.83-.87 6.43-2.36l-3.14-2.45c-.87.58-1.99.93-3.29.93-2.53 0-4.67-1.71-5.43-4h-3.24v2.52A9.72 9.72 0 0 0 12 21.75Zm-5.43-7.88a5.86 5.86 0 0 1 0-3.74V7.61H3.33a9.75 9.75 0 0 0 0 8.78l3.24-2.52ZM12 6.13c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.16 14.63 2.25 12 2.25A9.72 9.72 0 0 0 3.33 7.61l3.24 2.52c.76-2.29 2.9-4 5.43-4Z' />
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>
            <button
              type='button'
              className='relative h-12 w-full rounded-full bg-[#2a303b] text-base font-medium text-white hover:bg-[#343b47]'
            >
              <span className='absolute left-5 top-1/2 -translate-y-1/2 text-white' aria-hidden='true'>
                <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
                  <path d='M16.77 12.56c-.02-2.24 1.84-3.32 1.92-3.37-1.05-1.53-2.69-1.74-3.26-1.77-1.39-.14-2.72.82-3.42.82-.7 0-1.78-.8-2.93-.78-1.5.02-2.88.87-3.66 2.23-1.57 2.72-.4 6.76 1.12 8.95.74 1.07 1.62 2.28 2.79 2.24 1.12-.04 1.55-.72 2.91-.72s1.74.72 2.94.7c1.21-.02 1.98-1.1 2.72-2.17.84-1.23 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.33-3.66Zm-2.2-6.5c.62-.75 1.04-1.8.93-2.84-.89.04-1.97.59-2.61 1.33-.58.67-1.09 1.74-.95 2.76.99.08 2-.5 2.63-1.25Z' />
                </svg>
              </span>
              <span>Sign in with Apple</span>
            </button>

            {error ? <p className='text-sm text-rose-400'>{error}</p> : null}
            {submitted && !error ? <p className='text-sm text-slate-400'>Signing in…</p> : null}
            <p className='mt-auto pt-6 text-center text-sm leading-relaxed text-slate-300'>
              Don't have an account?{' '}
              <Link to='/signup' className='font-semibold text-blue-500'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn
