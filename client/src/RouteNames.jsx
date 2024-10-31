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
import ExploreHomePage from './pages/user/ExploreHomePage'
import EditProfilePage from './pages/user/EditProfilePage'
import ChatPage from './pages/ChatPage'

export const RouteNames = () => {

  return (

    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/explore" element={<ExploreHomePage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/chat/:userId" element={<ChatPage />} />
    </Routes>
  )
}



