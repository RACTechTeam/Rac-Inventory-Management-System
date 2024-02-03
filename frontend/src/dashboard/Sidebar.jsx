import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import {  HiChartPie, HiInbox,  HiOutlineCloudUpload, HiUser, HiLogout, HiShoppingBag} from 'react-icons/hi';
import { FaList, FaPlus, FaUserFriends} from 'react-icons/fa';
import {useLocation,useNavigate} from 'react-router-dom'; 

import axios from 'axios';

const MySidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState('/dashboard');

  useEffect(()=>{
    setActiveRoute(location.pathname);

  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/rac/user/logout');
      if (response.status === 200) {
        console.log('Logout successful');
        // Redirect to the login page after successful logout
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', position:'relative', boxShadow: '0px 2px 5px rgba(0, 0, 1, 0.3)',borderTopLeftRadius: 0,borderTopRightRadius: 0 }}>
      <Sidebar style={{ overflowY: 'auto' }}>
      
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiChartPie} className='font-poppins p-3' style={{ color: activeRoute === '/dashboard' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard' ? 'bold' : 'normal' }}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/upload" icon={HiOutlineCloudUpload} className='font-poppins p-3' style={{ color: activeRoute === '/dashboard/upload' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/upload' ? 'bold' : 'normal' }}>
            Create Item
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/allitems" icon={FaList} className='font-poppins p-3' style={{ color: activeRoute === '/dashboard/allitems' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/allitems' ? 'bold' : 'normal' }}>
            All Products
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/supplier" icon={FaPlus} className='font-poppins p-3' style={{ color: activeRoute === '/dashboard/supplier' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/supplier' ? 'bold' : 'normal' }}>
            Add Supplier
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/allsupplier" icon={FaUserFriends} className='font-poppins p-3' style={{ color: activeRoute === '/dashboard/allsupplier' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/allsupplier' ? 'bold' : 'normal' }}>
            All Supplier
          </Sidebar.Item>

          <Sidebar.Item href="/dashboard/manage" icon={HiInbox} className='font-poppins p-3' style={{ color: activeRoute === '/dashboard/manage' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/manage' ? 'bold' : 'normal' }}>
            Manage items
          </Sidebar.Item>

          <Sidebar.Collapse icon={HiUser} label=" Manage Users" className='font-poppins p-2 ml-1'>
            <Sidebar.Item href="/dashboard/manageusers" className='font-poppins p-2' style={{ color: activeRoute === '/dashboard/manageusers' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/manageusers' ? 'bold' : 'normal' }}>ALL Users</Sidebar.Item>
            <Sidebar.Item href="/dashboard/userrequest" className='font-poppins p-2' style={{ color: activeRoute === '/dashboard/userrequest' ? 'blue' : 'black', fontWeight: activeRoute === '/dashboard/userrequest' ? 'bold' : 'normal' }}>ALL Users</Sidebar.Item>
            <Sidebar.Item href="#">Rejected Users</Sidebar.Item>
          </Sidebar.Collapse>
          
          <Sidebar.Item
              onClick={handleLogout} // Add onClick event for the logout button
              icon={HiLogout}
              className='font-poppins p-3'
              style={{
                color: activeRoute === '/dashboard/logout' ? 'blue' : 'black',
                fontWeight: activeRoute === '/dashboard/logout' ? 'bold' : 'normal',
                cursor: 'pointer', // Set cursor to pointer for better user experience
              }}
            >
              Log out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  )
}

export default MySidebar