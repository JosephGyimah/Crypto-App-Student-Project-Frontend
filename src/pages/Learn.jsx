import Button from '../components/common/Button'

const popularArticles = [
  { category: "Beginner's guide", title: 'What is cryptocurrency?', isLink: false },
  { category: 'Getting started', title: 'How to earn crypto rewards', isLink: false },
  { category: 'Getting started', title: 'How to add crypto to your Coinbase Wallet', isLink: true },
  { category: 'Your crypto', title: 'Tax forms, explained: A guide to U.S. tax forms and crypto reports', isLink: false },
  { category: 'Getting started', title: "Beginner's guide to dapps", isLink: false },
  { category: 'Market update', title: 'Everything you need to know about the first-ever U.S. Bitcoin ETF', isLink: false },
]

const learnTags = [
  'Bitcoin',
  'Blockchain',
  'Cardano',
  'Crypto wallet',
  'DeFi',
  'Ethereum',
  'Fork',
  'Inflation',
  'Market cap',
  'NFT',
  'Private key',
  'Protocol',
  'Smart contract',
  'Token',
  'Volatility memecoin',
]

function Learn() {
  return (
    <section className='space-y-10 pb-10'>
      <div className='rounded-none bg-white px-4 py-14 text-center sm:py-16'>
        <h1 className='text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-black sm:text-5xl lg:text-6xl'>
          Crypto questions, answered
        </h1>
        <p className='mx-auto mt-4 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg'>
          Beginner guides, practical tips, and market updates for first-timers, experienced investors, and
          everyone in between
        </p>
      </div>

      <div className='mx-auto max-w-[420px] space-y-5 px-2 text-center'>
        <h2 className='text-2xl font-bold tracking-[-0.02em] text-black md:text-3xl'>Popular</h2>
        {popularArticles.map((article) => (
          <article key={article.title} className='space-y-1'>
            <p className='text-sm font-medium uppercase tracking-wide text-slate-500'>{article.category}</p>
            <h3
              className={
                article.isLink
                  ? 'text-2xl font-semibold leading-[1.15] text-blue-600 md:text-3xl'
                  : 'text-2xl font-semibold leading-[1.15] text-black md:text-3xl'
              }
            >
              {article.title}
            </h3>
          </article>
        ))}
      </div>

      <div className='rounded-none bg-[#eceef1] px-6 py-14 text-center sm:px-8 sm:py-16'>
        <h2 className='text-2xl font-bold tracking-[-0.02em] text-black md:text-3xl'>What is...</h2>
        <div className='mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3'>
          {learnTags.map((tag) => (
            <span key={tag} className='rounded-md bg-white px-6 py-3 text-sm font-semibold text-black sm:text-base'>
              {tag}
            </span>
          ))}
        </div>
        <div className='mt-10'>
          <a href='https://www.coinbase.com/learn' target='_blank' rel='noopener noreferrer'>
            <Button className='rounded-md px-7 py-3 text-base'>See more</Button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Learn
