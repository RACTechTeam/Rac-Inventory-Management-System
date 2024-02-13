import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdFileDownloadDone } from "react-icons/md";
import { TbUserCancel } from "react-icons/tb";


const UserRequest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/rac/user/getuserrequests");
        setUsers(response.data.user);
      } catch (err) {
        console.log('Error fetching data', err);
      }
    };

    fetchUsers();
  }, []);

  const handleAccept = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/rac/user/approve/${userId}`);
      alert('User Request accepted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error accepting user', error);
      alert('Failed to accept user. Please try again.');
    }
  };
  
  const handleReject = async (userId) => {
    try {
      await axios.put(`http://localhost:4000/rac/user/reject/${userId}`);
      alert('User rejected successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting user', error);
      alert('Failed to reject user. Please try again.');
    }
  };
  let i = 1;

  return (
    <div className='flex flex-col mt-2 p-2 mt-3 mb-1 w-full' style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)', height:'100%' }}>
      <div className="font-poppins text-[#000000] space-y-4 container mx-auto my-8">
        <div className="font-poppins text-[#000000] overflow-x-auto">
        <table className="font-poppins text-[#000000] min-w-full border rounded">
      <thead>
        <tr className="font-poppins text-[#000000] bg-gray-200">
          <th className="font-poppins text-[#000000] border p-2">ID</th>
          <th className="font-poppins text-[#000000] border p-2">Name</th>
          <th className="font-poppins text-[#000000] border p-2">Email</th>
          <th className="font-poppins text-[#000000] border p-2">Role</th>
          <th className="font-poppins text-[#000000] border p-2">Accept</th>
          <th className="font-poppins text-[#000000] border p-2">Reject</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="font-poppins text-[#000000] hover:bg-gray-100">
            <td className="font-poppins text-[#000000] border p-2">{i++}</td>
            <td className="font-poppins text-[#000000] border p-2">{user.userName}</td>
            <td className="font-poppins text-[#000000] border p-2">{user.userEmail}</td>
            <td className="font-poppins text-[#000000] border p-2">{user.role}</td>
            <td className="font-poppins text-[#000000] border p-2">
              <button
                onClick={() => handleAccept(user._id)}
                className={`text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
              >
                <MdFileDownloadDone className={`text-xl text-green-500`}/>
              </button>
            </td>
            <td className="font-poppins text-[#000000] border p-2">
              <button onClick={() => handleReject(user._id)}>
              <TbUserCancel className={`text-xl text-red-500`}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      </div>
    </div>
  );
};

export default UserRequest;
