import bitcoinLogo from '../assets/crypto-logo/bitcoin.png'
import dogecoinLogo from '../assets/crypto-logo/dogecoin.png'
import ethereumLogo from '../assets/crypto-logo/ethereum.png'
import solanaLogo from '../assets/crypto-logo/solana.png'
import tetherLogo from '../assets/crypto-logo/tether.png'
import xrpLogo from '../assets/crypto-logo/xrp.png'

export const cryptoAssets = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 68420, change24h: 1.32, marketCap: 1342000000000, logo: bitcoinLogo },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3580, change24h: -0.64, marketCap: 430000000000, logo: ethereumLogo },
  { id: 'tether', name: 'Tether', symbol: 'USDT', price: 10.77, change24h: 0.01, marketCap: 200000000000, logo: tetherLogo },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', price: 6635.71, change24h: -1.5, marketCap: 904900000000 },
  { id: 'usdc', name: 'USDC', symbol: 'USDC', price: 10.77, change24h: 0.0, marketCap: 832300000000 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 164, change24h: 2.18, marketCap: 72000000000, logo: solanaLogo },
  { id: 'xrp', name: 'XRP', symbol: 'XRP', price: 0.62, change24h: -1.05, marketCap: 34000000000, logo: xrpLogo },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.71, change24h: 0.91, marketCap: 25000000000 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.17, change24h: 3.44, marketCap: 24000000000, logo: dogecoinLogo }
]
