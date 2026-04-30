import { Link } from 'react-router-dom'
import Card from '../common/Card'
import { getLocalLogo } from '../../utils/logoMap'

function CryptoCard({ crypto, localLogoOverride, viewAssetToExplore = false }) {
  const changeClass = crypto.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'
  const logoSrc = localLogoOverride || getLocalLogo(crypto.symbol) || crypto.logo

  return (
    <Card>
      <div className='flex items-center gap-3'>
        {logoSrc ? (
          <img src={logoSrc} alt={crypto.name} className='h-10 w-10 rounded-full object-cover' />
        ) : (
          <div className='grid h-10 w-10 place-content-center rounded-full bg-slate-200 text-xs font-semibold text-black'>
            {crypto.symbol}
          </div>
        )}
        <p className='text-sm text-slate-500'>{crypto.symbol}</p>
      </div>
      <h3 className='mt-1 text-lg font-semibold text-black'>{crypto.name}</h3>
      <p className='mt-2 text-xl font-bold text-black'>${crypto.price.toLocaleString()}</p>
      <p className={`mt-1 text-sm font-medium ${changeClass}`}>
        {crypto.change24h >= 0 ? '+' : ''}
        {crypto.change24h.toFixed(2)}%
      </p>
      <Link
        to={viewAssetToExplore ? '/explore' : `/asset/${crypto.id}`}
        className='mt-4 inline-block text-sm text-blue-600 hover:text-blue-700'
      >
        View asset
      </Link>
    </Card>
  )
}

export default CryptoCard
