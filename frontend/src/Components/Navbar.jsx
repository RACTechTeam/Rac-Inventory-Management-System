import React, { useState } from 'react';
import { FaUser, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("John Doe");

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Stop event propagation
    setShowDropdown((prev) => !prev);
  }

  return (
    <header className="bg-white shadow">
      <div className="p-3 ml-10 flex justify-between items-center">
        <h2 className='text-blue-500 font-semibold text-xxl flex items-center justify-center' style={{color:'#696CFF'}}>IMS</h2>

        <div className="flex items-center ">
          
        </div>

        {/* Notification and User Icons */}
        <div className="flex items-center">
          <div className="mr-4">
            {/* Notification Icon (replace with your icon or component) */}
            <span className="text-xl">🔔</span>
          </div>
          <div>
            {/* User Icon (replace with your icon or component) */}
            <span className="text-xl"> <FaUser className='cursor-pointer' onClick={toggleDropdown} /> </span>

            {
              showDropdown && (
                <div className='dropdown-menu'>
                  <p>{loggedInUserName}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
