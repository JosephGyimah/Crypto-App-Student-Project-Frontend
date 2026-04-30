import { Link } from 'react-router-dom'

function CryptoRow({ crypto }) {
  const changeClass = crypto.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'

  return (
    <Link
      to={`/asset/${crypto.id}`}
      className="grid grid-cols-[minmax(0,1.5fr)_1fr_1fr] items-center gap-2 rounded-xl px-3 py-3 transition hover:bg-slate-100 sm:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr]"
    >
      <div className="flex items-center gap-3">
        {crypto.logo ? (
          <img src={crypto.logo} alt={crypto.name} className='h-9 w-9 rounded-full object-cover' />
        ) : (
          <div className="grid h-9 w-9 place-content-center rounded-full bg-slate-200 text-xs font-bold text-black">
            {crypto.symbol}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-black">{crypto.name}</p>
          <p className="text-xs text-slate-500">{crypto.symbol}</p>
        </div>
      </div>
      <p className="text-right text-sm font-medium text-black">${crypto.price.toLocaleString()}</p>
      <p className={`text-right text-sm font-semibold ${changeClass}`}>
        {crypto.change24h >= 0 ? '+' : ''}
        {crypto.change24h.toFixed(2)}%
      </p>
      <p className="hidden text-right text-sm text-slate-600 sm:block">${crypto.marketCap.toLocaleString()}</p>
    </Link>
  )
}

export default CryptoRow
