import './bootstrap.min.css'
import { Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing"
import Dashboard from "./Pages/Dashboard"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import Auth from './Pages/Auth'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Allpets from './Pages/Allpets'
import { useContext } from 'react'
import { TokenAuthContext } from './ContextApi/AuthContext'
import Liked from './Pages/Liked'

function App() {
  const { authStatus, setAuthStatus } = useContext(TokenAuthContext)
  return (
    <>
      <Header />
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/dash" element={authStatus ? <Dashboard /> : <Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/all-pets" element={authStatus ? <Allpets /> : <Landing />} />
        <Route path="/liked" element={authStatus ?<Liked/> : <Landing />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
      <Footer />
      <ToastContainer />

    </>
  )
}

export default App
