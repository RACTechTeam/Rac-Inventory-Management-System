import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaTrash} from 'react-icons/fa';

const GetAllItems = () => {
    const [companyData, setCompanyData] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedItemRefNumber, setSelectedItemRefNumber] = useState(null);
    let i=1;
    
    useEffect(()=>{
      const fetchCompany = async () =>{
        try{
            const response = await axios.get("http://localhost:4000/rac/company/all");
            setCompanyData(response.data.allCompanyDetails);
            console.log(response.data.allCompanyDetails);
        }catch(err){
          console.log(err);
        }
    }
    fetchCompany();
    }, []);

  const handleDelete = async(itemRefnumber)=>{
    try{

      await axios.delete(`http://localhost:4000/rac/company/${itemRefnumber}`);

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
    <div className='flex flex-col mt-2 p-5 mt-3 mb-1 w-full' style={{backgroundColor:'white', boxShadow:'0 4px 8px rgba(0, 0, 1, 0.1)', height:'100vh'}}>
    <div>
    <h3 className='font-poppins text-[#000000] font-bold' style={{fontSize:'2rem', paddingBottom:'24px'}}>Suppliers</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th className='font-poppins text-[#000000] font-bold'>Ref. Number</th>
            <th className='font-poppins text-[#000000] font-bold '>Company Name</th>
            <th className='font-poppins text-[#000000] font-bold'>Supplier Name</th>
            <th className='font-poppins text-[#000000] font-bold'>Mailing Name</th>
            <th className='font-poppins text-[#000000] font-bold'>Address</th>
            <th className='font-poppins text-[#000000] font-bold'>State</th>
            <th className='font-poppins text-[#000000] font-bold'>Country</th>
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

            companyData.map((company, index)=>(
              <tr key={index} style={{borderBottom:'1px solid rgba(211,211,211, 0.8)'}}>
                <td className='pt-5 font-poppins text-[#000000] '>{company.refNumber}</td>
                <td className='pt-5 font-poppins text-[#000000]'>{company.companyName}</td>
                <td className='pt-5 font-poppins text-[#000000]'>{company.supplier}</td>
                <td className='pt-5 font-poppins text-[#000000]'>{company.mailingName}</td>
                <td className='pt-5 font-poppins text-[#000000]'>{company.address}</td>
                <td className='pt-5 font-poppins text-[#000000]'>{company.state}</td>
                <td className='pt-5 font-poppins text-[#000000]'>{company.country}</td>

                <td className='p-3 pt-5'> <FaTrash className='text-gray-600 text-lg hover:text-red-700 hover:cursor-pointer transition duration-300 ease-in-out' onClick={() => handleButtonClick(company.refNumber)} />
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
