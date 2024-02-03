import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCross, FaEdit, FaTrash } from 'react-icons/fa';


const GetAllItems = () => {
  const [data, setMyData] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedItemRefNumber, setSelectedItemRefNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/rac/products");
        setMyData(response.data.products);
        console.log(response.data.products);
      } catch (err) {
        console.log('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async(itemRefnumber)=>{
    try{

      await axios.delete(`http://localhost:4000/rac/product/${itemRefnumber}`);

    }catch(err){
      console.error('error')
    }
  };

  const handleButtonClick=(itemRefnumber)=>{
    setSelectedItemRefNumber(itemRefnumber);
    setFormVisible(true);
  };

  const handleCloseClick=()=>{
    setFormVisible(false);
  }

  return (

    <>
      <div className='flex flex-col mt-2 p-5 mt-3 mb-1 w-full' style={{backgroundColor:'white', boxShadow:'0 4px 8px rgba(0, 0, 1, 0.1)'}}>


        <table>
          <thead>
            <tr>
              <th className='font-poppins text-[#000000] font-bold'>Ref. Number</th>
              <th className='font-poppins text-[#000000] font-bold '>Name</th>
              <th className='font-poppins text-[#000000] font-bold'>Description</th>
              <th className='font-poppins text-[#000000] font-bold'>Price</th>
              <th className='font-poppins text-[#000000] font-bold'>Category</th>
              <th className='font-poppins text-[#000000] font-bold'>Edit</th>
              <th className='font-poppins text-[#000000] font-bold'>Delete</th>

            </tr>
          </thead>
         
        {isFormVisible && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <form className="bg-white p-8 rounded-md shadow-md">
              <div className="flex justify-end">
              
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <h4 className='font-poppins mb-6'>Are you sure you want to delete the item?</h4>

              <div className='flex'>
              <button
                type="submit"
                className="bg-blue-500 text-white w-20 p-2 mb-4 rounded-md m-auto"
                onClick={handleCloseClick}
              >
                No
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white w-20 p-2 mb-4 rounded-md m-auto"
                onClick={()=>handleDelete(selectedItemRefNumber)}
              >
                Yes
              </button>
              </div>
            </form>
          </div>
        )}

          <tbody>
            {

              data.map((item, index)=>(
                <tr key={index} style={{borderBottom:'1px solid rgba(211,211,211, 0.8)'}}>
                  <td className='pt-5 font-poppins text-[#000000] '>{item.refNumber}</td>
                  <td className='pt-5 font-poppins text-[#000000]'>{item.productName}</td>
                  <td className='pt-5 font-poppins text-[#000000]'>{item.productDescription}</td>
                  <td className='pt-5 font-poppins text-[#000000]'>Rs. {item.productPrice}</td>
                  <td className='pt-5 font-poppins text-[#000000]'>{item.productCategory}</td>
                <td className='p-3 pt-5 font-poppins text-[#000000]'> <Link to={`/dashboard/edit/${item.refNumber}`}> <FaEdit className='cursor-pointer text-lg text-green-500 hover:text-green-700 transition duration-300 ease-in-out' />
</Link> </td>
                  <td className='p-3 pt-5'> <FaTrash className='text-gray-600 text-lg hover:text-red-700 hover:cursor-pointer transition duration-300 ease-in-out' onClick={() => handleButtonClick(item.refNumber)} />
</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>

  );
};

export default GetAllItems;
