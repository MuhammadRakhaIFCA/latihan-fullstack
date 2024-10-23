import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/guest/LoginPage'
import RegisterPage from './pages/guest/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
      </Routes>
    </>
  )
}

export default App
