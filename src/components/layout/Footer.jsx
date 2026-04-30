import PageContainer from './PageContainer'

function Footer() {
  return (
    <footer className='border-t border-slate-200 bg-white py-4 text-sm text-slate-600'>
      <PageContainer>
        <div className='space-y-1'>
          <p>Crypto App | Student Project</p>
          <p className='text-xs leading-relaxed text-slate-500'>
            Demo project only. Do not enter real personal information.
          </p>
        </div>
      </PageContainer>
    </footer>
  )
}

export default Footer
