import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import PageContainer from './PageContainer'
import WarningBanner from './WarningBanner'

function Layout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup'

  return (
    <div className={`flex min-h-screen flex-col font-sans ${isAuthPage ? 'bg-[#080a10] text-white' : 'bg-[#f7f8fa] text-black'}`}>
      <WarningBanner />
      {!isAuthPage ? <Navbar /> : null}
      <main className='flex-1 py-6'>
        {isAuthPage ? (
          <Outlet />
        ) : (
          <PageContainer>
            <Outlet />
          </PageContainer>
        )}
      </main>
      {!isAuthPage ? <Footer /> : null}
    </div>
  )
}

export default Layout
