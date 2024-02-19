import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiInbox, HiOutlineCloudUpload, HiUser, HiLogout, HiShoppingBag } from 'react-icons/hi';
import { FaList, FaPlus, FaUserFriends } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MySidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState('/dashboard');
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setActiveRoute(location.pathname);
    // Add event listener to check screen width on window resize
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Initially check screen width on component mount
    handleResize();
  }, []);

  const handleResize = () => {
    // Check if the screen width is less than or equal to 768px (typical mobile phone width)
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

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

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative', boxShadow: '0px 2px 5px rgba(0, 0, 1, 0.3)', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
      {showSidebar && (
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
              <Sidebar.Item
                onClick={handleLogout}
                icon={HiLogout}
                className='font-poppins p-3'
                style={{
                  color: activeRoute === '/dashboard/logout' ? 'blue' : 'black',
                  fontWeight: activeRoute === '/dashboard/logout' ? 'bold' : 'normal',
                  cursor: 'pointer',
                }}>
                Log out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
      <div onClick={toggleSidebar} style={{ cursor: 'pointer', padding: '10px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={showSidebar ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}
          />
        </svg>
      </div>
    </div>
  );
};

export default MySidebar;
