import React from 'react'
import Navbar from '../assets/components/web/navbar/Navbar.jsx'
import Footer from '../assets/components/web/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layouts({user,setUser}) {
  return (
    <>
    <Navbar/>
    <Outlet />
    <Footer />
    
    </>
  )
}
