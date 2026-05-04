import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import CryptoCard from '../components/crypto/CryptoCard'
import { crypto, auth } from '../api'
import heroImage from '../assets/hero/Hero.png'
import bitcoinLogo from '../assets/crypto-logo/bitcoin.png'
import ethereumLogo from '../assets/crypto-logo/ethereum.png'

const homePageLogos = {
  BTC: bitcoinLogo,
  ETH: ethereumLogo,
}

function Home() {
  const [top, setTop] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    // Ensure the Top assets section always shows Bitcoin and Ethereum
    crypto.all().then((res) => {
      console.log('[Home] crypto.all() response:', res)
      if (!mounted || !res?.data) return
      const symbols = ['BTC', 'ETH']
      const ordered = symbols
        .map((s) => res.data.find((c) => c.symbol?.toUpperCase() === s))
        .filter(Boolean)
      // Fallback to first two if BTC/ETH not found
      setTop(ordered.length ? ordered : res.data.slice(0, 2))
    }).catch((err) => console.error('[Home] crypto.all() error:', err))
    return () => (mounted = false)
  }, [])

  useEffect(() => {
    let mounted = true
    const check = async () => {
      try {
        await auth.profile()
        if (mounted) setIsAuthenticated(true)
      } catch {
        if (mounted) setIsAuthenticated(false)
      } finally {
        if (mounted) setAuthLoading(false)
      }
    }
    check()
    return () => (mounted = false)
  }, [])

  return (
    <section className='space-y-6'>
      <div className='grid items-center gap-8 py-8 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:py-12'>
        <div className='rounded-[38px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-950 p-5 sm:p-8'>
          <img src={heroImage} alt='Coinbase app preview' className='h-full w-full rounded-[28px] object-cover' />
        </div>

        <div>
          <h1 className='text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-black sm:text-5xl lg:text-6xl'>
            The future of
            <br />
            finance is here.
          </h1>
          <p className='mt-4 text-base leading-relaxed text-black sm:text-lg'>
            Trade crypto and more on a platform you can trust.
          </p>
          {!authLoading && !isAuthenticated && (
            <form className='mt-6 flex flex-col gap-3 sm:flex-row'>
              <input
                type='email'
                placeholder='satoshi@nakamoto.com'
                className='h-11 w-full rounded-md border border-slate-400 px-4 text-base text-black outline-none focus:border-blue-600 sm:max-w-[280px]'
              />
              <Link to='/signup'>
                <Button className='h-11 rounded-[50%] px-8'>Sign up</Button>
              </Link>
            </form>
          )}
        </div>
      </div>

      <Card>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-[-0.02em] text-black md:text-3xl'>Top assets</h2>
            <p className='mt-1 text-sm text-slate-600'>Track selected crypto assets.</p>
          </div>
          <Link to='/explore'>
            <Button variant='secondary'>View all</Button>
          </Link>
        </div>
          <div className='mt-4 grid gap-4 sm:grid-cols-2'>
          {top.map((c) => (
            <CryptoCard
              key={c._id}
              crypto={{ id: c._id, name: c.name, symbol: c.symbol, price: c.price, change24h: c.change24h, logo: c.image }}
              localLogoOverride={homePageLogos[c.symbol?.toUpperCase()]}
              viewAssetToExplore={true}
            />
          ))}
        </div>
      </Card>
    </section>
  )
}

export default Home
