import React, { Suspense, lazy } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Loader from "../Components/Loader"


const MySidebar = lazy(()=>import("./Sidebar"));

const DashboardLayout = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <div className='font-poppins flex flex-col h-2'>
      <Navbar/>
    <div className='font-poppins flex gap-4 '>
    
    
      <MySidebar />
      
      <Outlet />
    </div>
  </div>
    </Suspense>
  )
}

export default DashboardLayout