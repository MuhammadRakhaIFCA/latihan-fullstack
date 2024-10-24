import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/guest/LoginPage'
import RegisterPage from './pages/guest/RegisterPage'
import { Navbar } from './components/Navbar'
import { Leftbar } from './components/Leftbar'
import { Rightbar } from './components/Rightbar'
import HomePage from './pages/user/HomePage'
import { ScrollArea } from './components/ui/scroll-area'
import ProfilePage from './pages/user/ProfilePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Leftbar />
        <ScrollArea className="flex-1 overflow-auto ">
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="/home" Component={HomePage} />
            <Route path="/profile/:userId" Component={ProfilePage} />
          </Routes>
        </ScrollArea>
        <Rightbar />
      </div>
    </>
  )
}

export default App
