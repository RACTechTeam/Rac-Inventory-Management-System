import React from 'react'
import {Outlet} from 'react-router-dom'
import MySidebar from './Sidebar'
import Navbar from '../Components/Navbar'



const DashboardLayout = () => {
  return (
    <div className='font-poppins flex flex-col h-2'>
      <Navbar/>
    <div className='font-poppins flex gap-4 '>
    
    
      <MySidebar />
      
      <Outlet />
    </div>
  </div>
  )
}

export default DashboardLayout