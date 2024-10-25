import { useContext, useState } from 'react'
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
import { AuthContext } from './context/AuthContext'

export const RouteNames = () => {

  return (

    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/home" Component={HomePage} />
      <Route path="/profile/:userId" Component={ProfilePage} />
    </Routes>
  )
}



