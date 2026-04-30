import { useParams } from 'react-router-dom'
import Card from '../components/common/Card'
import { cryptoAssets } from '../data/cryptoData'

function AssetDetail() {
  const { id } = useParams()
  const crypto = cryptoAssets.find((item) => item.id === id)

  if (!crypto) {
    return (
      <Card>
        <h1 className='text-2xl font-bold text-black md:text-3xl'>Asset Detail Page</h1>
        <p className='mt-2 text-base text-slate-600'>No crypto found for: {id}</p>
      </Card>
    )
  }

  return (
    <Card>
      <h1 className='text-2xl font-bold text-black md:text-3xl'>Asset Detail Page</h1>
      <p className='mt-2 text-base text-slate-600'>ID: {crypto.id}</p>
      <p className='mt-1 text-base text-slate-600'>Name: {crypto.name}</p>
      <p className='mt-1 text-base text-slate-600'>Symbol: {crypto.symbol}</p>
      <p className='mt-1 text-base text-slate-600'>Price: ${crypto.price.toLocaleString()}</p>
      <p className='mt-1 text-base text-slate-600'>24h Change: {crypto.change24h}%</p>
      <p className='mt-1 text-base text-slate-600'>Market Cap: ${crypto.marketCap.toLocaleString()}</p>
    </Card>
  )
}

export default AssetDetail
