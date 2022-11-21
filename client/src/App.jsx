import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signin from './pages/Signin'
import MainApp from './pages/MainApp'

function App() {
  return (
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/app/*" element={<MainApp />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default App
