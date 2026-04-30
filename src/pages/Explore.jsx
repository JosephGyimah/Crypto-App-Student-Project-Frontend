import { useMemo, useState, useEffect } from 'react'
import Card from '../components/common/Card'
import { crypto as cryptoApi } from '../api'
import { getLocalLogo } from '../utils/logoMap'

const SUPPORTED_SYMBOLS = ['BTC', 'ETH', 'USDT', 'XRP', 'BNB', 'USDC', 'SOL', 'TRX', 'DOGE', 'HYPE']

const ghsFormat = new Intl.NumberFormat('en-GH', {
  style: 'currency',
  currency: 'GHS',
  maximumFractionDigits: 2,
})

function formatCompactCurrency(value) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function MiniChart({ isPositive, tone }) {
  const stroke = tone || (isPositive ? '#10b981' : '#ef4444')

  return (
    <svg viewBox='0 0 60 24' className='h-6 w-12'>
      <polyline
        points='2,8 10,10 18,9 26,14 34,12 42,16 50,11 58,13'
        fill='none'
        stroke={stroke}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function Explore() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [timeRange, setTimeRange] = useState('1D')
  const [rows] = useState('10 rows')

  const [assets, setAssets] = useState([])

  useEffect(() => {
    let mounted = true
    cryptoApi.all().then((res) => {
      if (mounted && res?.data) setAssets(res.data)
    }).catch(() => {})
    return () => (mounted = false)
  }, [])

  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase()

    return [...assets]
      .filter((asset) => {
        // Only show supported assets with logos
        if (!SUPPORTED_SYMBOLS.includes(asset.symbol?.toUpperCase())) {
          return false
        }
        if (!query) {
          return true
        }
        return asset.name.toLowerCase().includes(query) || asset.symbol.toLowerCase().includes(query)
      })
      .sort((a, b) => {
        if (sortBy === 'price') {
          return b.price - a.price
        }
        if (sortBy === 'marketCap') {
          return (b.price || 0) - (a.price || 0)
        }
        if (sortBy === 'change') {
          return b.change24h - a.change24h
        }
        return a.name.localeCompare(b.name)
      })
  }, [assets, search, sortBy])

  const chartTones = ['#f59e0b', '#6366f1', '#10b981', '#eab308', '#334155', '#2563eb', '#7c3aed']

  return (
    <section>
      <h2 className='mb-4 text-2xl font-bold text-slate-900'>Crypto market prices</h2>
      <Card className='overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-none'>
        <div className='flex flex-wrap items-center gap-3 border-b border-slate-200 px-5 py-4'>
          <button type='button' className='rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-black'>
            All assets
          </button>
          <button
            type='button'
            onClick={() => setTimeRange('1D')}
            className='rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-black'
          >
            {timeRange}
          </button>
          <button type='button' className='rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-black'>
            GHS
          </button>
          <button type='button' className='rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-black'>
            {rows}
          </button>

          <div className='ml-auto flex w-full items-center gap-2 sm:w-auto'>
            <input
              type='text'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search asset'
              className='h-9 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500 sm:w-44'
            />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className='h-9 rounded-md border border-slate-300 bg-white px-2 text-sm outline-none focus:border-blue-500'
            >
              <option value='name'>Sort: Name</option>
              <option value='price'>Sort: Price</option>
              <option value='change'>Sort: Change</option>
              <option value='marketCap'>Sort: Mkt cap</option>
            </select>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-[900px] w-full border-collapse'>
            <thead>
              <tr className='text-left text-[12px] font-semibold text-slate-500'>
                <th className='w-10 px-5 py-3'>☆</th>
                <th className='px-3 py-3'>Asset</th>
                <th className='px-3 py-3'>Market price</th>
                <th className='px-3 py-3'>Chart</th>
                <th className='px-3 py-3'>Change</th>
                <th className='px-3 py-3 text-blue-600'>Mkt cap</th>
                <th className='px-3 py-3'>Volume</th>
                <th className='px-3 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan='8' className='px-5 py-6 text-sm text-slate-500'>
                    No assets matched your search.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((crypto, index) => {
                  const volume = crypto.marketCap * 0.0215
                  const isPositive = crypto.change24h >= 0

                  return (
                    <tr key={crypto.id} className='border-t border-slate-100 text-sm'>
                      <td className='px-5 py-4 text-slate-400'>☆</td>
                      <td className='px-3 py-4'>
                        <div className='flex items-center gap-3'>
                          {getLocalLogo(crypto.symbol) ? (
                            <img src={getLocalLogo(crypto.symbol)} alt={crypto.name} className='h-7 w-7 rounded-full object-cover' />
                          ) : crypto.logo ? (
                            <img src={crypto.logo} alt={crypto.name} className='h-7 w-7 rounded-full object-cover' />
                          ) : (
                            <div className='grid h-7 w-7 place-content-center rounded-full bg-slate-200 text-[10px] font-semibold'>
                              {crypto.symbol}
                            </div>
                          )}
                          <div>
                            <p className='font-semibold text-black'>{crypto.name}</p>
                            <p className='text-xs text-slate-500'>{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-3 py-4 text-black'>{ghsFormat.format(crypto.price)}</td>
                      <td className='px-3 py-4'>
                        <MiniChart isPositive={isPositive} tone={chartTones[index % chartTones.length]} />
                      </td>
                      <td className={`px-3 py-4 font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isPositive ? '↗' : '↙'} {Math.abs(crypto.change24h).toFixed(2)}%
                      </td>
                      <td className='px-3 py-4 text-black'>{formatCompactCurrency(crypto.marketCap)}</td>
                      <td className='px-3 py-4 text-black'>{formatCompactCurrency(volume)}</td>
                      <td className='px-3 py-4'>
                        <a
                          href='https://www.coinbase.com/explore'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
                        >
                          Trade
                        </a>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}

export default Explore
