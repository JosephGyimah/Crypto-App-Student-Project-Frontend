import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AssetDetail from './pages/AssetDetail'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/asset/:id' element={<AssetDetail />} />
        <Route path='/learn' element={<Learn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
