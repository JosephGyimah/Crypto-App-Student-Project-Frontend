import bitcoinLogo from '../assets/crypto-logo/bitcoin.png'
import bnbLogo from '../assets/crypto-logo/bnb.png'
import dogeconLogo from '../assets/crypto-logo/dogecoin.png'
import ethereumLogo from '../assets/crypto-logo/ethereum.png'
import solanaLogo from '../assets/crypto-logo/solana.png'
import tetherLogo from '../assets/crypto-logo/tether.png'
import tronLogo from '../assets/crypto-logo/tron.png'
import usdcLogo from '../assets/crypto-logo/usdc.png'
import xrpLogo from '../assets/crypto-logo/xrp.png'
import hyperliquidLogo from '../assets/crypto-logo/hyperliquid.png'

const logoMap = {
  BTC: bitcoinLogo,
  BNB: bnbLogo,
  DOGE: dogeconLogo,
  ETH: ethereumLogo,
  SOL: solanaLogo,
  USDT: tetherLogo,
  TRX: tronLogo,
  USDC: usdcLogo,
  XRP: xrpLogo,
  HYPE: hyperliquidLogo,
}

export function getLocalLogo(symbol) {
  return logoMap[symbol?.toUpperCase()] || null
}

export default logoMap
